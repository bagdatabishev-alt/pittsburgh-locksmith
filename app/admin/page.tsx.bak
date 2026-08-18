'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

type Lang = 'KAZ' | 'RUS' | 'ENG';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState<'leads' | 'techs' | 'prices' | 'settings'>('leads');
  const [lang, setLang] = useState<Lang>('KAZ');

  const [leads, setLeads] = useState<any[]>([]);
  const [techs, setTechs] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Логин тексеру
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    // Мастер-пароль немесе Email арқылы кіру
    if (password === 'admin123') {
      setIsAuthenticated(true);
      fetchData();
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      if (data.user) {
        setIsAuthenticated(true);
        fetchData();
      }
    } catch (err: any) {
      setLoginError('Электронды пошта немесе құпия сөз қате!');
    }
  };

  // Деректерді базадан жүктеу
  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: leadsData } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
      const { data: techsData } = await supabase.from('techs').select('*').order('created_at', { ascending: false });
      
      if (leadsData) setLeads(leadsData);
      if (techsData) setTechs(techsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Тапсырысты өшіру
  const handleDeleteLead = async (id: number) => {
    if (!confirm('Өтінішті өшіруге сенімдісіз бе?')) return;
    await supabase.from('leads').delete().eq('id', id);
    fetchData();
  };

  // Шеберді өшіру
  const handleDeleteTech = async (id: number) => {
    if (!confirm('Шеберді өшіруге сенімдісіз бе?')) return;
    await supabase.from('techs').delete().eq('id', id);
    fetchData();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#12131C] text-white flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="max-w-sm w-full bg-[#181926] p-8 rounded-3xl border border-slate-800 space-y-4">
          <h1 className="text-xl font-extrabold text-amber-500 text-center">Админ Панельге Кіру</h1>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Email (міндетті емес)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Құпия сөз/Мастер-пароль *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-500"
              placeholder="••••••••"
            />
          </div>
          {loginError && <p className="text-red-400 text-xs text-center font-bold">{loginError}</p>}
          <button type="submit" className="w-full bg-amber-500 text-slate-950 font-black py-3 rounded-xl hover:bg-amber-400 transition">
            Кіру
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#12131C] text-white p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Басқару Панелі Мәзірі */}
        <div className="bg-[#181926] p-6 rounded-3xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-xl font-black text-amber-500">Панель управления сайтом</h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Тілдер */}
            <div className="flex bg-[#12131C] p-1 rounded-xl border border-slate-800">
              {(['KAZ', 'RUS', 'ENG'] as Lang[]).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition ${lang === l ? 'bg-amber-500 text-slate-950' : 'text-slate-400'}`}
                >
                  {l}
                </button>
              ))}
            </div>

            {/* Навигация */}
            <button
              onClick={() => setActiveTab('leads')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition ${activeTab === 'leads' ? 'bg-amber-500 text-slate-950' : 'bg-[#12131C] text-slate-300'}`}
            >
              Өтініштер ({leads.length})
            </button>
            <button
              onClick={() => setActiveTab('techs')}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition ${activeTab === 'techs' ? 'bg-amber-500 text-slate-950' : 'bg-[#12131C] text-slate-300'}`}
            >
              Шеберлер ({techs.length})
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-2 bg-red-500/20 text-red-400 text-xs font-bold rounded-xl hover:bg-red-500/30 transition"
            >
              Шығу
            </button>
          </div>
        </div>

        {/* БӨЛІМ 1: ӨТІНІШТЕР (LEADS) */}
        {activeTab === 'leads' && (
          <div className="bg-[#181926] p-6 rounded-3xl border border-slate-800">
            <h2 className="text-lg font-bold text-amber-500 mb-4">Өтініштер</h2>
            {leads.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">Әзірге өтініштер жоқ</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#12131C] text-slate-400 uppercase font-bold">
                    <tr>
                      <th className="p-3 rounded-l-xl">Аты</th>
                      <th className="p-3">Телефон</th>
                      <th className="p-3">Қызмет</th>
                      <th className="p-3">Мекенжай</th>
                      <th className="p-3">Уақыты</th>
                      <th className="p-3 rounded-r-xl">Әрекет</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {leads.map((lead) => (
                      <tr key={lead.id}>
                        <td className="p-3 font-bold">{lead.name || '-'}</td>
                        <td className="p-3 text-amber-400 font-bold">{lead.phone}</td>
                        <td className="p-3">{lead.service || '-'}</td>
                        <td className="p-3">{lead.address || '-'}</td>
                        <td className="p-3 text-slate-400">{new Date(lead.created_at).toLocaleString()}</td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteLead(lead.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition"
                          >
                            Жою
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* БӨЛІМ 2: ШЕБЕРЛЕР (TECHS) */}
        {activeTab === 'techs' && (
          <div className="bg-[#181926] p-6 rounded-3xl border border-slate-800">
            <h2 className="text-lg font-bold text-amber-500 mb-4">Тіркелген Шеберлер</h2>
            {techs.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-8">Әзірге тіркелген шеберлер жоқ</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#12131C] text-slate-400 uppercase font-bold">
                    <tr>
                      <th className="p-3 rounded-l-xl">Шебер Аты</th>
                      <th className="p-3">Телефон</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">ZIP Кодтар</th>
                      <th className="p-3">Статус</th>
                      <th className="p-3 rounded-r-xl">Әрекет</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800 text-slate-200">
                    {techs.map((tech) => (
                      <tr key={tech.id}>
                        <td className="p-3 font-bold">{tech.full_name}</td>
                        <td className="p-3 text-amber-400 font-bold">{tech.phone}</td>
                        <td className="p-3">{tech.email}</td>
                        <td className="p-3 font-mono">{tech.zip_codes}</td>
                        <td className="p-3">
                          <span className="bg-amber-500/20 text-amber-400 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase">
                            {tech.subscription_status || 'pending'}
                          </span>
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteTech(tech.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold hover:bg-red-600 transition"
                          >
                            Жою
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}