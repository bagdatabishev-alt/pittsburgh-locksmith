'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const DICT = {
  kk: {
    title: 'Панель управления сайтом',
    requests: 'Өтініштер',
    techs: 'Шеберлер',
    prices: 'Бағалар',
    settings: 'Баптаулар',
    back: 'Сайтқа қайту',
    logout: 'Шығу',
    noReq: 'Әзірге өтініштер жоқ.',
    noTechs: 'Әзірге тіркелген шеберлер жоқ.',
    name: 'Аты',
    phone: 'Телефон',
    service: 'Қызмет',
    note: 'Мекенжай / Ескерту',
    date: 'Уақыты',
    actions: 'Әрекет',
    delete: 'Жою',
    loginTitle: 'Админ Панельге Кіру',
    placeholderPass: 'Құпия сөзді енгізіңіз...',
    placeholderEmail: 'Email енгізіңіз...',
    loginBtn: 'Кіру',
    pricesTitle: 'Қызмет бағаларын өңдеу',
    saveBtn: 'Сақтау',
    phoneLabel: 'Сайттағы телефон нөмірі:',
    emergencyLabel: 'Төтенше жағдай блогын көрсету:',
    techName: 'Шебер Аты',
    techEmail: 'Email',
    techZips: 'ZIP Кодтар',
    techStatus: 'Статус',
    usePass: 'Мастер-парольмен кіру',
    useEmail: 'Email/Парольмен кіру (Supabase Auth)',
    assign: 'Жіберу',
    selectTech: 'Шеберді таңдаңыз'
  },
  ru: {
    title: 'Панель управления сайтом',
    requests: 'Заявки',
    techs: 'Мастера',
    prices: 'Цены',
    settings: 'Настройки',
    back: 'На сайт',
    logout: 'Выйти',
    noReq: 'Заявок пока нет.',
    noTechs: 'Зарегистрированных мастеров пока нет.',
    name: 'Имя',
    phone: 'Телефон',
    service: 'Услуга',
    note: 'Адрес / Заметка',
    date: 'Дата',
    actions: 'Действие',
    delete: 'Удалить',
    loginTitle: 'Вход в админ-панель',
    placeholderPass: 'Введите пароль...',
    placeholderEmail: 'Введите Email...',
    loginBtn: 'Войти',
    pricesTitle: 'Редактирование цен на услуги',
    saveBtn: 'Сохранить',
    phoneLabel: 'Телефон на сайте:',
    emergencyLabel: 'Показывать блок экстренного вызова:',
    techName: 'Имя Мастера',
    techEmail: 'Email',
    techZips: 'ZIP коды',
    techStatus: 'Статус',
    usePass: 'Вход по мастер-паролю',
    useEmail: 'Вход по Email/Паролю (Supabase Auth)',
    assign: 'Назначить',
    selectTech: 'Выберите мастера'
  },
  en: {
    title: 'Site Control Panel',
    requests: 'Requests',
    techs: 'Technicians',
    prices: 'Prices',
    settings: 'Settings',
    back: 'Back to Site',
    logout: 'Logout',
    noReq: 'No requests yet.',
    noTechs: 'No registered technicians yet.',
    name: 'Name',
    phone: 'Phone',
    service: 'Service',
    note: 'Address / Note',
    date: 'Date',
    actions: 'Action',
    delete: 'Delete',
    loginTitle: 'Admin Panel Login',
    placeholderPass: 'Enter password...',
    placeholderEmail: 'Enter email...',
    loginBtn: 'Login',
    pricesTitle: 'Edit Service Prices',
    saveBtn: 'Save',
    phoneLabel: 'Site Phone Number:',
    emergencyLabel: 'Show Emergency Block:',
    techName: 'Tech Name',
    techEmail: 'Email',
    techZips: 'ZIP Codes',
    techStatus: 'Status',
    usePass: 'Login with Master Password',
    useEmail: 'Login with Email/Password (Supabase Auth)',
    assign: 'Assign',
    selectTech: 'Select Tech'
  }
};

