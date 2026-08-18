'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function JoinAsPro() {
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
      // Supabase-тегі 'techs' кестесіне шеберді жазу
      const { error: dbError } = await supabase.from('techs').insert([
        {
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email,
          zip_codes: formData.zipCodes,
          license_number: formData.licenseNumber,
          subscription_status: 'pending', // төлем жасалғанша күтуде
        },
      ]);

      if (dbError) throw dbError;

      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError('Қате орын алды. Қайтадан байқап көрмесеңіз, қолдау қызметіне хабарласыңыз.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#12131C] text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#181926] p-8 rounded-3xl border border-slate-800 shadow-2xl">
        <h1 className="text-2xl font-extrabold text-amber-500 mb-2 text-center">
          Locksmith Шебері Болып Тіркелу
        </h1>
        <p className="text-slate-400 text-xs text-center mb-6">
          Айлық жазылым ($25/ай) арқылы өз аймағыңыздағы барлық тапсырыстарды шектеусіз алыңыз.
        </p>

        {success ? (
          <div className="text-center space-y-4">
            <div className="bg-emerald-500/20 text-emerald-400 p-4 rounded-xl border border-emerald-500/30 text-sm font-bold">
              ✅ Мәліметтеріңіз сәтті тіркелді!
            </div>
            <p className="text-xs text-slate-300">
              Келесі қадам: Жазылымды белсендіру үшін төлем бетіне бағытталасыз.
            </p>
            <button
              onClick={() => alert('Келесі кезеңде Stripe төлем сілтемесі ашылады')}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl shadow-lg hover:opacity-90 transition"
            >
              Жазылымды Төлеу ($25 / ай)
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">Толық Аты-Жөніңіз *</label>
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
              <label className="block text-xs font-bold text-slate-400 mb-1">Телефон Нөміріңіз *</label>
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
              <label className="block text-xs font-bold text-slate-400 mb-1">Email *</label>
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
              <label className="block text-xs font-bold text-slate-400 mb-1">Қызмет көрсететін ZIP Кодтар *</label>
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
              <label className="block text-xs font-bold text-slate-400 mb-1">Лицензия Нөмірі (Міндетті емес)</label>
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
              {loading ? 'Жіберілуде...' : 'Тіркелу және Төлемге Өту'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}