'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const translations: Record<string, any> = {
  kaz: {
    title: 'Master Dashboard',
    subtitle: 'Тіркелген Email немесе Телефон арқылы кіріңіз',
    emailLabel: 'Email:',
    orText: 'НЕМЕСЕ',
    phoneLabel: 'Телефон:',
    loginBtn: 'Кабинетке кіру',
    checking: 'Тексеру...',
    backToSite: '← Сайтқа қайту',
    enterEmailOrPhone: '❌ Email немесе телефон нөмірін енгізіңіз!',
    userNotFound: '❌ Мұндай мастер табылмады немесе деректер қате.',
    notActive: '⚠️ Сіздің статусыңыз әлі "ACTIVE" емес. Әкімшінің растауын күтіңіз.',
    loginError: '❌ Кіру кезінде қате шықты.',
    welcome: 'Қош келдіңіз',
    zipCodes: 'ZIP кодтарыңыз:',
    notSpecified: 'Көрсетілмеген',
    status: 'Статус:',
    logout: 'Шығу',
    availableOrders: 'Маған бөлінген тапсырыстар (Orders)',
    noOrders: 'Әзірге сізге бөлінген жаңа тапсырыстар жоқ.',
    client: 'Клиент:',
    address: 'Мекенжай:',
  },
  rus: {
    title: 'Master Dashboard',
    subtitle: 'Войдите по зарегистрированному Email или Телефону',
    emailLabel: 'Email:',
    orText: 'ИЛИ',
    phoneLabel: 'Телефон:',
    loginBtn: 'Войти в кабинет',
    checking: 'Проверка...',
    backToSite: '← Вернуться на сайт',
    enterEmailOrPhone: '❌ Введите Email или номер телефона!',
    userNotFound: '❌ Мастер не найден или данные неверны.',
    notActive: '⚠️ Ваш статус еще не "ACTIVE". Дождитесь подтверждения администратора.',
    loginError: '❌ Ошибка при входе.',
    welcome: 'Добро пожаловать',
    zipCodes: 'Ваши ZIP коды:',
    notSpecified: 'Не указано',
    status: 'Статус:',
    logout: 'Выйти',
    availableOrders: 'Назначенные мне заказы',
    noOrders: 'Пока нет назначенных вам заказов.',
    client: 'Клиент:',
    address: 'Адрес:',
  },
  eng: {
    title: 'Master Dashboard',
    subtitle: 'Log in using your registered Email or Phone',
    emailLabel: 'Email:',
    orText: 'OR',
    phoneLabel: 'Phone:',
    loginBtn: 'Log in',
    checking: 'Checking...',
    backToSite: '← Back to site',
    enterEmailOrPhone: '❌ Please enter Email or phone number!',
    userNotFound: '❌ Master not found or incorrect data.',
    notActive: '⚠️ Your status is not "ACTIVE" yet. Please wait for admin approval.',
    loginError: '❌ Error during login.',
    welcome: 'Welcome',
    zipCodes: 'Your ZIP codes:',
    notSpecified: 'Not specified',
    status: 'Status:',
    logout: 'Logout',
    availableOrders: 'Assigned Orders',
    noOrders: 'No assigned orders yet.',
    client: 'Client:',
    address: 'Address:',
  },
};

