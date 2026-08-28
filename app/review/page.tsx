'use client';
import { useState, useEffect, use } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function ClientReviewPage({ searchParams }: { searchParams: Promise<{ order_id?: string }> }) {
  // Next.js 15+ үшін searchParams ашу
  const resolvedSearchParams = use(searchParams);
  const orderId = resolvedSearchParams?.order_id;

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderInfo();
    }
  }, [orderId]);

  const fetchOrderInfo = async () => {
    const { data, error } = await supabase
      .from('requests')
      .select('*')
      .eq('id', orderId)
      .maybeSingle();

    if (data) {
      setOrderData(data);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId) return;

    setLoading(true);
    try {
      const { error } = await supabase.from('reviews').insert([
        {
          order_id: String(orderId),
          tech_id: orderData?.tech_id ? String(orderData.tech_id) : 'unknown',
          rating: Number(rating),
          comment: comment || 'Клиенттің пікірі.'
        }
      ]);

      if (error) {
        console.error('Error saving review:', error);
        alert('Пікірді сақтау кезінде қате шықты.');
      } else {
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#12131C] text-white p-4">
        <div className="bg-[#181926] p-8 rounded-3xl border border-slate-800 text-center max-w-md w-full shadow-2xl">
          <div className="text-5xl mb-4">🎉</div>
          <h1 className="text-2xl font-extrabold text-amber-500 mb-2">Рақмет!</h1>
          <p className="text-slate-300 text-sm">Сіздің пікіріңіз сәтті сақталды. Біздің қызметті пайдаланғаныңызға алғыс айтамыз!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#12131C] text-white p-4">
      <div className="bg-[#181926] p-8 rounded-3xl border border-slate-800 shadow-2xl w-full max-w-md">
        <h1 className="text-xl font-extrabold text-amber-500 mb-2 text-center">Қызмет көрсету сапасын бағалаңыз</h1>
        <p className="text-slate-400 text-xs text-center mb-6">Бұл сізге көрсетілген қызмет бойынша пікір қалдыру парақшасы.</p>

        <form onSubmit={handleSubmitReview} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Рейтинг (Жұлдыз саны):</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-amber-400 font-bold focus:outline-none focus:border-amber-500 text-sm cursor-pointer"
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 - Өте жақсы)</option>
              <option value={4}>⭐⭐⭐⭐ (4 - Жақсы)</option>
              <option value={3}>⭐⭐⭐ (3 - Қанағаттанарлық)</option>
              <option value={2}>⭐⭐ (2 - Нашар)</option>
              <option value={1}>⭐ (1 - Өте нашар)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Сіздің пікіріңіз немесе ұсынысыңыз:</label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Қызмет туралы ойыңызды жазып қалдырыңыз..."
              className="w-full p-3 bg-[#12131C] border border-slate-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl transition text-sm shadow-lg cursor-pointer"
          >
            {loading ? 'Жіберілуде...' : 'Пікірді жіберу'}
          </button>
        </form>
      </div>
    </div>
  );
}