export default function AdminPage() {
  const [lang, setLang] = useState<'kk' | 'ru' | 'en'>('kk');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginMode, setLoginMode] = useState<'pass' | 'email'>('pass');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [requests, setRequests] = useState<any[]>([]);
  const [techs, setTechs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'techs' | 'prices' | 'settings'>('requests');
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
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
      }
    }
    checkAuth();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    async function fetchData() {
      try {
        // Тікелей Supabase базасынан заказдарды оқимыз
        const { data: dbOrders } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
        if (dbOrders) {
          const formatted = dbOrders.map(o => ({
            id: o.id,
            name: o.name,
            phone: o.phone,
            service: o.service,
            address: o.address,
            note: o.note,
            tech_id: o.tech_id || '',
            date: o.created_at ? new Date(o.created_at).toLocaleString() : new Date().toLocaleString()
          }));
          setRequests(formatted);
        }

        const { data: dbTechs } = await supabase.from('techs').select('*').order('created_at', { ascending: false });
        if (dbTechs) {
          setTechs(dbTechs);
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

  const handleLogin = async () => {
    if (loginMode === 'pass') {
      if (password === 'admin123') {
        setIsAuthenticated(true);
      } else {
        alert('❌ Қате құпия сөз!');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        alert('❌ Еңгізілген Email немесе Пароль қате: ' + error.message);
      } else {
        setIsAuthenticated(true);
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    setPassword('');
    setEmail('');
  };

  const handleDeleteRequest = async (id: number | string) => {
    if (confirm('Бұл тапсырысты өшіргіңіз келе ме?')) {
      const updated = requests.filter(r => r.id !== id);
      setRequests(updated);

      try {
        await supabase.from('requests').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
    }
  };

  const handleAssignOrder = async (orderId: number | string, techId: string) => {
    if (!techId) {
      alert('⚠️ Алдымен шеберді таңдаңыз!');
      return;
    }

    const updated = requests.map(r => r.id === orderId ? { ...r, tech_id: techId } : r);
    setRequests(updated);

    try {
      // Тікелей Supabase-ке tech_id жаңартамыз (мастер көре алуы үшін)
      const { error } = await supabase.from('requests').update({ tech_id: techId }).eq('id', orderId);
      if (error) {
        console.error('Supabase update order error:', error);
        alert('❌ Қате кетті: ' + error.message);
      } else {
        alert('✅ Тапсырыс шеберге сәтті жіберілді!');
      }
    } catch (err) {
      console.error('Supabase assign order error:', err);
    }
  };

  const handleDeleteTech = async (id: number | string) => {
    if (confirm('Бұл шеберді өшіргіңіз келе ме?')) {
      const updated = techs.filter(t => t.id !== id);
      setTechs(updated);

      try {
        await supabase.from('techs').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete tech error:', err);
      }
    }
  };

  const handleStatusChange = async (id: number | string, newStatus: string) => {
    const updated = techs.map(t => t.id === id ? { ...t, subscription_status: newStatus } : t);
    setTechs(updated);

    try {
      await supabase.from('techs').update({ subscription_status: newStatus }).eq('id', id);
    } catch (err) {
      console.error('Supabase status update error:', err);
    }
  };

  const handleSavePrices = async () => {
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
          <h1 className="text-2xl font-extrabold mb-4 text-center text-amber-500">{t.loginTitle}</h1>
          
          <div className="flex gap-2 mb-6 bg-[#12131C] p-1 rounded-xl border border-slate-800 text-[11px] font-bold">
            <button onClick={() => setLoginMode('pass')} className={`flex-1 py-2 rounded-lg ${loginMode === 'pass' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>{t.usePass}</button>
            <button onClick={() => setLoginMode('email')} className={`flex-1 py-2 rounded-lg ${loginMode === 'email' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>{t.useEmail}</button>
          </div>

          {loginMode === 'email' && (
            <input 
              type="email" 
              className="w-full p-3.5 bg-[#12131C] border border-slate-700 rounded-xl mb-3 text-white focus:outline-none focus:border-amber-500" 
              placeholder={t.placeholderEmail} 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <input 
            type="password" 
            className="w-full p-3.5 bg-[#12131C] border border-slate-700 rounded-xl mb-4 text-white focus:outline-none focus:border-amber-500" 
            placeholder={t.placeholderPass} 
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
            <button onClick={() => setActiveTab('techs')} className={`px-4 py-2 rounded-xl text-sm font-bold transition ${activeTab === 'techs' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.techs} ({techs.length})
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
                          <div className="flex items-center justify-center gap-2 flex-wrap">
                            <select 
                              value={req.tech_id || ''} 
                              onChange={(e) => {
                                const val = e.target.value;
                                setRequests(requests.map(r => r.id === req.id ? { ...r, tech_id: val } : r));
                              }}
                              className="bg-[#12131C] border border-slate-700 text-amber-400 font-bold px-2.5 py-1.5 rounded-lg text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
                            >
                              <option value="">-- {t.selectTech} --</option>
                              {techs.map(tech => (
                                <option key={tech.id} value={tech.id}>
                                  {tech.full_name || tech.email || 'Мастер #' + tech.id}
                                </option>
                              ))}
                            </select>

                            <button 
                              onClick={() => handleAssignOrder(req.id, req.tech_id)}
                              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-black transition shadow"
                            >
                              {t.assign}
                            </button>

                            <button 
                              onClick={() => handleDeleteRequest(req.id)}
                              className="bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition border border-red-500/30"
                            >
                              {t.delete}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'techs' && (
          <div className="bg-[#181926] rounded-3xl p-6 border border-slate-800 shadow-xl">
            <h2 className="text-xl font-extrabold mb-6 text-amber-500">{t.techs}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4">{t.techName}</th>
                    <th className="p-4">{t.phone}</th>
                    <th className="p-4">{t.techEmail}</th>
                    <th className="p-4">{t.techZips}</th>
                    <th className="p-4">{t.techStatus}</th>
                    <th className="p-4 text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {techs.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-slate-500 italic">
                        {t.noTechs}
                      </td>
                    </tr>
                  ) : (
                    techs.map((tech) => (
                      <tr key={tech.id} className="hover:bg-slate-800/40 transition">
                        <td className="p-4 font-bold">{tech.full_name || '-'}</td>
                        <td className="p-4 text-amber-400 font-bold">{tech.phone || '-'}</td>
                        <td className="p-4 text-sm text-slate-300">{tech.email || '-'}</td>
                        <td className="p-4 text-sm font-mono text-slate-300">{tech.zip_codes || '-'}</td>
                        <td className="p-4">
                          <select 
                            value={tech.subscription_status || 'pending'} 
                            onChange={(e) => handleStatusChange(tech.id, e.target.value)}
                            className="bg-[#12131C] border border-slate-700 text-amber-400 font-bold px-2.5 py-1 rounded-lg text-xs focus:outline-none focus:border-amber-500 cursor-pointer"
                          >
                            <option value="pending">PENDING</option>
                            <option value="active">ACTIVE</option>
                            <option value="rejected">REJECTED</option>
                          </select>
                        </td>
                        <td className="p-4 text-center">
                          <button 
                            onClick={() => handleDeleteTech(tech.id)}
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