export default function MasterDashboard() {
  const [lang, setLang] = useState<'kaz' | 'rus' | 'eng'>('kaz');
  const t = translations[lang];

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [masterData, setMasterData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      let query = supabase.from('techs').select('*');
      if (email) {
        query = query.eq('email', email);
      } else if (phone) {
        query = query.eq('phone', phone);
      } else {
        setErrorMsg(t.enterEmailOrPhone);
        setLoading(false);
        return;
      }

      const { data, error } = await query.maybeSingle();

      if (error || !data) {
        setErrorMsg(t.userNotFound);
        setLoading(false);
        return;
      }

      const status = (data.subscription_status || '').toLowerCase();
      if (status !== 'active') {
        setErrorMsg(t.notActive);
        setLoading(false);
        return;
      }

      setMasterData(data);
      setIsAuthenticated(true);
      fetchMasterOrders(data);
    } catch (err) {
      console.error('Login error:', err);
      setErrorMsg(t.loginError);
    } finally {
      setLoading(false);
    }
  };

  const fetchMasterOrders = async (currentMaster: any) => {
    try {
      // Supabase-тен requests кестесінен осы мастердің ID-іне тікелей жіберілген (tech_id) немесе ZIP коды сәйкес заказдарды аламыз
      const { data: dbOrders, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Fetch orders error:', error);
        return;
      }

      if (dbOrders) {
        const masterIdStr = String(currentMaster.id);
        const masterZips = currentMaster.zip_codes ? currentMaster.zip_codes.split(',').map((z: string) => z.trim()) : [];

        const filtered = dbOrders.filter(order => {
          const isAssignedToTech = String(order.tech_id) === masterIdStr;
          const isMatchingZip = masterZips.includes(String(order.address));
          // Егер админ тікелей осы мастерге жіберсе немесе ZIP коды сай келсе көрсетеміз
          return isAssignedToTech || isMatchingZip;
        });

        setOrders(filtered);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setMasterData(null);
    setEmail('');
    setPhone('');
    setOrders([]);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#12131C] text-white p-4">
        <div className="bg-[#181926] p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-800 relative">
          
          <div className="flex justify-center gap-2 mb-6">
            {(['kaz', 'rus', 'eng'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase transition ${
                  lang === l
                    ? 'bg-amber-500 text-slate-950 shadow-lg'
                    : 'bg-[#12131C] text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {l === 'kaz' ? 'ҚАЗ' : l === 'rus' ? 'РУС' : 'ENG'}
              </button>
            ))}
          </div>

          <h1 className="text-2xl font-extrabold mb-2 text-center text-amber-500">{t.title}</h1>
          <p className="text-slate-400 text-sm text-center mb-6">{t.subtitle}</p>

          {errorMsg && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.emailLabel}</label>
              <input
                type="email"
                className="w-full p-3.5 bg-[#12131C] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm"
                placeholder="master@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="text-center text-xs text-slate-500 font-bold">{t.orText}</div>
            <div>
              <label className="block text-xs font-bold text-slate-400 mb-1">{t.phoneLabel}</label>
              <input
                type="text"
                className="w-full p-3.5 bg-[#12131C] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm"
                placeholder="+1917XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl transition shadow-lg mt-2 text-sm"
            >
              {loading ? t.checking : t.loginBtn}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-xs text-slate-400 hover:text-amber-500 font-bold transition">
              {t.backToSite}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12131C] text-white p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-[#181926] p-6 rounded-3xl border border-slate-800 shadow-xl gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-amber-500">
              {t.welcome}, {masterData.full_name}!
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              {t.zipCodes} <span className="text-amber-400 font-mono font-bold">{masterData.zip_codes || t.notSpecified}</span> | 
              {t.status} <span className="text-emerald-400 font-bold uppercase">ACTIVE</span>
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex gap-1 bg-[#12131C] p-1 rounded-xl border border-slate-800">
              {(['kaz', 'rus', 'eng'] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase transition ${
                    lang === l
                      ? 'bg-amber-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l === 'kaz' ? 'ҚАЗ' : l === 'rus' ? 'РУС' : 'ENG'}
                </button>
              ))}
            </div>

            <a href="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition">
              {t.backToSite}
            </a>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-xl text-xs font-bold transition border border-red-600/30"
            >
              {t.logout}
            </button>
          </div>
        </div>

        <div className="bg-[#181926] rounded-3xl p-6 border border-slate-800 shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-extrabold text-amber-500">{t.availableOrders}</h2>
            <button 
              onClick={() => fetchMasterOrders(masterData)}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-300 transition flex items-center gap-2 cursor-pointer"
            >
              🔄 Жаңарту
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="text-center p-12 text-slate-500 italic">
              {t.noOrders}
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-[#12131C] p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="bg-amber-500/20 text-amber-400 text-xs font-black px-2.5 py-1 rounded-lg border border-amber-500/30">
                        {order.service || 'Locksmith Service'}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {order.created_at ? new Date(order.created_at).toLocaleString() : ''}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-1">{t.client} {order.name}</h3>
                    <p className="text-slate-300 text-sm mt-0.5">{t.address} <span className="text-amber-300 font-semibold">{order.address}</span> {order.note ? `(${order.note})` : ''}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    <a
                      href={`tel:${order.phone}`}
                      className="bg-emerald-500/20 hover:bg-emerald-600 text-emerald-400 hover:text-white px-4 py-2.5 rounded-xl text-xs font-bold transition border border-emerald-500/30 text-center flex-1 md:flex-none"
                    >
                      📞 {order.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}