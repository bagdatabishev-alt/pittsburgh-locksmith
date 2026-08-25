'use client';

import { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

export default function Home() {
  const [lang, setLang] = useState<'KAZ' | 'RUS' | 'ENG'>('ENG');
  const [modalType, setModalType] = useState<'contact' | 'request' | null>(null);
  const [selectedService, setSelectedService] = useState('General Request');
  
  // Form states
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  // ZIP Code checker states
  const [zipCode, setZipCode] = useState('');
  const [zipStatus, setZipStatus] = useState<string | null>(null);

  const t = {
    ENG: {
      title1: "Locked Out?",
      title2: "We Can Help.",
      subtitle: "Professional locksmith service for homes, cars, businesses and emergency lockouts.",
      callNow: "CALL NOW",
      reqService: "REQUEST SERVICE",
      bannerTitle: "Locked Out Right Now?",
      bannerDesc: "Don't spend time searching. Call us immediately for rapid dispatch.",
      whatNeeded: "What Do You Need Help With?",
      note: "Note: Final exact price is determined on-site by the technician based on lock complexity.",
      zipTitle: "Check Service Availability",
      zipSub: "Enter your ZIP code to check if our nearest technician is available right now.",
      zipBtn: "CHECK AVAILABILITY",
      faqTitle: "Frequently Asked Questions",
      contactTitle: "How to Contact Us?",
      callPhoneBtn: "Call Phone",
      whatsappBtn: "Open WhatsApp",
      requestTitle: "Request Service",
      serviceLabel: "Service:",
      yourName: "Your Name *",
      phoneNum: "Phone Number *",
      addressLoc: "Address / Location *",
      noteLabel: "Note (Optional)",
      submitBtn: "SUBMIT REQUEST",
      sending: "Sending...",
      successMsg: "✅ Request sent successfully!",
      errorMsg: "❌ Failed to send request.",
      services: [
        { title: 'Emergency Lockout', desc: 'Fast arrival for home, car or office lockouts.', price: 'From $45' },
        { title: 'Car Locksmith', desc: 'Key cutting & transponder programming on site.', price: 'From $49' },
        { title: 'Residential Locksmith', desc: 'House lock replacement & repair services.', price: 'From $35' },
        { title: 'Commercial Locksmith', desc: 'High-security locks for businesses & offices.', price: 'From $55' },
        { title: 'Key Replacement', desc: 'Duplicate or replacement keys made quickly.', price: 'From $25' },
        { title: 'Lock Repair', desc: 'Fix damaged or jammed locks easily.', price: 'From $30' }
      ],
      faqs: [
        { q: "How fast can a locksmith arrive?", a: "Our average arrival time is 15-30 minutes depending on your location and street traffic." },
        { q: "Do you provide 24/7 emergency service?", a: "Yes! We are available 24 hours a day, 7 days a week for all emergency lockout situations." },
        { q: "Can you unlock high-security car locks?", a: "Absolutely! Our technicians are equipped with modern tools to handle almost all car models." }
      ]
    },
    RUS: {
      title1: "Захлопнули дверь?",
      title2: "Мы поможем.",
      subtitle: "Профессиональные услуги слесаря для домов, автомобилей, бизнеса и экстренных ситуаций.",
      callNow: "ПОЗВОНИТЬ",
      reqService: "ЗАКАЗАТЬ УСЛУГУ",
      bannerTitle: "Застряли прямо сейчас?",
      bannerDesc: "Не тратьте время на поиски. Позвоните нам для срочного выезда.",
      whatNeeded: "Какая помощь вам нужна?",
      note: "Примечание: Точная цена определяется мастером на месте в зависимости от сложности.",
      zipTitle: "Проверить доступность сервиса",
      zipSub: "Введите свой ZIP код, чтобы проверить доступность мастера рядом с вами.",
      zipBtn: "ПРОВЕРИТЬ",
      faqTitle: "Часто задаваемые вопросы",
      contactTitle: "Как с нами связаться?",
      callPhoneBtn: "Позвонить",
      whatsappBtn: "Открыть WhatsApp",
      requestTitle: "Заказать услугу",
      serviceLabel: "Услуга:",
      yourName: "Ваше Имя *",
      phoneNum: "Номер Телефона *",
      addressLoc: "Адрес / Местоположение *",
      noteLabel: "Примечание (Необязательно)",
      submitBtn: "ОТПРАВИТЬ ЗАПРОС",
      sending: "Отправка...",
      successMsg: "✅ Запрос успешно отправлен!",
      errorMsg: "❌ Не удалось отправить запрос.",
      services: [
        { title: 'Экстренное вскрытие', desc: 'Быстрый выезд при блокировке дома, авто или офиса.', price: 'От $45' },
        { title: 'Автослесарь', desc: 'Нарезка ключей и программирование на месте.', price: 'От $49' },
        { title: 'Замки для дома', desc: 'Замена и ремонт дверных замков в доме.', price: 'От $35' },
        { title: 'Замки для бизнеса', desc: 'Замки повышенной безопасности для бизнеса.', price: 'От $55' },
        { title: 'Замена ключей', desc: 'Дубликаты или замена ключей.', price: 'От $25' },
        { title: 'Ремонт замков', desc: 'Ремонт поврежденных или заклинивших замков.', price: 'От $30' }
      ],
      faqs: [
        { q: "Как быстро приезжает мастер?", a: "Среднее время прибытия составляет 15-30 минут в зависимости от вашего местоположения." },
        { q: "Работаете ли вы 24/7?", a: "Да! Мы доступны 24 часа в сутки, 7 дней в неделю для любых экстренных вызовов." },
        { q: "Можете ли вы открыть современные авто?", a: "Конечно! Наши специалисты оснащены современным оборудованием для любых машин." }
      ]
    },
    KAZ: {
      title1: "Есікті аша алмай тұрсыз ба?",
      title2: "Біз көмектесеміз.",
      subtitle: "Үйге, көлікке, бизнеске арналған кәсіби құлып және кілт қызметтері.",
      callNow: "ҚОҢЫРАУ ШАЛУ",
      reqService: "ҚЫЗМЕТКЕ ТАПСЫРЫС БЕРУ",
      bannerTitle: "Дәл қазір есікті аша алмай тұрсыз ба?",
      bannerDesc: "Уақыт жоғалтпаңыз. Жедел түрде бізге хабарласыңыз.",
      whatNeeded: "Сізге қандай көмек керек?",
      note: "Ескерту: Нақты бағаны маман келген соң құлыптың күрделілігіне қарай анықтайды.",
      zipTitle: "Қызметтің қолжетімділігін тексеру",
      zipSub: "Жақыныңызда маманның бар-жоғын білу үшін ZIP кодыңызды енгізіңіз.",
      zipBtn: "ТЕКСЕРУ",
      faqTitle: "Жиі қойылатын сұрақтар",
      contactTitle: "Бізбен қалай хабарласуға болады?",
      callPhoneBtn: "Қоңырау шалу",
      whatsappBtn: "WhatsApp ашу",
      requestTitle: "Қызметке тапсырыс беру",
      serviceLabel: "Қызмет:",
      yourName: "Аты-жөніңіз *",
      phoneNum: "Телефон нөмірі *",
      addressLoc: "Мекенжайыңыз / Локация *",
      noteLabel: "Қосымша ескерту (Міндетті емес)",
      submitBtn: "ТАПСЫРЫСТЫ ЖІБЕРУ",
      sending: "Жіберілуде...",
      successMsg: "✅ Тапсырыс сәтті жіберілді!",
      errorMsg: "❌ Тапсырыс жіберілмеді.",
      services: [
        { title: 'Шұғыл есік ашу', desc: 'Үй, көлік немесе кеңсе есіктерін ашуға шұғыл келу.', price: 'Бастап $45' },
        { title: 'Көлік кілттері', desc: 'Көлік кілтін кесу және бағдарламалау.', price: 'Бастап $49' },
        { title: 'Үйге арналған құлыптар', desc: 'Үй құлыптарын ауыстыру және жөндеу қызметтері.', price: 'Бастап $35' },
        { title: 'Бизнеске арналған құлыптар', desc: 'Бизнес пен кеңселерге арналған сенімді құлыптар.', price: 'Бастап $55' },
        { title: 'Кілттерді ауыстыру', desc: 'Кілттердің көшірмесін тез арада жасау.', price: 'Бастап $25' },
        { title: 'Құлыпты жөндеу', desc: 'Сынған немесе істемейтін құлыптарды жөндеу.', price: 'Бастап $30' }
      ],
      faqs: [
        { q: "Маман қанша уақытта келеді?", a: "Орташа келу уақыты орналасқан жеріңізге байланысты 15-30 минутты құрайды." },
        { q: "Тәулік бойы (24/7) жұмыс істейсіз бе?", a: "Иә! Біз барлық шұғыл жағдайлар үшін аптасына 7 күн, тәулік бойы жұмыс істейміз." },
        { q: "Күрделі көлік құлыптарын аша аласыз ба?", a: "Әрине! Біздің мамандар заманауи құралдармен жабдықталған." }
      ]
    }
  };

  const currentT = t[lang];

  const handleOpenRequest = (serviceName: string) => {
    setSelectedService(serviceName);
    setModalType('request');
  };

  const handleCheckZip = (e: React.FormEvent) => {
    e.preventDefault();
    if (zipCode.length >= 5) {
      setZipStatus(lang === 'KAZ' ? '✅ Сіздің аймақта қызмет көрсетеміз! Келу уақыты 15-30 минут.' : lang === 'RUS' ? '✅ Мы обслуживаем ваш район! Время прибытия 15-30 минут.' : '✅ We serve your area! Average arrival time is 15-30 minutes.');
    } else {
      setZipStatus(lang === 'KAZ' ? '❌ Дұрыс 5 таңбалы ZIP кодты енгізіңіз.' : lang === 'RUS' ? '❌ Введите правильный 5-значный ZIP код.' : '❌ Please enter a valid 5-digit ZIP code.');
    }
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
      
      const supabase = createClient(supabaseUrl, supabaseAnonKey);

      const { error } = await supabase.from('requests').insert([
        {
          name: name,
          phone: phone,
          service: selectedService,
          address: address,
          note: note,
        }
      ]);

      if (error) {
        throw error;
      }

      setStatus(currentT.successMsg);
      setName('');
      setPhone('');
      setAddress('');
      setNote('');
      setTimeout(() => setModalType(null), 2000);
    } catch (err) {
      console.error(err);
      setStatus(currentT.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500 selection:text-black">
      <header className="flex justify-between items-center px-6 py-4 max-w-6xl mx-auto">
        <span className="font-black text-amber-500 tracking-wider">PITTSBURGH LOCKSMITH</span>
        <div className="flex gap-2">
          {(['KAZ', 'RUS', 'ENG'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1 rounded text-xs font-bold transition ${
                lang === l ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <section className="py-12 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2">
          {currentT.title1} <span className="text-amber-500">{currentT.title2}</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
          {currentT.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={() => setModalType('contact')}
            className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition"
          >
            {currentT.callNow}
          </button>
          <button
            onClick={() => handleOpenRequest('General Request')}
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl border border-slate-700 transition"
          >
            {currentT.reqService}
          </button>
        </div>

        <div className="bg-red-600/90 border border-red-500 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between shadow-xl gap-4">
          <div className="text-left">
            <h3 className="font-black text-lg">{currentT.bannerTitle}</h3>
            <p className="text-xs text-red-100">{currentT.bannerDesc}</p>
          </div>
          <button
            onClick={() => setModalType('contact')}
            className="bg-white hover:bg-slate-100 text-red-600 font-extrabold px-6 py-2.5 rounded-xl text-sm shadow transition shrink-0"
          >
            📞 {currentT.callNow}
          </button>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{currentT.whatNeeded}</h2>
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-semibold">
            ⚠️ {currentT.note}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentT.services.map((s, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/50 transition">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {s.price}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mb-6">{s.desc}</p>
              </div>
              <button
                onClick={() => handleOpenRequest(s.title)}
                className="w-full bg-slate-800 hover:bg-amber-500 hover:text-black font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition"
              >
                {currentT.reqService}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl mx-auto text-center shadow-xl">
          <h3 className="text-lg font-extrabold mb-1">{currentT.zipTitle}</h3>
          <p className="text-xs text-slate-400 mb-4">{currentT.zipSub}</p>
          <form onSubmit={handleCheckZip} className="flex gap-2">
            <input
              type="text"
              required
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="ZIP code"
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-amber-500"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-6 py-2.5 rounded-xl text-xs transition shrink-0"
            >
              {currentT.zipBtn}
            </button>
          </form>
          {zipStatus && <p className="mt-3 text-xs font-bold text-green-400">{zipStatus}</p>}
        </div>

        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-extrabold text-center mb-8">{currentT.faqTitle}</h2>
          <div className="space-y-4">
            {currentT.faqs.map((faq, idx) => (
              <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <h4 className="font-bold text-sm text-amber-400 mb-1">Q: {faq.q}</h4>
                <p className="text-xs text-slate-400">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {modalType === 'contact' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-sm w-full relative shadow-2xl text-center">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>
            <h3 className="text-lg font-black mb-1">{currentT.contactTitle}</h3>
            <p className="text-amber-500 font-extrabold text-lg mb-6">+1 (917) 349-6532</p>
            <div className="space-y-3">
              <a
                href="tel:+19173496532"
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-extrabold py-3 rounded-xl transition text-sm shadow"
              >
                📞 {currentT.callPhoneBtn}
              </a>
              <a
                href="https://wa.me/19173496532"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-emerald-500 hover:bg-emerald-600 text-black font-extrabold py-3 rounded-xl transition text-sm shadow"
              >
                💬 {currentT.whatsappBtn}
              </a>
            </div>
          </div>
        </div>
      )}

      {modalType === 'request' && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-md w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalType(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold"
            >
              ✕
            </button>
            <h3 className="text-xl font-black text-amber-500 mb-1">{currentT.requestTitle}</h3>
            <p className="text-xs text-slate-400 mb-4">{currentT.serviceLabel} <span className="text-white font-bold">{selectedService}</span></p>

            <form onSubmit={handleSubmitOrder} className="space-y-3">
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">{currentT.yourName}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">{currentT.phoneNum}</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">{currentT.addressLoc}</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street name or ZIP"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-amber-500"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-slate-400 block mb-1">{currentT.noteLabel}</label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Locked out of car, jammed lock, etc..."
                  rows={2}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-500 hover:bg-amber-600 text-black font-extrabold py-3.5 rounded-xl transition shadow-lg mt-2"
              >
                {loading ? currentT.sending : currentT.submitBtn}
              </button>
            </form>

            {status && <p className="mt-3 text-center text-xs font-bold">{status}</p>}
          </div>
        </div>
      )}
    </main>
  );
}