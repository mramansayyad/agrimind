// [Judging Category: Architecture & technical execution / Pitch Presentation]
import React from 'react';
import { Database, Cpu, ShieldCheck, Zap, ArrowRight, Layers } from 'lucide-react';

export default function ArchitectureDiagram() {
  const layers = [
    {
      step: "01",
      title: "Multi-Source Ingestion",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      desc: "Live Open-Meteo Weather + 30d Seeded Mandi Prices + Soil Datasets + Voice/Text Query"
    },
    {
      step: "02",
      title: "Cloud Run API Proxy",
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      desc: "RAG Context Enrichment (Retrieval before generation — eliminates price hallucination)"
    },
    {
      step: "03",
      title: "Gemini 3.5 AI Engine",
      icon: <Cpu className="w-5 h-5 text-purple-400" />,
      desc: "Gemini 3.5 Flash (Hinglish Reasoning) + Gemini Vision (Multimodal Crop Disease Diagnosis)"
    },
    {
      step: "04",
      title: "Decision & Action Layer",
      icon: <ShieldCheck className="w-5 h-5 text-emerald-400" />,
      desc: "7-Day MA Anomaly Detector + Single Recommendation Card + Proactive Alert Engine"
    }
  ];

  return (
    <div className="agri-card p-5 sm:p-6 border-slate-800 bg-slate-900/90 rounded-2xl shadow-xl">
      
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">AgriMind Technical Architecture</h3>
            <p className="text-xs text-slate-400">Data Pipeline • Gemini AI Reasoning • Decision Support • Action Layer</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 bg-emerald-950 text-emerald-300 border border-emerald-500/30 rounded-full">
          Google Cloud Stack
        </span>
      </div>

      {/* Grid Flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 relative">
        {layers.map((layer, idx) => (
          <div key={idx} className="p-4 bg-slate-950/80 border border-slate-800 rounded-xl relative hover:border-emerald-500/40 transition-all">
            
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-slate-500">{layer.step}</span>
              <div className="p-1.5 bg-slate-900 rounded-lg border border-slate-800">{layer.icon}</div>
            </div>

            <h4 className="text-xs sm:text-sm font-extrabold text-white mb-1">
              {layer.title}
            </h4>

            <p className="text-[11px] text-slate-400 leading-normal">
              {layer.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-emerald-950/30 border border-emerald-500/20 rounded-xl flex items-center justify-between text-xs text-emerald-200">
        <span className="font-semibold">Deployed Stack: Firebase Hosting + Cloud Run + Firestore + Gemini 3.5 Flash</span>
        <span className="font-bold text-white bg-emerald-900/80 px-2.5 py-1 rounded-lg border border-emerald-500/40">
          Live & Production Ready
        </span>
      </div>

    </div>
  );
}
