'use client';
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const DICT = {
  en: {
    heroTitle: 'Locked Out?',
    heroSub: 'We Can Help.',
    heroDesc: 'Professional locksmith service for homes, cars, businesses and emergency lockouts.',
    callNow: 'CALL NOW',
    requestService: 'REQUEST SERVICE',
    emergencyTitle: 'Locked Out Right Now?',
    emergencySub: 'Don’t spend time searching.',
    servicesTitle: 'What Do You Need Help With?',
    zipTitle: 'Check Service Availability',
    zipDesc: 'Enter your ZIP code to check if our nearest technician is available right now.',
    zipPlaceholder: 'Enter ZIP code or City...',
    zipCheckBtn: 'CHECK MY AREA',
    zipSuccess: '✅ We cover your area! Average technician arrival time is 15-20 minutes.',
    faqTitle: 'Frequently Asked Questions',
    bottomCall: 'CALL',
    bottomText: 'WHATSAPP',
    bottomRequest: 'REQUEST',
    priceNotice: '⚠️ Note: Final exact price is determined on-site by the technician based on lock complexity.',
    fromPrice: 'From',
    contactModalTitle: 'How to Contact Us?',
    callPhoneBtn: '📞 Call Phone',
    openWaBtn: '💬 Open WhatsApp',
    formModalTitle: 'Request Service',
    serviceLabel: 'Service',
    nameLabel: 'Your Name *',
    namePlaceholder: 'John Doe',
    phoneLabel: 'Phone Number *',
    phonePlaceholder: '(412) 000-0000',
    addressLabel: 'Address / Location *',
    addressPlaceholder: 'Street name or ZIP',
    noteLabel: 'Note (Optional)',
    defaultNotePlaceholder: 'Describe your issue...',
    sendWaBtn: '💬 SEND TO WHATSAPP',
    generalRequest: 'General Request',
    mobileRequest: 'Mobile Request',
    placeholders: {
      '1': 'Example: Key snapped inside the lock, door is locked...',
      '2': 'Example: Toyota Camry 2018, all keys lost...',
      '3': 'Example: Need to replace or repair house lock...',
      '4': 'Example: Install high-security or code lock for office...',
      '5': 'Example: Need duplicate or spare key made...',
      '6': 'Example: Lock mechanism is jammed or damaged...'
    },
    services: [
      { id: '1', title: 'Emergency Lockout', icon: '🚨', desc: 'Fast arrival for home, car or office lockouts.', defaultPrice: '$29' },
      { id: '2', title: 'Car Locksmith', icon: '🚗', desc: 'Key cutting & transponder programming on site.', defaultPrice: '$49' },
      { id: '3', title: 'Residential Locksmith', icon: '🏠', desc: 'House lock replacement & repair services.', defaultPrice: '$35' },
      { id: '4', title: 'Commercial Locksmith', icon: '🏢', desc: 'High-security locks for businesses & offices.', defaultPrice: '$55' },
      { id: '5', title: 'Key Replacement', icon: '🔑', desc: 'Duplicate or replacement keys made quickly.', defaultPrice: '$25' },
      { id: '6', title: 'Lock Repair', icon: '🔨', desc: 'Fix damaged or jammed locks easily.', defaultPrice: '$30' },
    ],
    faqs: [
      { q: 'How fast can a locksmith arrive?', a: 'Our average arrival time is 15 to 30 minutes depending on your location and current traffic.' },
      { q: 'Do you provide 24/7 emergency service?', a: 'Yes! We are available 24 hours a day, 7 days a week for all emergency lockout situations.' },
      { q: 'Can you unlock high-security car locks?', a: 'Absolutely. Our technicians are equipped with modern tools to handle almost all car models.' }
    ]
  },
  ru: {
    heroTitle: 'Не можете попасть внутрь?',
    heroSub: 'Мы поможем.',
    heroDesc: 'Профессиональные услуги слесаря по замкам для домов, автомобилей, бизнеса и экстренных случаев.',
    callNow: 'ПОЗВОНИТЬ СЕЙЧАС',
    requestService: 'ЗАКАЗАТЬ УСЛУГУ',
    emergencyTitle: 'Вы сейчас не можете попасть внутрь?',
    emergencySub: 'Не тратьте время на поиски.',
    servicesTitle: 'Какая помощь вам нужна?',
    zipTitle: 'Проверить доступность услуги',
    zipDesc: 'Введите ваш ZIP-код, чтобы проверить, доступен ли наш ближайший мастер прямо сейчас.',
    zipPlaceholder: 'Введите ZIP-код или город...',
    zipCheckBtn: 'ПРОВЕРИТЬ РАЙОН',
    zipSuccess: '✅ Мы обслуживаем ваш район! Среднее время прибытия мастера 15-20 минут.',
    faqTitle: 'Часто задаваемые вопросы',
    bottomCall: 'ПОЗВОНИТЬ',
    bottomText: 'WHATSAPP',
    bottomRequest: 'ЗАКАЗАТЬ',
    priceNotice: '⚠️ Примечание: Точная стоимость определяется мастером на месте в зависимости от сложности замка.',
    fromPrice: 'От',
    contactModalTitle: 'Как с нами связаться?',
    callPhoneBtn: '📞 Позвонить по телефону',
    openWaBtn: '💬 Открыть WhatsApp',
    formModalTitle: 'Оформить заявку',
    serviceLabel: 'Услуга',
    nameLabel: 'Ваше имя *',
    namePlaceholder: 'Иван Иванов',
    phoneLabel: 'Номер телефона *',
    phonePlaceholder: '(412) 000-0000',
    addressLabel: 'Адрес / Локация *',
    addressPlaceholder: 'Улица или ZIP-код',
    noteLabel: 'Примечание (необязательно)',
    defaultNotePlaceholder: 'Опишите вашу проблему...',
    sendWaBtn: '💬 ОТПРАВИТЬ В WHATSAPP',
    generalRequest: 'Общий запрос',
    mobileRequest: 'Мобильный запрос',
    placeholders: {
      '1': 'Пример: Ключ сломался внутри замка, дверь заперта...',
      '2': 'Пример: Toyota Camry 2018, утеряны все ключи...',
      '3': 'Пример: Замена или ремонт замка в квартире...',
      '4': 'Пример: Установка кодового или кодового замка в офис...',
      '5': 'Пример: Нужен дубликат или изготовление нового ключа...',
      '6': 'Пример: Заклинило механизм или поврежден замок...'
    },
    services: [
      { id: '1', title: 'Экстренное вскрытие', icon: '🚨', desc: 'Быстрый выезд для вскрытия домов, авто и офисов.', defaultPrice: '$29' },
      { id: '2', title: 'Автослесарь', icon: '🚗', desc: 'Изготовление ключей и прошивка чипов на месте.', defaultPrice: '$49' },
      { id: '3', title: 'Замки для дома', icon: '🏠', desc: 'Замена и ремонт дверных замков в квартирах и домах.', defaultPrice: '$35' },
      { id: '4', title: 'Замки для бизнеса', icon: '🏢', desc: 'Установка замков высокой надежности для офисов.', defaultPrice: '$55' },
      { id: '5', title: 'Замена ключей', icon: '🔑', desc: 'Быстрое изготовление дубликатов и новых ключей.', defaultPrice: '$25' },
      { id: '6', title: 'Ремонт замков', icon: '🔨', desc: 'Легкое устранение поломок и заклинивших замков.', defaultPrice: '$30' },
    ],
    faqs: [
      { q: 'Как быстро приезжает мастер?', a: 'Среднее время прибытия составляет от 15 до 30 минут в зависимости от вашего местоположения и пробок.' },
      { q: 'Вы работаете круглосуточно 24/7?', a: 'Да! Мы работаем 24 часа в сутки, 7 дней в неделю без выходных для экстренных вызовов.' },
      { q: 'Можете ли вы открыть современные автомобили?', a: 'Конечно. Наши мастера оснащены современным оборудованием для работы с любыми марками машин.' }
    ]
  },
  kk: {
    heroTitle: 'Есікті аша алмай тұрсыз ба?',
    heroSub: 'Біз көмектесеміз.',
    heroDesc: 'Үйге, көлікке, бизнеске арналған кәсіби құлып және кілт қызметтері.',
    callNow: 'ҚАЗІР ҚОҢЫРАУ ШАЛУ',
    requestService: 'ҚЫЗМЕТКЕ ТАПСЫРЫС БЕРУ',
    emergencyTitle: 'Дәл қазір есікті аша алмай тұрсыз ба?',
    emergencySub: 'Уақытыңызды іздеуге жұмсамаңыз.',
    servicesTitle: 'Сізге қандай көмек керек?',
    zipTitle: 'Қызметтің қолжетімділігін тексеру',
    zipDesc: 'Жақын маңдағы шебердің бос екенін тексеру үшін ZIP-кодты енгізіңіз.',
    zipPlaceholder: 'ZIP-код немесе қаланы енгізіңіз...',
    zipCheckBtn: 'АЙМАҚТЫ ТЕКСЕРУ',
    zipSuccess: '✅ Бұл аймаққа қызмет көрсетеміз! Шебердің орташа келу уақыты 15-20 минут.',
    faqTitle: 'Жиі қойылатын сұрақтар',
    bottomCall: 'ҚОҢЫРАУ',
    bottomText: 'WHATSAPP',
    bottomRequest: 'ТАПСЫРЫС',
    priceNotice: '⚠️ Ескерту: Нақты сомасы құлыптың күрделілігіне байланысты шебер келген соң анықталады.',
    fromPrice: 'Бастапқы бағасы',
    contactModalTitle: 'Байланысу тәсілін таңдаңыз',
    callPhoneBtn: '📞 Телефонмен қоңырау шалу',
    openWaBtn: '💬 WhatsApp-ты ашу',
    formModalTitle: 'Тапсырыс беру',
    serviceLabel: 'Қызмет түрі',
    nameLabel: 'Сіздің атыңыз *',
    namePlaceholder: 'Асан Әлиев',
    phoneLabel: 'Телефон нөміріңіз *',
    phonePlaceholder: '(412) 000-0000',
    addressLabel: 'Мекенжайыңыз / Аймақ *',
    addressPlaceholder: 'Көше аты немесе ZIP-код',
    noteLabel: 'Қосымша ақпарат (міндетті емес)',
    defaultNotePlaceholder: 'Мәселеңізді сипаттаңыз...',
    sendWaBtn: '💬 WHATSAPP-ҚА ЖІБЕРУ',
    generalRequest: 'Жалпы тапсырыс',
    mobileRequest: 'Мобильді тапсырыс',
    placeholders: {
      '1': 'Мысалы: Кілт ішінде сынып қалды, есік құлыптаулы...',
      '2': 'Мысалы: Toyota Camry 2018, барлық кілті жоғалды...',
      '3': 'Мысалы: Пәтер есігінің замгын ауыстыру керек...',
      '4': 'Мысалы: Офис есігіне кодовый замок орнату...',
      '5': 'Мысалы: Кілттің дубликатын немесе жаңасын жасау...',
      '6': 'Мысалы: Құлып механизімі кептеліп қалды...'
    },
    services: [
      { id: '1', title: 'Шұғыл есік ашу', icon: '🚨', desc: 'Үй, көлік немесе офис есігін жедел ашу қызметі.', defaultPrice: '$29' },
      { id: '2', title: 'Көлік кілттері', icon: '🚗', desc: 'Кілт жасау және чиптерді орнында бағдарламалау.', defaultPrice: '$49' },
      { id: '3', title: 'Үйге арналған құлыптар', icon: '🏠', desc: 'Үй мен пәтер құлыптарын ауыстыру және жөндеу.', defaultPrice: '$35' },
      { id: '4', title: 'Бизнеске арналған құлыптар', icon: '🏢', desc: 'Офистер мен нысандарға жоғары қорғанысты құлыптар.', defaultPrice: '$55' },
      { id: '5', title: 'Кілттерді ауыстыру', icon: '🔑', desc: 'Кілттердің көшірмесін немесе жаңасын жылдам жасау.', defaultPrice: '$25' },
      { id: '6', title: 'Құлыпты жөндеу', icon: '🔨', desc: 'Бұзылған немесе кептеліп қалған құлыптарды жөндеу.', defaultPrice: '$30' },
    ],
    faqs: [
      { q: 'Шебер қаншалықты тез жетеді?', a: 'Сіздің орналасқан жеріңізге байланысты орташа келу уақыты 15-тен 30 минутқа дейін.' },
      { q: '24/7 шұғыл қызмет көрсетесіздер ме?', a: 'Иә! Біз аптасына 7 күн, 24 сағат бойы демалыссыз жұмыс істейміз.' },
      { q: 'Заманауи көлік құлыптарын аша аласыздар ма?', a: 'Әрине. Біздің шеберлерде барлық көлік маркаларына арналған арнайы заманауи құралдар бар.' }
    ]
  },
};

