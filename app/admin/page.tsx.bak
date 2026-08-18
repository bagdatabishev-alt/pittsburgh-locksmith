'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'bookings' | 'services' | 'settings'>('bookings');
  const [bookings, setBookings] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session || localStorage.getItem('admin_authenticated') === 'true') {
        setIsAuthenticated(true);
        loadData();
      }
    };
    checkAuth();
  }, []);

  const loadData = async () => {
    // Өтінімдерді жүктеу
    const { data: bData } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (bData) setBookings(bData);

    // Қызметтер мен прайс-листі жүктеу
    const { data: sData } = await supabase.from('services').select('*').order('id', { ascending: true });
    if (sData) setServices(sData);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const masterPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';

    if (password === masterPassword && !email) {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      loadData();
      setLoading(false);
      return;
    }

    if (email && password) {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        if (password === masterPassword) {
          localStorage.setItem('admin_authenticated', 'true');
          setIsAuthenticated(true);
          loadData();
        } else {
          setError('Email немесе құпия сөз қате!');
        }
      } else if (data.session) {
        setIsAuthenticated(true);
        loadData();
      }
    } else {
      setError('Мәліметтерді енгізіңіз');
    }

    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('admin_authenticated');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            Админ Панельге Кіру
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Email (міндетті емес)
              </label>
              <input
                type="email"
                placeholder="bagdat-1976@mail.ru"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">
                Құпия сөз
              </label>
              <input
                type="password"
                placeholder="Құпия сөзді енгізіңіз..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-slate-800 border border-slate-700 text-white p-3 rounded-lg focus:outline-none focus:border-amber-500"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm font-medium text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {loading ? 'Тексерілуде...' : 'Кіру'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        {/* Бас тақырып және Шығу батырмасы */}
        <div className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-3xl font-bold text-amber-500">Админ Панель</h1>
            <p className="text-slate-400 text-sm mt-1">Сайтты және өтінімдерді басқару орталығы</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            Шығу
          </button>
        </div>

        {/* Функцияларды ауыстыру навигациясы */}
        <div className="flex space-x-4 mb-6 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 font-medium rounded-lg transition ${
              activeTab === 'bookings' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Клиенттердің Өтінімдері ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('services')}
            className={`px-4 py-2 font-medium rounded-lg transition ${
              activeTab === 'services' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Қызметтер & Бағалар
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 font-medium rounded-lg transition ${
              activeTab === 'settings' ? 'bg-amber-500 text-black' : 'text-slate-400 hover:text-white'
            }`}
          >
            Баптаулар
          </button>
        </div>

        {/* TAB 1: Өтінімдер кестесі */}
        {activeTab === 'bookings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Барлық Өтінімдер</h2>
            {bookings.length === 0 ? (
              <p className="text-slate-500 text-center py-8">Әзірге өтінімдер келіп түскен жоқ</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-300">
                  <thead className="bg-slate-800 text-slate-200 uppercase text-xs">
                    <tr>
                      <th className="p-3">Аты</th>
                      <th className="p-3">Телефон</th>
                      <th className="p-3">Қызмет</th>
                      <th className="p-3">Мекенжай/Сипаттама</th>
                      <th className="p-3">Уақыты</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {bookings.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/50">
                        <td className="p-3 font-medium text-white">{item.name || '-'}</td>
                        <td className="p-3 text-amber-400">{item.phone || '-'}</td>
                        <td className="p-3">{item.service || '-'}</td>
                        <td className="p-3">{item.message || item.address || '-'}</td>
                        <td className="p-3 text-slate-400">
                          {item.created_at ? new Date(item.created_at).toLocaleString() : '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Қызметтер мен прайс-лист */}
        {activeTab === 'services' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Прайс-лист және Қызметтер</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.length === 0 ? (
                <p className="text-slate-500 col-span-2">Қызметтер тізімі базада дайын</p>
              ) : (
                services.map((serv, i) => (
                  <div key={i} className="bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <h3 className="font-bold text-amber-400">{serv.title || serv.name}</h3>
                    <p className="text-sm text-slate-300 mt-1">{serv.description}</p>
                    <p className="text-sm font-semibold text-white mt-2">Бағасы: {serv.price}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: Баптаулар */}
        {activeTab === 'settings' && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-white">Жүйелік баптаулар</h2>
            <p className="text-slate-400 text-sm">
              Админ панель Supabase базасымен белсенді байланысты. Электронды пошта: <span className="text-amber-400">bagdat-1976@mail.ru</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}