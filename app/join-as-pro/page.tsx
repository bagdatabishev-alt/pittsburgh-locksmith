'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

type Lang = 'KAZ' | 'RUS' | 'ENG';

const translations = {
  KAZ: {
    title: 'Locksmith Шебері Болып Тіркелу',
    subtitle: 'Айлық жазылым ($25/ай) арқылы өз аймағыңыздағы барлық тапсырыстарды шектеусіз алыңыз.',
    fullName: 'Толық Аты-Жөніңіз *',
    phone: 'Телефон Нөміріңіз *',
    email: 'Email *',
    zipCodes: 'Қызмет көрсететін ZIP Кодтар *',
    license: 'Лицензия Нөмірі (Міндетті емес)',
    submit: 'Тіркелу және Төлемге Өту',
    submitting: 'Жіберілуде...',
    successTitle: '✅ Мәліметтеріңіз сәтті тіркелді!',
    successSub: 'Келесі қадам: Жазылымды белсендіру үшін төлем бетіне бағытталасыз.',
    payBtn: 'Жазылымды Төлеу ($25 / ай)',
    errorMsg: 'Қате орын алды. Қайтадан байқап көрмесеңіз, қолдау қызметіне хабарласыңыз.',
  },
  RUS: {
    title: 'Регистрация Мастера Locksmith',
    subtitle: 'Получайте неограниченное количество заказов в своем районе за фиксированную подписку ($25/мес).',
    fullName: 'Полное Имя *',
    phone: 'Номер Телефона *',
    email: 'Email *',
    zipCodes: 'Обслуживаемые ZIP коды *',
    license: 'Номер Лицензии (Опционально)',
    submit: 'Зарегистрироваться и Перейти к Оплате',
    submitting: 'Отправка...',
    successTitle: '✅ Данные успешно зарегистрированы!',
    successSub: 'Следующий шаг: Переход на страницу оплаты для активации подписки.',
    payBtn: 'Оплатить Подписку ($25 / мес)',
    errorMsg: 'Произошла ошибка. Попробуйте снова или обратитесь в поддержку.',
  },
  ENG: {
    title: 'Join as a Locksmith Pro',
    subtitle: 'Get unlimited leads in your area for a simple monthly subscription of $25/mo.',
    fullName: 'Full Name *',
    phone: 'Phone Number *',
    email: 'Email Address *',
    zipCodes: 'Service ZIP Codes *',
    license: 'License Number (Optional)',
    submit: 'Register & Proceed to Payment',
    submitting: 'Submitting...',
    successTitle: '✅ Registration Successful!',
    successSub: 'Next step: You will be redirected to activate your subscription.',
    payBtn: 'Pay Subscription ($25 / mo)',
    errorMsg: 'An error occurred. Please try again or contact support.',
  },
};

export default function JoinAsPro() {
  const [lang, setLang] = useState<Lang>('ENG');
  const t = translations[lang];

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    zipCodes: '',
    licenseNumber: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { error: dbError } = await supabase.from('techs').insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          zip_codes: formData.zipCodes,
          license_number: formData.licenseNumber,
          subscription_status: 'pending',
        },
      ]);

      if (dbError) throw dbError;
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12131C] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#181926] p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
        
        {/* Тіл ауыстыру батырмалары */}
        <div className="flex justify-center gap-1 mb-6 bg-[#12131C] p-1 rounded-xl w-fit mx-auto border border-slate-800">
          {(['KAZ', 'RUS', 'ENG'] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition ${
                lang === l ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>

        <h1 className="text-2xl font-extrabold text-amber-500 mb-2 text-center">
          {t.title}
        </h1>
        <p className="text-slate-400 text-xs text-center mb-6">
          {t.subtitle}
        </p>

        {success ? (
          <div className="text-center space-y-4">
            <div className="bg-emerald-500/20 text-emerald-400 p-4 rounded-xl border border-emerald-500/30 text-sm font-bold">
              {t.successTitle}
            </div>
            <p className="text-xs text-slate-300">
              {t.successSub}
            </p>
            <button
              onClick={() => alert('Stripe payment link will open in next phase')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl shadow-lg hover:opacity-90 transition"
            >
              {t.payBtn}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.fullName}</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.phone}</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm"
                placeholder="+1 (555) 000-0000"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.email}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm"
                placeholder="tech@example.com"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.zipCodes}</label>
              <input
                type="text"
                required
                value={formData.zipCodes}
                onChange={(e) => setFormData({ ...formData, zipCodes: e.target.value })}
                className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm"
                placeholder="15201, 15202, 15203"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.license}</label>
              <input
                type="text"
                value={formData.licenseNumber}
                onChange={(e) => setFormData({ ...formData, licenseNumber: e.target.value })}
                className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm"
                placeholder="LIC-123456"
              />
            </div>

            {error && <p className="text-red-400 text-xs text-center font-bold">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl shadow-lg hover:opacity-90 transition mt-2 disabled:opacity-50"
            >
              {loading ? t.submitting : t.submit}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}