'use client';

import { useState } from 'react';

export default function Home() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const handleRequestService = (serviceName: string) => {
    setSelectedService(serviceName);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService) {
      setStatus('⚠️ Please select a service first by clicking "Request Service" on any card.');
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
          data: {
            name,
            phone,
            service: selectedService,
            address
          }
        })
      });

      if (res.ok) {
        setStatus('✅ Request sent successfully! We will contact you shortly.');
        setName('');
        setPhone('');
        setAddress('');
        setSelectedService(null);
      } else {
        setStatus('❌ Failed to send request. Please try again.');
      }
    } catch (err) {
      setStatus('❌ Connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white font-sans selection:bg-amber-500 selection:text-black">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2">
          Locked Out? <span className="text-amber-500">We Can Help.</span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base mb-8 max-w-xl mx-auto">
          Professional locksmith service for homes, cars, businesses and emergency lockouts.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <a
            href="tel:+19173496532"
            className="bg-amber-500 hover:bg-amber-600 text-black font-extrabold px-8 py-3.5 rounded-xl shadow-lg transition"
          >
            CALL NOW
          </a>
          <a
            href="#services"
            className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-3.5 rounded-xl border border-slate-700 transition"
          >
            REQUEST SERVICE
          </a>
        </div>

        {/* Urgent Red Banner */}
        <div className="bg-red-600/90 border border-red-500 rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between shadow-xl gap-4">
          <div className="text-left">
            <h3 className="font-black text-lg">Locked Out Right Now?</h3>
            <p className="text-xs text-red-100">Don't spend time searching. Call us immediately for rapid dispatch.</p>
          </div>
          <a
            href="tel:+19173496532"
            className="bg-white hover:bg-slate-100 text-red-600 font-extrabold px-6 py-2.5 rounded-xl text-sm shadow transition shrink-0"
          >
            📞 CALL NOW
          </a>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="max-w-5xl mx-auto px-4 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-2">What Do You Need Help With?</h2>
          <div className="inline-block bg-amber-500/10 border border-amber-500/30 px-4 py-1.5 rounded-full text-amber-400 text-xs font-semibold">
            ⚠️ Note: Final exact price is determined on-site by the technician based on lock complexity.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Emergency Lockout', desc: 'Fast arrival for home, car or office lockouts.', price: 'From $45' },
            { title: 'Car Locksmith', desc: 'Key cutting & transponder programming on site.', price: 'From $49' },
            { title: 'Residential Locksmith', desc: 'House lock replacement & repair services.', price: 'From $35' },
            { title: 'Commercial Locksmith', desc: 'High-security locks for businesses & offices.', price: 'From $55' },
            { title: 'Key Replacement', desc: 'Duplicate or replacement keys made quickly.', price: 'From $25' },
            { title: 'Lock Repair', desc: 'Fix damaged or jammed locks easily.', price: 'From $30' }
          ].map((s, idx) => (
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
                REQUEST SERVICE
              </button>
            </div>
          ))}
        </div>

        {/* Request Form Section */}
        <div className="mt-12 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 max-w-xl mx-auto shadow-2xl">
          <h3 className="text-xl font-black text-amber-500 mb-1 text-center">
            {selectedService ? `Selected: ${selectedService}` : 'Fill out details to request service'}
          </h3>
          <p className="text-xs text-slate-400 text-center mb-6">We will dispatch a technician immediately.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Your Name *</label>
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
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Phone Number *</label>
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
              <label className="text-xs font-bold uppercase text-slate-400 block mb-1">Address / Location *</label>
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
              {loading ? 'Sending Request...' : 'Send Request to Telegram'}
            </button>
          </form>

          {status && <p className="mt-4 text-center text-sm font-bold">{status}</p>}
        </div>
      </section>
    </main>
  );
}