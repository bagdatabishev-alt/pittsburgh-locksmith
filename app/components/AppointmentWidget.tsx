'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function AppointmentWidget({ lang = 'en' }: { lang?: string }) {
const t = {
    en: {
      title: 'Appointment',
      subtitle: 'Choose your convenient date and time.',
      name: 'Your Name *',
      phone: 'Phone Number *',
      date: 'Date *',
      time: 'Time *',
      service: 'Service *',
      serviceOptions: ['Emergency Lockout', 'Car Locksmith', 'Residential Locksmith', 'Commercial Locksmith', 'Key Replacement', 'Lock Repair'],
      note: 'Note (Optional)',
      notePlaceholder: 'Describe your issue...',
      btn: 'Confirm Appointment',
      success: 'Successfully booked!',
      errorMsg: 'An error occurred. Please try again.'
    },
    ru: {
      title: 'Запись на прием',
      subtitle: 'Выберите удобную дату и время.',
      name: 'Ваше имя *',
      phone: 'Номер телефона *',
      date: 'Дата *',
      time: 'Время *',
      service: 'Услуга *',
      serviceOptions: ['Экстренное вскрытие', 'Автомобильный замок', 'Жилой замок', 'Коммерческий замок', 'Замена ключей', 'Ремонт замка'],
      note: 'Примечание (необязательно)',
      notePlaceholder: 'Опишите вашу проблему...',
      btn: 'Подтвердить запись',
      success: 'Успешно забронировано!',
      errorMsg: 'Произошла ошибка. Попробуйте снова.'
    },
    kk: {
      title: 'Қызметке Жазылу',
      subtitle: 'Өзіңізге ыңғайлы күн мен уақытты таңдаңыз.',
      name: 'Аты-жөніңіз *',
      phone: 'Телефон нөміріңіз *',
      date: 'Күні *',
      time: 'Уақыты *',
      note: 'Қосымша ескерту',
      notePlaceholder: 'Мәселені қысқаша жазыңыз...',
      btn: 'Брондауды Растау',
      success: 'Сәтті брондалды!',
      service: 'Қызмет түрі *',
      serviceOptions: ['Шұғыл ашу', 'Автокөлік құлпы', 'Тұрғын үй құлпы', 'Коммерциялық құлып', 'Кілт ауыстыру', 'Құлыпты жөндеу'],
      errorMsg: 'Қате орын алды. Қайта көріңіз.'
    }
  }[lang] || {
    title: 'Appointment',
    subtitle: 'Choose your convenient date and time.',
    name: 'Your Name *',
    phone: 'Phone Number *',
    date: 'Date *',
    time: 'Time *',
    service: 'Service *',
    serviceOptions: ['Emergency Lockout', 'Car Locksmith', 'Residential Locksmith', 'Commercial Locksmith', 'Key Replacement', 'Lock Repair'],
    note: 'Note (Optional)',
    notePlaceholder: 'Describe your issue...',
    btn: 'Confirm Appointment',
    success: 'Successfully booked!',
    errorMsg: 'An error occurred. Please try again.'
  };
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('appointments').insert([
        {
          client_name: formData.name,
          phone: formData.phone,
          service: formData.service,
          appointment_date: formData.date,
          appointment_time: formData.time,
          note: formData.note,
          status: 'pending'
        }
      ]);

      if (error) throw error;

      setSuccessMsg(true);
      setFormData({ name: '', phone: '', service: '', date: '', time: '', note: '' });
    } catch (err) {
      console.error('Booking error:', err);
      alert(t.errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#181926] border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-white mx-auto my-8">
      <h3 className="text-xl font-extrabold text-amber-500 mb-2 text-center">
  Appointment
</h3>
      <p className="text-slate-400 text-xs text-center mb-6">
        {t.subtitle}
      </p>

      {successMsg ? (
        <div className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 p-4 rounded-xl text-center text-sm font-bold">
          ☑️ {t.success}
        </div>
      ) : (
        <form onSubmit={handleBooking} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t.name}</label>
            <input
              type="text"
              required
              placeholder="Асан Әлиев"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t.phone}</label>
            <input
              type="tel"
              required
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t.service}</label>
            <select
              required
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="" disabled>{t.service}</option>
              {t.serviceOptions.map((opt: string) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.date} *</label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.time} *</label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">{t.note}</label>
            <textarea
              rows={2}
              placeholder="Мәселені қысқаша жазыңыз..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500"
            />
          </div>
           
		   <button
  type="submit"
  disabled={loading}
  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-4 rounded-xl shadow-lg hover:opacity-95 transition"
>
  {loading ? 'Жіберілуде...' : t.btn}
</button>

        </form>
      )}
    </div>
  );
}