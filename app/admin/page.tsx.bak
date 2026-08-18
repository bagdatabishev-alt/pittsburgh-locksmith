'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const DICT = {
  kk: {
    title: 'Панель управления сайтом',
    requests: 'Өтініштер',
    prices: 'Бағалар',
    settings: 'Баптаулар',
    back: 'Сайтқа қайту',
    logout: 'Шығу',
    noReq: 'Әзірге өтініштер жоқ.',
    name: 'Аты',
    phone: 'Телефон',
    service: 'Қызмет',
    note: 'Мекенжай / Ескерту',
    date: 'Уақыты',
    actions: 'Әрекет',
    delete: 'Жою',
    loginTitle: 'Админ Панельге Кіру',
    placeholder: 'Құпия сөзді енгізіңіз...',
    loginBtn: 'Кіру',
    pricesTitle: 'Қызмет бағаларын өңдеу',
    saveBtn: 'Сақтау',
    phoneLabel: 'Сайттағы телефон нөмірі:',
    emergencyLabel: 'Төтенше жағдай блогын көрсету:'
  },
  ru: {
    title: 'Панель управления сайтом',
    requests: 'Заявки',
    prices: 'Цены',
    settings: 'Настройки',
    back: 'На сайт',
    logout: 'Выйти',
    noReq: 'Заявок пока нет.',
    name: 'Имя',
    phone: 'Телефон',
    service: 'Услуга',
    note: 'Адрес / Заметка',
    date: 'Дата',
    actions: 'Действие',
    delete: 'Удалить',
    loginTitle: 'Вход в админ-панель',
    placeholder: 'Введите пароль...',
    loginBtn: 'Войти',
    pricesTitle: 'Редактирование цен на услуги',
    saveBtn: 'Сохранить',
    phoneLabel: 'Телефон на сайте:',
    emergencyLabel: 'Показывать блок экстренного вызова:'
  },
  en: {
    title: 'Site Control Panel',
    requests: 'Requests',
    prices: 'Prices',
    settings: 'Settings',
    back: 'Back to Site',
    logout: 'Logout',
    noReq: 'No requests yet.',
    name: 'Name',
    phone: 'Phone',
    service: 'Service',
    note: 'Address / Note',
    date: 'Date',
    actions: 'Action',
    delete: 'Delete',
    loginTitle: 'Admin Panel Login',
    placeholder: 'Enter password...',
    loginBtn: 'Login',
    pricesTitle: 'Edit Service Prices',
    saveBtn: 'Save',
    phoneLabel: 'Site Phone Number:',
    emergencyLabel: 'Show Emergency Block:'
  }
};

