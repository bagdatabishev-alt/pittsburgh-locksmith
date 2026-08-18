'use client';

import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClientComponentClient();

  // Сессияны тексеру
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setIsAuthenticated(true);
      } else if (localStorage.getItem('admin_authenticated') === 'true') {
        setIsAuthenticated(true);
      }
    };
    checkAuth();
  }, [supabase]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // 1. Бұрынғы Мастер-Парольді тексеру (Егер Email жазылмаған болса немесе құпия сөз сәйкес келсе)
    const masterPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin';
    if (password === masterPassword && !email) {
      localStorage.setItem('admin_authenticated', 'true');
      setIsAuthenticated(true);
      setLoading(false);
      return;
    }

    // 2. Supabase Email + Password тексеру
    if (email && password) {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        // Егер Supabase қате берсе, мастер-парольді де тексеріп көреміз
        if (password === masterPassword) {
          localStorage.setItem('admin_authenticated', 'true');
          setIsAuthenticated(true);
        } else {
          setError('Email немесе құпия сөз қате!');
        }
      } else if (data.session) {
        setIsAuthenticated(true);
      }
    } else if (!email && password !== masterPassword) {
      setError('Құпия сөз қате!');
    } else {
      setError('Мәліметтерді толық енгізіңіз');
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
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-m-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Админ Панель</h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Шығу
          </button>
        </div>
        <p className="text-slate-400">Сәтті кірдіңіз! Басқару функциялары белсенді.</p>
      </div>
    </div>
  );
}