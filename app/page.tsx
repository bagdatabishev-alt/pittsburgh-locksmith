'use client';

import { useState } from 'react';

export default function Home() {
  const [lang, setLang] = useState<'KAZ' | 'RUS' | 'ENG'>('ENG');
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const t = {
    ENG: {
      title1: "Locked Out?",
      title2: "We Can Help.",
      subtitle: "Professional locksmith service for homes, cars, businesses and emergency lockouts.",
      callNow: "CALL NOW",
      reqService: "REQUEST SERVICE",
      bannerTitle: "Locked Out Right Now?",
      bannerDesc: "Don't spend time searching. Call us immediately for rapid dispatch.",
      whatNeeded: "What Do You Need Help With?",
      note: "Note: Final exact price is determined on-site by the technician based on lock complexity.",
      formTitle: "Fill out details to request service",
      formSub: "We will dispatch a technician immediately.",
      yourName: "Your Name *",
      phoneNum: "Phone Number *",
      addressLoc: "Address / Location *",
      sendBtn: "Send Request to Telegram",
      sending: "Sending Request...",
      services: [
        { title: 'Emergency Lockout', desc: 'Fast arrival for home, car or office lockouts.', price: 'From $45' },
        { title: 'Car Locksmith', desc: 'Key cutting & transponder programming on site.', price: 'From $49' },
        { title: 'Residential Locksmith', desc: 'House lock replacement & repair services.', price: 'From $35' },
        { title: 'Commercial Locksmith', desc: 'High-security locks for businesses & offices.', price: 'From $55' },
        { title: 'Key Replacement', desc: 'Duplicate or replacement keys made quickly.', price: 'From $25' },
        { title: 'Lock Repair', desc: 'Fix damaged or jammed locks easily.', price: 'From $30' }
      ]
    },
    RUS: {
      title1: "Захлопнули дверь?",
      title2: "Мы поможем.",
      subtitle: "Профессиональные услуги слесаря для домов, автомобилей, бизнеса и экстренных ситуаций.",
      callNow: "ПОЗВОНИТЬ",
      reqService: "ЗАКАЗАТЬ УСЛУГУ",
      bannerTitle: "Застряли прямо сейчас?",
      bannerDesc: "Не тратьте время на поиски. Позвоните нам для срочного выезда.",
      whatNeeded: "Какая помощь вам нужна?",
      note: "Примечание: Точная цена определяется мастером на месте в зависимости от сложности.",
      formTitle: "Заполните данные для заказа",
      formSub: "Мы отправим мастера немедленно.",
      yourName: "Ваше Имя *",
      phoneNum: "Номер Телефона *",
      addressLoc: "Адрес / Местоположение *",
      sendBtn: "Отправить запрос в Telegram",
      sending: "Отправка...",
      services: [
        { title: 'Emergency Lockout', desc: 'Быстрый выезд при блокировке дома, авто или офиса.', price: 'От $45' },
        { title: 'Car Locksmith', desc: 'Нарезка ключей и программирование на месте.', price: 'От $49' },
        { title: 'Residential Locksmith', desc: 'Замена и ремонт дверных замков в доме.', price: 'От $35' },
        { title: 'Commercial Locksmith', desc: 'Замки повышенной безопасности для бизнеса.', price: 'От $55' },
        { title: 'Key Replacement', desc: 'Дубликаты или замена ключей.', price: 'От $25' },
        { title: 'Lock Repair', desc: 'Ремонт поврежденных или заклинивших замков.', price: 'От $30' }
      ]
    },
    KAZ: {
      title1: "Құлыптаулы ма?",
      title2: "Біз көмектесеміз.",
      subtitle: "Үйлерге, көліктерге, бизнеске және шұғал жағдайларға арналған кәсіби ұста қызметі.",
      callNow: "ҚОҢЫРАУ ШАЛУ",
      reqService: "ҚЫЗМЕТ СҰРАУ",
      bannerTitle: "Қазір далада қалдыңыз ба?",
      bannerDesc: "Уақыт жоғалтпаңыз. Жедел көмек үшін бізге бірден қоңырау шалыңыз.",
      whatNeeded: "Сізге қандай көмек керек?",
      note: "Ескерту: Нақты бағаны мастер келген соң құлыптың күрделілігіне қарай анықтайды.",
      formTitle: "Тапсырыс беру үшін мәліметтерді толтырыңыз",
      formSub: "Біз бірден маэстерді жібереміз.",
      yourName: "Аты-жөніңіз *",
      phoneNum: "Телефон нөмірі *",
      addressLoc: "Мекенжайыңыз *",
      sendBtn: "Telegram-ға жіберу",
      sending: "Жіберілуде...",
      services: [
        { title: 'Emergency Lockout', desc: 'Үй, көлік немесе офис есіктерін ашуға шұғыл келу.', price: '$45 бастап' },
        { title: 'Car Locksmith', desc: 'Көлік кілтін жасау және бағдарламалау.', price: '$49 бастап' },
        { title: 'Residential Locksmith', desc: 'Үй құлыптарын ауыстыру және жөндеу.', price: '$35 бастап' },
        { title: 'Commercial Locksmith', desc: 'Бизнес пен кеңселерге арналған қауіпсіздік құлыптары.', price: '$55 бастап' },
        { title: 'Key Replacement', desc: 'Кілттердің көшірмесін жасау.', price: '$25 бастап' },
        { title: 'Lock Repair', desc: 'Сынған немесе істемейтін құлыптарды жөндеу.', price: '$30 бастап' }
      ]
    }
  };

  const currentT = t[lang];

  const handleRequestService = (serviceName: string) => {
    setSelectedService(serviceName);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      setStatus('⚠️ Please select a service first.');
      return;
    }

    setLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'NEW_ORDER',
          data: { name, phone, service: selectedService, address }
        })
      });

      if (res.ok) {
        setStatus('✅ Successfully sent!');
        setName('');
        setPhone('');
        setAddress('');
        setSelectedService(null);
      } else {
        setStatus('❌ Failed to send.');
      }
    } catch (err) {
      setStatus('❌ Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500 selection:text-black">
      {/* Language Switcher Bar */}
      <div className="flex justify-center pt-4 gap-2">
        {(['KAZ', 'RUS', 'ENG'] as const).map((l) => (
          <button
            key={l}
            onClick={() => setLang(l)}
            className={`px-3 py-1 rounded text-xs font-bold transition ${
              lang === l ? 'bg-amber-500 text-black' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      {/* Hero Section */}
      <section className="py-10 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2">
          {currentT.title1} <span className="text-amber-500">{currentT.title2}</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
          {currentT.subtitle}
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="tel:+19173496532"
            className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition"
          >
            {currentT.callNow}
          </a>
          <a
            href="#services"
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl border border-slate-700 transition"
          >
            {currentT.reqService}
          </a>
        </div>

        {/* Urgent Red Banner */}
        <div className="bg-red-600/90 border border-red-500 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between shadow-xl gap-4">
          <div className="text-left">
            <h3 className="font-black text-lg">{currentT.bannerTitle}</h3>
            <p className="text-xs text-red-100">{currentT.bannerDesc}</p>
          </div>
          <a
            href="tel:+19173496532"
            className="bg-white hover:bg-slate-100 text-red-600 font-extrabold px-6 py-2.5 rounded-xl text-sm shadow transition shrink-0"
          >
            📞 {currentT.callNow}
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">{currentT.whatNeeded}</h2>
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-semibold">
            ⚠️ {currentT.note}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentT.services.map((s, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-amber-500/50 transition">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg">{s.title}</h3>
                  <span className="bg-amber-500/10 text-amber-400 text-xs font-bold px-2.5 py-1 rounded-lg border border-amber-500/20">
                    {s.price}
                  </span>
                </div>
                <p className="text-slate-400 text-xs mb-6">{s.desc}</p>
              </div>
              <button
                onClick={() => handleRequestService(s.title)}
                className="w-full bg-slate-800 hover:bg-amber-500 hover:text-black font-bold text-xs py-2.5 rounded-xl border border-slate-700 transition"
              >
                {currentT.reqService}
              </button>
            </div>
          ))}
        </div>

        {/* Request Form Section */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-2xl">
          <h3 className="text-xl font-black text-amber-500 mb-1 text-center">
            {selectedService ? `Selected: ${selectedService}` : currentT.formTitle}
          </h3>
          <p className="text-xs text-slate-400 text-center mb-6">{currentT.formSub}</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">{currentT.yourName}</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">{currentT.phoneNum}</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-amber-500"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">{currentT.addressLoc}</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="123 Main St, Pittsburgh"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-amber-500 hover:bg-amber-600 text-black font-extrabold py-3.5 rounded-xl transition shadow-lg"
            >
              {loading ? currentT.sending : currentT.sendBtn}
            </button>
          </form>

          {status && <p className="mt-4 text-center text-sm font-bold">{status}</p>}
        </div>
      </section>
    </main>
  );
}