export default function Home() {
  const [lang, setLang] = useState('en');
  const [phone, setPhone] = useState('+19173496532');
  const [emergencyEnabled, setEmergencyEnabled] = useState(true);
  const [customPrices, setCustomPrices] = useState<Record<string, string>>({});
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{ id: string; title: string } | null>(null);
  
  const [zipInput, setZipInput] = useState('');
  const [zipResult, setZipResult] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: '', phone: '', address: '', note: '' });

  useEffect(() => {
    async function loadData() {
      const savedPhone = localStorage.getItem('site_phone');
      const savedEmergency = localStorage.getItem('site_emergency');
      const savedPrices = JSON.parse(localStorage.getItem('site_prices') || '{}');
      
      if (savedPhone) setPhone(savedPhone);
      if (savedEmergency !== null) setEmergencyEnabled(savedEmergency === 'true');
      setCustomPrices(savedPrices);

      try {
        const { data: settings } = await supabase.from('settings').select('*').maybeSingle();
        if (settings) {
          if (settings.phone) setPhone(settings.phone);
          if (settings.emergency_enabled !== undefined) setEmergencyEnabled(settings.emergency_enabled);
        }

        const { data: services } = await supabase.from('services').select('*');
        if (services && services.length > 0) {
          const priceMap: Record<string, string> = {};
          services.forEach((s) => { priceMap[String(s.id)] = String(s.price); });
          setCustomPrices(priceMap);
        }
      } catch (err) {
        console.error('Supabase fetch error, using local fallback:', err);
      }
    }

    loadData();
  }, []);

  const t = DICT[lang as keyof typeof DICT] || DICT.en;
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const getDynamicPlaceholder = () => {
    if (selectedService && selectedService.id && t.placeholders[selectedService.id as keyof typeof t.placeholders]) {
      return t.placeholders[selectedService.id as keyof typeof t.placeholders];
    }
    return t.defaultNotePlaceholder;
  };

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!zipInput.trim()) return;
    setZipResult(t.zipSuccess);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const serviceTitle = selectedService ? selectedService.title : t.generalRequest;

    const newRequest = {
      id: Date.now(),
      service: serviceTitle,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      note: formData.note,
      date: new Date().toLocaleString(),
    };

    const existingRequests = JSON.parse(localStorage.getItem('site_requests') || '[]');
    localStorage.setItem('site_requests', JSON.stringify([newRequest, ...existingRequests]));

    try {
      await supabase.from('orders').insert([
        {
          service: newRequest.service,
          name: newRequest.name,
          phone: newRequest.phone,
          address: newRequest.address,
          note: newRequest.note,
        }
      ]);
    } catch (err) {
      console.error('Supabase order insert error:', err);
    }

    const message = `🚨 *NEW SERVICE REQUEST*%0A%0A🔑 *Service:* ${newRequest.service}%0A👤 *Name:* ${newRequest.name}%0A📞 *Phone:* ${newRequest.phone}%0A📍 *Address:* ${newRequest.address}%0A📝 *Note:* ${newRequest.note || 'None'}`;
    
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');

    setIsModalOpen(false);
    setFormData({ name: '', phone: '', address: '', note: '' });
  };

  return (
    <div className="bg-[#12131C] text-white min-h-screen pb-20 md:pb-0 font-sans">
      
      {/* HEADER */}
      <header className="bg-[#181926]/80 backdrop-blur border-b border-slate-800/80 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-extrabold text-lg md:text-xl tracking-wider text-amber-500">
            PITTSBURGH LOCKSMITH
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-[#1E202E] border border-slate-700/50 rounded-lg px-2 py-1 flex items-center gap-1 text-sm text-slate-300">
              <span>🌐</span>
              <select
                value={lang}
                onChange={(e) => { setLang(e.target.value); setZipResult(null); }}
                className="bg-transparent text-white font-medium focus:outline-none cursor-pointer"
              >
                <option value="en" className="bg-[#1E202E]">EN</option>
                <option value="ru" className="bg-[#1E202E]">RU</option>
                <option value="kk" className="bg-[#1E202E]">ҚАЗ</option>
              </select>
            </div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="hidden md:inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black px-5 py-2 rounded-xl text-sm shadow-lg shadow-orange-500/20 hover:opacity-90 transition"
            >
              {t.callNow}
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-16 pb-12 px-4 text-center max-w-4xl mx-auto space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          {t.heroTitle}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 mt-2">
            {t.heroSub}
          </span>
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto font-normal">{t.heroDesc}</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 max-w-md mx-auto">
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-black font-black py-4 px-8 rounded-2xl text-base shadow-xl shadow-orange-500/20 hover:scale-[1.02] transition transform"
          >
            {t.callNow}
          </button>
          <button
            onClick={() => { setSelectedService({ id: '0', title: t.generalRequest }); setIsModalOpen(true); }}
            className="bg-[#1E202E] border border-slate-700/60 text-slate-200 font-bold py-4 px-8 rounded-2xl text-base hover:bg-slate-800 transition"
          >
            {t.requestService}
          </button>
        </div>
      </section>

      {/* EMERGENCY CTA */}
      {emergencyEnabled && (
        <section className="px-4 max-w-5xl mx-auto my-6">
          <div className="bg-gradient-to-r from-red-600 to-rose-600 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl shadow-red-900/30">
            <div className="space-y-1 text-center sm:text-left">
              <h2 className="text-xl font-black text-white">{t.emergencyTitle}</h2>
              <p className="text-red-100 text-sm">{t.emergencySub}</p>
            </div>
            <button
              onClick={() => setIsContactModalOpen(true)}
              className="bg-white text-red-600 font-black px-8 py-3.5 rounded-2xl text-sm shadow-md hover:bg-slate-100 transition whitespace-nowrap flex items-center gap-2"
            >
              <span>🚨</span> {t.callNow}
            </button>
          </div>
        </section>
      )}

      {/* SERVICES GRID WITH PRICES */}
      <section className="max-w-5xl mx-auto py-12 px-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-2 text-white">
          {t.servicesTitle}
        </h2>
        
        <p className="text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl text-center max-w-2xl mx-auto mb-8 font-medium">
          {t.priceNotice}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {t.services.map((srv) => {
            const currentPrice = customPrices[srv.id] ? `$${customPrices[srv.id]}` : srv.defaultPrice;
            return (
              <div
                key={srv.id}
                className="bg-[#1E202E] border border-slate-700/50 p-6 rounded-3xl shadow-lg hover:border-amber-500/50 transition flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-4xl">{srv.icon}</span>
                    <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 px-3 py-1 rounded-full text-xs font-black">
                      {t.fromPrice} {currentPrice}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-amber-400">{srv.title}</h3>
                  <p className="text-slate-400 text-sm">{srv.desc}</p>
                </div>
                <button
                  onClick={() => { setSelectedService({ id: srv.id, title: srv.title }); setIsModalOpen(true); }}
                  className="w-full bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-200 font-bold py-3 rounded-xl transition text-sm"
                >
                  {t.requestService}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* ZIP CODE CHECKER */}
      <section className="max-w-3xl mx-auto my-12 px-4">
        <div className="bg-[#1E202E] border border-slate-700/60 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xl">
          <h3 className="text-2xl font-bold text-white">{t.zipTitle}</h3>
          <p className="text-slate-400 text-sm">{t.zipDesc}</p>
          <form onSubmit={handleZipCheck} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto pt-2">
            <input
              type="text"
              placeholder={t.zipPlaceholder}
              value={zipInput}
              onChange={(e) => setZipInput(e.target.value)}
              className="flex-1 bg-[#12131C] border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-amber-500 text-sm"
            />
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3 rounded-xl transition text-sm whitespace-nowrap"
            >
              {t.zipCheckBtn}
            </button>
          </form>
          {zipResult && (
            <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm font-semibold">
              {zipResult}
            </div>
          )}
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="max-w-4xl mx-auto py-12 px-4 space-y-6">
        <h2 className="text-3xl font-extrabold text-center text-white mb-8">{t.faqTitle}</h2>
        <div className="space-y-4">
          {t.faqs.map((faq, idx) => (
            <div key={idx} className="bg-[#1E202E] border border-slate-700/50 p-6 rounded-2xl">
              <h4 className="font-bold text-lg text-amber-400 mb-2">{faq.q}</h4>
              <p className="text-slate-300 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500">
        <p>© {new Date().getFullYear()} PITTSBURGH LOCKSMITH. All rights reserved.</p>
      </footer>

      {/* MOBILE FIXED BOTTOM BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#181926]/90 backdrop-blur border-t border-slate-800 p-2 flex justify-between items-center z-50 md:hidden shadow-2xl">
        <a
          href={`tel:${phone}`}
          className="flex-1 bg-green-600 text-white py-3 mx-1 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition"
        >
          📞 {t.bottomCall}
        </a>
        <a
          href={`https://wa.me/${cleanPhone}`}
          target="_blank"
          className="flex-1 bg-emerald-600 text-white py-3 mx-1 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1 active:scale-95 transition"
        >
          💬 {t.bottomText}
        </a>
        <button
          onClick={() => { setSelectedService({ id: '0', title: t.mobileRequest }); setIsModalOpen(true); }}
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 py-3 mx-1 rounded-xl text-center font-black text-xs flex items-center justify-center gap-1 active:scale-95 transition"
        >
          🔑 {t.bottomRequest}
        </button>
      </div>

      {/* CONTACT MODAL */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E202E] border border-slate-700 w-full max-w-sm rounded-3xl p-6 text-white text-center space-y-4 shadow-2xl relative">
            <button onClick={() => setIsContactModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold">✕</button>
            <h3 className="text-xl font-extrabold text-amber-500">{t.contactModalTitle}</h3>
            <p className="text-slate-300 text-sm font-semibold">{phone}</p>
            <div className="space-y-3 pt-2">
              <a href={`tel:${phone}`} className="w-full bg-green-600 hover:bg-green-500 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition">{t.callPhoneBtn}</a>
              <a href={`https://wa.me/${cleanPhone}`} target="_blank" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition">{t.openWaBtn}</a>
            </div>
          </div>
        </div>
      )}

      {/* REQUEST FORM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#1E202E] border border-slate-700 w-full max-w-md rounded-3xl p-6 text-white space-y-4 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg font-bold">✕</button>
            <h3 className="text-2xl font-extrabold text-amber-500">{t.formModalTitle}</h3>
            {selectedService && (
              <p className="text-xs bg-amber-500/10 text-amber-400 border border-amber-500/30 p-2 rounded-lg font-semibold">
                {t.serviceLabel}: {selectedService.title}
              </p>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400">{t.nameLabel}</label>
                <input required type="text" placeholder={t.namePlaceholder} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">{t.phoneLabel}</label>
                <input required type="tel" placeholder={t.phonePlaceholder} value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">{t.addressLabel}</label>
                <input required type="text" placeholder={t.addressPlaceholder} value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 mt-1" />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400">{t.noteLabel}</label>
                <textarea rows={2} placeholder={getDynamicPlaceholder()} value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} className="w-full bg-[#12131C] border border-slate-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-500 mt-1" />
              </div>
              <button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black py-3.5 rounded-xl text-base shadow-lg hover:opacity-90 transition pt-2 flex items-center justify-center gap-2">
                {t.sendWaBtn}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}