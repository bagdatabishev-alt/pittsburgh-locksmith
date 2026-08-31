'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const DICT = {
  kk: {
    title: 'Панель управления сайтом',
    requests: 'Шұғыл өтініштер (Requests)',
    appointments: 'Жоспарлы тапсырыстар (Appointments)',
    techs: 'Шеберлер',
    prices: 'Бағалар',
    settings: 'Баптаулар',
    back: 'Сайтқа қайту',
    logout: 'Шығу',
    refresh: 'Жаңарту 🔄',
    noReq: 'Әзірге өтініштер жоқ.',
    noApp: 'Әзірге жоспарлы тапсырыстар жоқ.',
    noTechs: 'Әзірге тіркелген шеберлер жоқ.',
    name: 'Аты',
    phone: 'Телефон',
    service: 'Қызмет',
    note: 'Мекенжай / Ескерту',
    dateTime: 'Күні мен уақыты',
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
    whatsapp: 'WhatsApp 📲',
    selectTech: 'Шеберді таңдаңыз',
    statusHeader: 'Статус (Мастер жауабы)',
    reviewsTitle: 'Пікірлер мен Рейтинг',
    noReviewsList: 'Әзірге пікірлер жоқ.',
    ratingLabel: 'Рейтинг',
    commentLabel: 'Пікір',
    orderLabel: 'Тапсырыс №'
  },
  ru: {
    title: 'Панель управления сайтом',
    requests: 'Шұғыл өтініштер (Requests)',
    appointments: 'Запланированные заявки (Appointments)',
    techs: 'Мастера',
    prices: 'Цены',
    settings: 'Настройки',
    back: 'На сайт',
    logout: 'Выйти',
    refresh: 'Обновить 🔄',
    noReq: 'Заявок пока нет.',
    noApp: 'Запланированных заявок пока нет.',
    noTechs: 'Зарегистрированных мастеров пока нет.',
    name: 'Имя',
    phone: 'Телефон',
    service: 'Услуга',
    note: 'Адрес / Заметка',
    dateTime: 'Дата и время',
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
    whatsapp: 'WhatsApp 📲',
    selectTech: 'Выберите мастера',
    statusHeader: 'Status (Ответ мастера)',
    reviewsTitle: 'Отзывы и Рейтинг',
    noReviewsList: 'Отзывов пока нет.',
    ratingLabel: 'Рейтинг',
    commentLabel: 'Отзыв',
    orderLabel: 'Заказ №'
  },
  en: {
    title: 'Site Control Panel',
    requests: 'Requests',
    appointments: 'Appointments',
    techs: 'Technicians',
    prices: 'Prices',
    settings: 'Settings',
    back: 'Back to Site',
    logout: 'Logout',
    refresh: 'Refresh 🔄',
    noReq: 'No requests yet.',
    noApp: 'No appointments yet.',
    noTechs: 'No registered technicians yet.',
    name: 'Name',
    phone: 'Phone',
    service: 'Service',
    note: 'Address / Note',
    dateTime: 'Date & Time',
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
    whatsapp: 'WhatsApp 📲',
    selectTech: 'Select Tech',
    statusHeader: 'Status (Tech Reply)',
    reviewsTitle: 'Reviews & Ratings',
    noReviewsList: 'No reviews yet.',
    ratingLabel: 'Rating',
    commentLabel: 'Comment',
    orderLabel: 'Order #'
  }
};

