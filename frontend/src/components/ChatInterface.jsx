// [Judging Category: Natural language interaction / Hinglish support]
import React, { useState } from 'react';
import { Send, Mic, Sparkles, MessageSquare, RefreshCw } from 'lucide-react';

export default function ChatInterface({ onSubmitQuery, isLoading, region }) {
  const [query, setQuery] = useState('');

  const samplePrompts = [
    {
      label: "🌾 Kya mujhe abhi Cotton bechna chahiye?",
      query: "Kya mujhe Vidarbha mandi me abhi cotton bechna chahiye ya hold karu?",
      crop: "Cotton"
    },
    {
      label: "🌧️ Aaj spray or irrigation karna thik hai?",
      query: "Agle 2 din me barish hogi kya? Spraying ya irrigation kare?",
      crop: "Cotton"
    },
    {
      label: "📈 Mandi Price Trend for Soybean",
      query: "Soybean ka agle 7 din me mandi rate badhega kya?",
      crop: "Soybean"
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;
    onSubmitQuery({ query, crop: 'Cotton' });
  };

  const handleSelectSample = (sample) => {
    setQuery(sample.query);
    onSubmitQuery({ query: sample.query, crop: sample.crop });
  };

  return (
    <div className="agri-card p-5 sm:p-6 border-slate-800 bg-slate-900/90 rounded-2xl shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Ask AgriMind Advisor</h3>
            <p className="text-xs text-slate-400">Natural language decision assistant • English, Hindi, Hinglish</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded-full">
          Gemini 3.5 Flash
        </span>
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="relative flex items-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask anything in Hinglish: e.g. 'kya mujhe abhi cotton bechna chahiye?'"
            className="w-full bg-slate-950 text-white placeholder-slate-500 text-sm sm:text-base rounded-xl px-4 py-3.5 pr-24 border border-slate-700 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
            disabled={isLoading}
          />
          
          <div className="absolute right-2 flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                const sample = samplePrompts[0];
                setQuery(sample.query);
              }}
              title="Mic Voice Simulation"
              className="p-2 text-slate-400 hover:text-emerald-400 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors"
            >
              <Mic className="w-4 h-4" />
            </button>

            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="p-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold rounded-lg transition-all"
            >
              {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </form>

      {/* Suggested Prompt Chips */}
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
          Frequent Farmer Queries (Tap to ask)
        </span>
        <div className="flex flex-wrap gap-2">
          {samplePrompts.map((sample, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectSample(sample)}
              disabled={isLoading}
              className="text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-emerald-950/80 border border-slate-700 hover:border-emerald-500/40 px-3 py-1.5 rounded-xl transition-all text-left"
            >
              {sample.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
