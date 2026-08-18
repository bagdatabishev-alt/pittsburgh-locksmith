'use client';

import React, { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState<'KAZ' | 'RUS' | 'ENG'>('ENG');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'Car Lockout',
    address: '',
    note: ''
  });

  const t = {
    KAZ: {
      title: 'Pittsburgh Locksmith',
      subtitle: 'Жылдам шұғыл кекілді қызмет көрсету',
      name: 'Сіздің атыңыз',
      phone: 'Телефон нөміріңіз',
      service: 'Қызмет түрі',
      address: 'Мекенжайыңыз',
      submit: 'Тапсырыс беру',
      success: '✅ Тапсырыс сәтті жіберілді! Жақында хабарласамыз.'
    },
    RUS: {
      title: 'Pittsburgh Locksmith',
      subtitle: 'Быстрая экстренная помощь замочного мастера',
      name: 'Ваше имя',
      phone: 'Номер телефона',
      service: 'Услуга',
      address: 'Адрес / Локация',
      submit: 'Отправить заявку',
      success: '✅ Заявка успешно отправлена! Скоро свяжемся.'
    },
    ENG: {
      title: 'Pittsburgh Locksmith',
      subtitle: 'Request fast local emergency service',
      name: 'Your Name',
      phone: 'Phone Number',
      service: 'Service Needed',
      address: 'Address / Location',
      submit: 'Send Request',
      success: '✅ Request sent! We will contact you shortly.'
    }
  }[lang];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'NEW_ORDER',
          data: formData
        })
      });

      if (res.ok) {
        setSuccess(true);
        setFormData({ name: '', phone: '', service: 'Car Lockout', address: '', note: '' });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-6 flex flex-col items-center justify-center">
      {/* Language Switcher */}
      <div className="flex gap-2 mb-6">
        {(['KAZ', 'RUS', 'ENG'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 text-xs font-bold rounded border ${
              lang === l ? 'bg-amber-500 text-slate-950 border-amber-500' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="max-w-md w-full bg-slate-800 p-8 rounded-xl shadow-2xl border border-slate-700">
        <h1 className="text-2xl font-bold text-amber-500 mb-2 text-center">{t.title}</h1>
        <p className="text-slate-400 text-sm mb-6 text-center">{t.subtitle}</p>

        {success && (
          <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-300 p-3 rounded mb-4 text-center text-sm">
            {t.success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1">{t.name}</label>
            <input
              type="text"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-amber-500"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1">{t.phone}</label>
            <input
              type="tel"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-amber-500"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1">{t.service}</label>
            <select
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-amber-500"
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
            >
              <option value="Car Lockout">Car Lockout</option>
              <option value="House Lockout">House Lockout</option>
              <option value="Lock Change">Lock Change</option>
              <option value="Key Duplication">Key Duplication</option>
            </select>
          </div>

          <div>
            <label className="block text-xs uppercase text-slate-400 mb-1">{t.address}</label>
            <input
              type="text"
              required
              className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:outline-none focus:border-amber-500"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded transition-all"
          >
            {loading ? '...' : t.submit}
          </button>
        </form>
      </div>
    </main>
  );
}