export default function AdminPage() {
  const [lang, setLang] = useState<'kk' | 'ru' | 'en'>('kk');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginMode, setLoginMode] = useState<'pass' | 'email'>('pass');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [requests, setRequests] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [techs, setTechs] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'requests' | 'appointments' | 'techs' | 'reviews' | 'prices' | 'settings'>('requests');
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

  const fetchData = async () => {
    try {
      const { data: dbOrders, error: ordersError } = await supabase.from('requests').select('*').order('created_at', { ascending: false });
      if (!ordersError && dbOrders) {
        const formatted = dbOrders.map(o => ({
          id: o.id,
          name: o.name,
          phone: o.phone,
          service: o.service,
          address: o.address,
          note: o.note,
          tech_id: o.tech_id || '',
          status: o.status || 'pending',
          date: o.created_at ? new Date(o.created_at).toLocaleString() : new Date().toLocaleString()
        }));
        setRequests(formatted);
      }

      const { data: dbAppointments, error: appError } = await supabase.from('appointments').select('*').order('created_at', { ascending: false });
      if (!appError && dbAppointments) {
        const formattedApp = dbAppointments.map(a => ({
          id: a.id,
          name: a.client_name || a.name,
          phone: a.phone,
          service: a.service,
          date_time: a.date_time || a.appointment_date || '-',
          note: a.note || a.address || '',
          tech_id: a.tech_id || '',
          status: a.status || 'pending'
        }));
        setAppointments(formattedApp);
      }

      const { data: dbTechs } = await supabase.from('techs').select('*').order('created_at', { ascending: false });
      if (dbTechs) {
        setTechs(dbTechs);
      }

      const { data: dbReviews, error: revError } = await supabase.from('reviews').select('*').order('created_at', { ascending: false });
      if (!revError && dbReviews) {
        setReviews(dbReviews);
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
  };

  useEffect(() => {
    if (!isAuthenticated) return;
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
      const { error } = await supabase.auth.signInWithPassword({ email, password });
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
      setRequests(requests.filter(r => r.id !== id));
      try {
        await supabase.from('requests').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete error:', err);
      }
    }
  };

  const handleDeleteAppointment = async (id: number | string) => {
    if (confirm('Бұл жоспарлы тапсырысты өшіргіңіз келе ме?')) {
      setAppointments(appointments.filter(a => a.id !== id));
      try {
        await supabase.from('appointments').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete appointment error:', err);
      }
    }
  };

  const handleAssignOrder = async (orderId: number | string, techId: string) => {
    if (!techId) {
      alert('⚠️ Алдымен шеберді таңдаңыз!');
      return;
    }
    setRequests(requests.map(r => r.id === orderId ? { ...r, tech_id: techId, status: 'pending' } : r));
    try {
      const { error } = await supabase.from('requests').update({ tech_id: techId, status: 'pending' }).eq('id', orderId);
      if (error) {
        alert('❌ Қате: ' + error.message);
      } else {
        alert('✅ Тапсырыс шеберге сәтті сақталды!');
        fetchData();
      }
    } catch (err) {
      console.error('Supabase assign order error:', err);
    }
  };

  // Түзетілген функция: `tech_id` мен `status` мәндерін бірге базаға жазады
  const handleAssignAppointment = async (appId: number | string, techId: string) => {
    if (!techId) {
      alert('⚠️ Алдымен шеберді таңдаңыз!');
      return;
    }
    setAppointments(appointments.map(a => a.id === appId ? { ...a, tech_id: techId, status: 'pending' } : a));
    try {
      const { error } = await supabase.from('appointments').update({ tech_id: techId, status: 'pending' }).eq('id', appId);
      if (error) {
        alert('❌ Қате: ' + error.message);
      } else {
        alert('✅ Жоспарлы тапсырыс шеберге сәтті сақталды!');
        fetchData();
      }
    } catch (err) {
      console.error('Supabase assign appointment error:', err);
      alert('❌ Қате кетті!');
    }
  };

  const sendToWhatsApp = (req: any) => {
    const assignedTech = techs.find(t => String(t.id) === String(req.tech_id));
    const techPhone = assignedTech ? assignedTech.phone || '' : '';
    const text = `🛠 Жаңа тапсырыс!\n👤 Аты: ${req.name || '-'}\n📞 Тел: ${req.phone || '-'}\n🚗 Қызмет: ${req.service || '-'}\n📍 Мекенжай/Ескерту: ${req.address || '-'} ${req.note ? '(' + req.note + ')' : ''}`;
    window.open(`https://api.whatsapp.com/send?phone=${techPhone}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const sendAppointmentToWhatsApp = (app: any) => {
    const assignedTech = techs.find(t => String(t.id) === String(app.tech_id));
    const techPhone = assignedTech ? assignedTech.phone || '' : '';
    const text = `📅 Жоспарлы тапсырыс!\n👤 Аты: ${app.name || '-'}\n📞 Тел: ${app.phone || '-'}\n🚗 Қызмет: ${app.service || '-'}\n⏰ Күні/Уақыты: ${app.date_time || '-'}\n📝 Ескерту: ${app.note || '-'}`;
    window.open(`https://api.whatsapp.com/send?phone=${techPhone}&text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleDeleteTech = async (id: number | string) => {
    if (confirm('Бұл шеберді өшіргіңіз келе ме?')) {
      setTechs(techs.filter(t => t.id !== id));
      try {
        await supabase.from('techs').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete tech error:', err);
      }
    }
  };

  const handleDeleteReview = async (id: number | string) => {
    if (confirm('Бұл пікірді өшіргіңіз келе ме?')) {
      setReviews(reviews.filter(r => r.id !== id));
      try {
        await supabase.from('reviews').delete().eq('id', id);
      } catch (err) {
        console.error('Supabase delete review error:', err);
      }
    }
  };

  const handleStatusChange = async (id: number | string, newStatus: string) => {
    setTechs(techs.map(t => t.id === id ? { ...t, subscription_status: newStatus } : t));
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
            <input type="email" className="w-full p-3.5 bg-[#12131C] border border-slate-700 rounded-xl mb-3 text-white focus:outline-none focus:border-amber-500" placeholder={t.placeholderEmail} value={email} onChange={(e) => setEmail(e.target.value)} />
          )}
          <input type="password" className="w-full p-3.5 bg-[#12131C] border border-slate-700 rounded-xl mb-4 text-white focus:outline-none focus:border-amber-500" placeholder={t.placeholderPass} value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin} className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl transition shadow-lg">{t.loginBtn}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12131C] text-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 bg-[#181926] p-6 rounded-3xl border border-slate-800 shadow-xl gap-4">
          <h1 className="text-xl font-extrabold text-amber-500">{t.title}</h1>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex bg-[#12131C] p-1 rounded-xl border border-slate-800">
              <button onClick={() => setLang('kk')} className={`px-3 py-1 text-xs font-black rounded-lg ${lang === 'kk' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>ҚАЗ</button>
              <button onClick={() => setLang('ru')} className={`px-3 py-1 text-xs font-black rounded-lg ${lang === 'ru' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>РУС</button>
              <button onClick={() => setLang('en')} className={`px-3 py-1 text-xs font-black rounded-lg ${lang === 'en' ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}>ENG</button>
            </div>
            
            <button onClick={fetchData} className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500 text-amber-400 hover:text-slate-950 rounded-xl text-xs font-bold transition border border-amber-500/30">
              {t.refresh}
            </button>
            
            <button onClick={() => setActiveTab('requests')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'requests' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.requests} ({requests.length})
            </button>
            <button onClick={() => setActiveTab('appointments')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'appointments' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.appointments} ({appointments.length})
            </button>
            <button onClick={() => setActiveTab('techs')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'techs' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.techs} ({techs.length})
            </button>
            <button onClick={() => setActiveTab('reviews')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'reviews' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.reviewsTitle} ({reviews.length})
            </button>
            <button onClick={() => setActiveTab('prices')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'prices' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.prices}
            </button>
            <button onClick={() => setActiveTab('settings')} className={`px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'settings' ? 'bg-amber-500 text-slate-950 shadow-lg' : 'bg-slate-800 text-slate-300'}`}>
              {t.settings}
            </button>
            
            <a href="/" className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition">{t.back}</a>
            <button onClick={handleLogout} className="px-3.5 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-xs font-bold transition border border-red-600/30">{t.logout}</button>
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
                    <th className="p-4">{t.statusHeader || 'Статус'}</th>
                    <th className="p-4 text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {requests.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-slate-500 italic">{t.noReq}</td>
                    </tr>
                  ) : (
                    requests.map((req, index) => {
                      const matchedReview = reviews.find(rev => {
                        if (!rev.order_id) return false;
                        const cleanRevId = String(rev.order_id).trim();
                        const cleanReqId = String(req.id).trim();
                        return cleanRevId === cleanReqId || 
                               cleanRevId === String(index + 1) || 
                               cleanRevId === String(requests.length - index);
                      });
                      return (
                        <tr key={req.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-4 font-bold">{req.name || '-'}</td>
                          <td className="p-4 text-amber-400 font-bold">{req.phone || '-'}</td>
                          <td className="p-4 text-sm">{req.service || '-'}</td>
                          <td className="p-4 text-slate-300 text-sm">{req.address} {req.note ? `(${req.note})` : ''}</td>
                          <td className="p-4 text-slate-500 text-xs">{req.date}</td>
                          
                          <td className="p-4 text-xs font-bold">
                            {req.status === 'completed' && (
                              <div className="space-y-1">
                                <span className="text-green-400 block">Орындалды ✅</span>
                                {matchedReview ? (
                                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-[11px] font-normal mt-1">
                                    <div className="text-amber-400 font-bold text-sm">{'⭐'.repeat(Number(matchedReview.rating || 5))}</div>
                                    <div className="text-slate-200 italic mt-0.5">"{matchedReview.comment || ''}"</div>
                                  </div>
                                ) : (
                                  <div className="text-slate-500 text-[10px] italic">Пікір әлі жазылмаған</div>
                                )}
                              </div>
                            )}
                            {req.status === 'returned' && <span className="text-red-400">Істей алмады ❌</span>}
                            {req.status === 'help_requested' && <span className="text-orange-400">Көмек сұралды 🆘</span>}
                            {req.status === 'paused' && <span className="text-purple-400">Кідіртілді ⏸️</span>}
                            {(!req.status || req.status === 'pending') && <span className="text-amber-400">Күтуде ⏳</span>}
                          </td>

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

                              <button onClick={() => handleAssignOrder(req.id, req.tech_id)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-black transition shadow">
                                {t.assign}
                              </button>

                              <button onClick={() => sendToWhatsApp(req)} className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow">
                                {t.whatsapp}
                              </button>

                              <button onClick={() => handleDeleteRequest(req.id)} className="bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition border border-red-500/30">
                                {t.delete}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-[#181926] rounded-3xl p-6 border border-slate-800 shadow-xl">
            <h2 className="text-xl font-extrabold mb-6 text-amber-500">{t.appointments}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4">{t.name}</th>
                    <th className="p-4">{t.phone}</th>
                    <th className="p-4">{t.service}</th>
                    <th className="p-4">{t.dateTime}</th>
                    <th className="p-4">{t.note}</th>
                    <th className="p-4">{t.statusHeader || 'Статус'}</th>
                    <th className="p-4 text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-slate-500 italic">{t.noApp}</td>
                    </tr>
                  ) : (
                    appointments.map((app, index) => {
                      const matchedReview = reviews.find(rev => {
                        if (!rev.order_id) return false;
                        const cleanRevId = String(rev.order_id).trim();
                        const cleanAppId = String(app.id).trim();
                        return cleanRevId === cleanAppId || 
                               cleanRevId === String(index + 1);
                      });
                      return (
                        <tr key={app.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-4 font-bold">{app.name || '-'}</td>
                          <td className="p-4 text-amber-400 font-bold">{app.phone || '-'}</td>
                          <td className="p-4 text-sm">{app.service || '-'}</td>
                          <td className="p-4 text-amber-300 font-semibold text-xs">{app.date_time || '-'}</td>
                          <td className="p-4 text-slate-300 text-sm">{app.note || '-'}</td>
                          
                          <td className="p-4 text-xs font-bold">
                            {app.status === 'completed' && (
                              <div className="space-y-1">
                                <span className="text-green-400 block">Орындалды ✅</span>
                                {matchedReview ? (
                                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-[11px] font-normal mt-1">
                                    <div className="text-amber-400 font-bold text-sm">{'⭐'.repeat(Number(matchedReview.rating || 5))}</div>
                                    <div className="text-slate-200 italic mt-0.5">"{matchedReview.comment || ''}"</div>
                                  </div>
                                ) : (
                                  <div className="text-slate-500 text-[10px] italic">Пікір әлі жазылмаған</div>
                                )}
                              </div>
                            )}
                            {app.status === 'returned' && <span className="text-red-400">Істей алмады ❌</span>}
                            {app.status === 'help_requested' && <span className="text-orange-400">Көмек сұралды 🆘</span>}
                            {app.status === 'paused' && <span className="text-purple-400">Кідіртілді ⏸️</span>}
                            {(!app.status || app.status === 'pending') && <span className="text-amber-400">Күтуде ⏳</span>}
                          </td>

                          <td className="p-4 text-center">
                            <div className="flex items-center justify-center gap-2 flex-wrap">
                              <select 
                                value={app.tech_id || ''} 
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setAppointments(appointments.map(a => a.id === app.id ? { ...a, tech_id: val } : a));
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

                              <button onClick={() => handleAssignAppointment(app.id, app.tech_id)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-black transition shadow">
                                {t.assign}
                              </button>

                              <button onClick={() => sendAppointmentToWhatsApp(app)} className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition shadow">
                                {t.whatsapp}
                              </button>

                              <button onClick={() => handleDeleteAppointment(app.id)} className="bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition border border-red-500/30">
                                {t.delete}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
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
                    <th className="p-4">{t.reviewsTitle}</th>
                    <th className="p-4 text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {techs.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center p-8 text-slate-500 italic">{t.noTechs}</td>
                    </tr>
                  ) : (
                    techs.map((tech) => {
                      const techReviews = reviews.filter(rev => String(rev.tech_id).trim() === String(tech.id).trim());
                      const avgRating = techReviews.length > 0 
                        ? (techReviews.reduce((acc, r) => acc + Number(r.rating || 0), 0) / techReviews.length).toFixed(1) 
                        : '0.0';

                      return (
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

                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="text-amber-400 font-black text-xs flex items-center gap-1">
                                ⭐ {avgRating} <span className="text-slate-400 font-normal">({techReviews.length} пікір)</span>
                              </div>
                              <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                                {techReviews.map((rev, idx) => (
                                  <div key={idx} className="bg-[#12131C] p-2 rounded-xl border border-slate-800 text-[11px]">
                                    <div className="text-amber-400">{'⭐'.repeat(Number(rev.rating || 5))}</div>
                                    <div className="text-slate-300 italic">"{rev.comment}"</div>
                                  </div>
                                ))}
                                {techReviews.length === 0 && <span className="text-slate-500 text-xs italic">Пікірлер жоқ</span>}
                              </div>
                            </div>
                          </td>

                          <td className="p-4 text-center">
                            <button onClick={() => handleDeleteTech(tech.id)} className="bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition border border-red-500/30">
                              {t.delete}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="bg-[#181926] rounded-3xl p-6 border border-slate-800 shadow-xl">
            <h2 className="text-xl font-extrabold mb-6 text-amber-500">{t.reviewsTitle}</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4">{t.orderLabel}</th>
                    <th className="p-4">{t.techName}</th>
                    <th className="p-4">{t.ratingLabel}</th>
                    <th className="p-4">{t.commentLabel}</th>
                    <th className="p-4">{t.date}</th>
                    <th className="p-4 text-center">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {reviews.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center p-8 text-slate-500 italic">{t.noReviewsList}</td>
                    </tr>
                  ) : (
                    reviews.map((rev) => {
                      const matchedTech = techs.find(tc => String(tc.id).trim() === String(rev.tech_id).trim());
                      return (
                        <tr key={rev.id} className="hover:bg-slate-800/40 transition">
                          <td className="p-4 font-bold text-amber-400">#{rev.order_id}</td>
                          <td className="p-4 text-sm text-slate-300">{matchedTech?.full_name || matchedTech?.email || ('#' + rev.tech_id)}</td>
                          <td className="p-4 text-amber-400 font-bold whitespace-nowrap">{'⭐'.repeat(Number(rev.rating || 0))}</td>
                          <td className="p-4 text-sm text-slate-300 italic max-w-sm">"{rev.comment}"</td>
                          <td className="p-4 text-xs text-slate-400 whitespace-nowrap">{rev.created_at ? new Date(rev.created_at).toLocaleString() : '-'}</td>
                          <td className="p-4 text-center">
                            <button onClick={() => handleDeleteReview(rev.id)} className="bg-red-500/20 hover:bg-red-600 text-red-400 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold transition border border-red-500/30">
                              {t.delete}
                            </button>
                          </td>
                        </tr>
                      );
                    })
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
              <button onClick={handleSavePrices} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 rounded-xl transition shadow-lg">{t.saveBtn}</button>
              {savedMsg && <p className="text-green-400 text-center font-bold text-sm mt-2">{savedMsg}</p>}
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
                <input type="checkbox" checked={emergencyEnabled} onChange={(e) => setEmergencyEnabled(e.target.checked)} className="w-5 h-5 accent-amber-500 cursor-pointer" />
                <label className="text-slate-300 text-sm font-bold">{t.emergencyLabel}</label>
              </div>
              <button onClick={handleSaveSettings} className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 rounded-xl transition shadow-lg mt-4">{t.saveBtn}</button>
              {savedMsg && <p className="text-green-400 text-center font-bold text-sm mt-2">{savedMsg}</p>}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}