export default function AdminPage() {
  const [lang, setLang] = useState<'kk' | 'ru' | 'en'>('kk');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [requests, setRequests] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'prices' | 'settings'>('requests');
  const [savedMsg, setSavedMsg] = useState('');

  const [prices, setPrices] = useState({
    '1': '29',
    '2': '49',
    '3': '35',
    '4': '55',
    '5': '25',
    '6': '30'
  });

  const [phone, setPhone] = useState('+19173496532');
  const [emergencyEnabled, setEmergencyEnabled] = useState(true);

  const t = DICT[lang];

  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchData() {
      // 1. Local storage деректерін жүктеу
      const loadedRequests = JSON.parse(localStorage.getItem('site_requests') || '[]');
      const loadedPrices = JSON.parse(localStorage.getItem('site_prices') || '{}');
      const loadedPhone = localStorage.getItem('site_phone');
      const loadedEmergency = localStorage.getItem('site_emergency');

      if (loadedRequests.length > 0) setRequests(loadedRequests);
      if (Object.keys(loadedPrices).length > 0) setPrices(prev => ({ ...prev, ...loadedPrices }));
      if (loadedPhone) setPhone(loadedPhone);
      if (loadedEmergency !== null) setEmergencyEnabled(loadedEmergency === 'true');

      // 2. Supabase деректерін оқу және синхрондау
      try {
        const { data: dbOrders } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (dbOrders && dbOrders.length > 0) {
          const formatted = dbOrders.map(o => ({
            id: o.id,
            name: o.name,
            phone: o.phone,
            service: o.service,
            address: o.address,
            note: o.note,
            date: o.created_at ? new Date(o.created_at).toLocaleString() : new Date().toLocaleString()
          }));
          setRequests(formatted);
          localStorage.setItem('site_requests', JSON.stringify(formatted));
        }

        const { data: dbServices } = await supabase.from('services').select('*');
        if (dbServices && dbServices.length > 0) {
          const newPrices: Record<string, string> = { ...prices };
          dbServices.forEach((s) => { newPrices[String(s.id)] = String(s.price); });
          setPrices(newPrices as any);
        }

        const { data: dbSettings } = await supabase.from('settings').select('*').maybeSingle();
        if (dbSettings) {
          if (dbSettings.phone) setPhone(dbSettings.phone);
          if (dbSettings.emergency_enabled !== undefined) setEmergencyEnabled(dbSettings.emergency_enabled);
        }
      } catch (err) {
        console.error('Supabase admin fetch error:', err);
      }
    }

    fetchData();
  }, [isAuthenticated]);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('❌ Қате құпия сөз!');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleDeleteRequest = async (id: number | string) => {
    if (confirm('Бұл тапсырысты өшіргіңіз келе ме?')) {
      const updated = requests.filter(r => r.id !== id);
      setRequests(updated);
      localStorage.setItem('site_requests', JSON.stringify(updated));

      try {
        await supabase.from('orders').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
    }
  };

  const handleSavePrices = async () => {
    localStorage.setItem('site_prices', JSON.stringify(prices));

    try {
      const updates = Object.entries(prices).map(([id, price]) => ({
        id: Number(id),
        price: Number(price)
      }));
      await supabase.from('services').upsert(updates);
    } catch (err) {
      console.error('Supabase prices save error:', err);
    }

    setSavedMsg('✅ Бағалар сәтті сақталды!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  const handleSaveSettings = async () => {
    localStorage.setItem('site_phone', phone);
    localStorage.setItem('site_emergency', String(emergencyEnabled));

    try {
      await supabase.from('settings').upsert([{ id: 1, phone, emergency_enabled: emergencyEnabled }]);
    } catch (err) {
      console.error('Supabase settings save error:', err);
    }

    setSavedMsg('✅ Баптаулар сәтті сақталды!');
    setTimeout(() => setSavedMsg(''), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#12131C] text-white p-4">
        <div className="bg-[#181926] p-8 rounded-3xl shadow-2xl w-96 border border-slate-800">
          <h1 className="text-2xl font-extrabold mb-6 text-center text-amber-500">{t.loginTitle}</h1>
          <input 
            type="password" 
            className="w-full p-3.5 bg-[#12131C] border border-slate-700 rounded-xl mb-4 text-white focus:outline-none focus:border-amber-500" 
            placeholder={t.placeholder} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl transition shadow-lg">{t.loginBtn}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12131C] text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* ЖОҒАРҒЫ МӘЗІР */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 bg-[#181926] p-6 rounded-3xl border border-slate-800 shadow-xl gap-4">
          <h1 className="text-2xl font-extrabold text-amber-500">{t.title}</h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-[#12131C] p-1 rounded-xl border border-slate-800">
              <button onClick={() => setLang('kk')} className={`px-3 py-1 text-xs font-black rounded-lg ${lang === 'kk' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>ҚАЗ</button>
              <button onClick={() => setLang('ru')} className={`px-3 py-1 text-xs font-black rounded-lg ${lang === 'ru' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>РУС</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 text-xs font-black rounded-lg ${lang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>ENG</button>
            </div>
            
            <button onClick={() => setActiveTab('requests')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'requests' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.requests} ({requests.length})
            </button>
            <button onClick={() => setActiveTab('prices')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'prices' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.prices}
            </button>
            <button onClick={() => setActiveTab('settings')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'settings' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.settings}
            </button>
            
            <a href="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-sm font-bold transition">{t.back}</a>
            <button onClick={handleLogout} className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-sm font-bold transition border border-red-600/30">{t.logout}</button>
          </div>
        </div>

        {/* ЗАКАЗДАР БӨЛІМІ */}
        {activeTab === 'requests' && (
          <div className="bg-[#181926] rounded-3xl p-6 border border-slate-800 shadow-xl">
            <h2 className="text-xl font-extrabold mb-6 text-amber-500">{t.requests}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4">{t.name}</th>
                    <th className="p-4">{t.phone}</th>
                    <th className="p-4">{t.service}</th>
                    <th className="p-4">{t.note}</th>
                    <th className="p-4">{t.date}</th>
                    <th className="p-4 text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-slate-500 italic">
                        {t.noReq}
                      </td>
                    </tr>
                  ) : (
                    requests.map((req) => (
                      <tr key={req.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4 font-bold">{req.name || '-'}</td>
                        <td className="p-4 text-amber-400 font-bold">{req.phone || '-'}</td>
                        <td className="p-4 text-sm">{req.service || '-'}</td>
                        <td className="p-4 text-slate-300 text-sm">{req.address} {req.note ? `(${req.note})` : ''}</td>
                        <td className="p-4 text-slate-500 text-xs">{req.date}</td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => handleDeleteRequest(req.id)}
                            className="bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition border border-red-500/30"
                          >
                            {t.delete}
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* БАҒАЛАРДЫ АУЫСТЫРУ БӨЛІМІ */}
        {activeTab === 'prices' && (
          <div className="bg-[#181926] rounded-3xl p-6 border border-slate-800 shadow-xl max-w-xl">
            <h2 className="text-xl font-extrabold mb-6 text-amber-500">{t.pricesTitle}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1">1. Emergency Lockout ($):</label>
                <input type="text" value={prices['1']} onChange={(e) => setPrices({...prices, '1': e.target.value})} className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white font-bold" />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1">2. Car Locksmith ($):</label>
                <input type="text" value={prices['2']} onChange={(e) => setPrices({...prices, '2': e.target.value})} className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white font-bold" />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1">3. Residential Locksmith ($):</label>
                <input type="text" value={prices['3']} onChange={(e) => setPrices({...prices, '3': e.target.value})} className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white font-bold" />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1">4. Commercial Locksmith ($):</label>
                <input type="text" value={prices['4']} onChange={(e) => setPrices({...prices, '4': e.target.value})} className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white font-bold" />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1">5. Key Replacement ($):</label>
                <input type="text" value={prices['5']} onChange={(e) => setPrices({...prices, '5': e.target.value})} className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white font-bold" />
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1">6. Lock Repair ($):</label>
                <input type="text" value={prices['6']} onChange={(e) => setPrices({...prices, '6': e.target.value})} className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white font-bold" />
              </div>
              <button onClick={handleSavePrices} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl transition shadow-lg mt-2">{t.saveBtn}</button>
              {savedMsg && <p className="text-emerald-400 font-bold text-center mt-2">{savedMsg}</p>}
            </div>
          </div>
        )}

        {/* БАПТАУЛАР БӨЛІМІ */}
        {activeTab === 'settings' && (
          <div className="bg-[#181926] rounded-3xl p-6 border border-slate-800 shadow-xl max-w-xl">
            <h2 className="text-xl font-extrabold mb-6 text-amber-500">{t.settings}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-slate-400 text-xs font-bold mb-1">{t.phoneLabel}</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white font-bold" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="emerg" checked={emergencyEnabled} onChange={(e) => setEmergencyEnabled(e.target.checked)} className="w-5 h-5 accent-amber-500 cursor-pointer" />
                <label htmlFor="emerg" className="text-sm font-bold text-slate-300 cursor-pointer">{t.emergencyLabel}</label>
              </div>
              <button onClick={handleSaveSettings} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl transition shadow-lg mt-4">{t.saveBtn}</button>
              {savedMsg && <p className="text-emerald-400 font-bold text-center mt-2">{savedMsg}</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}