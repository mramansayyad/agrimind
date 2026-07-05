// [Judging Category: Decision support - Single Recommendation Card with Reasoning]
import React from 'react';
import { CheckCircle2, AlertCircle, Sparkles, TrendingUp, ShieldCheck, ArrowRight, Lightbulb } from 'lucide-react';

export default function RecommendationCard({ decision, isLoading }) {
  if (isLoading) {
    return (
      <div className="agri-card p-6 sm:p-8 animate-pulse border-emerald-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 animate-spin border-2 border-emerald-500 border-t-transparent" />
          <div className="h-5 bg-slate-700 rounded w-1/3"></div>
        </div>
        <div className="h-8 bg-slate-800 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-slate-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-slate-800 rounded w-2/3"></div>
      </div>
    );
  }

  if (!decision) return null;

  const { recommendation, reasoning, confidence = 92, actionSteps = [], estimatedImpact, answer } = decision;

  return (
    <div className="agri-card p-5 sm:p-7 border-2 border-emerald-500/40 bg-gradient-to-br from-slate-900 via-emerald-950/40 to-slate-900 shadow-2xl rounded-2xl relative overflow-hidden">
      
      {/* Decorative Top Glow */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-400 to-emerald-500"></div>

      {/* Header Tag + Confidence Score */}
      <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            AgriMind Decision Recommendation
          </span>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/80 border border-emerald-500/50 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-extrabold text-emerald-300">
            {confidence}% Confidence
          </span>
        </div>
      </div>

      {/* The Single Bold Recommendation Statement */}
      <div className="mb-4">
        <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-tight bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
          {recommendation}
        </h2>
      </div>

      {/* Plain Language Hinglish/English Answer */}
      {answer && (
        <div className="mb-4 p-3.5 bg-slate-950/70 border border-slate-800 rounded-xl text-xs sm:text-sm text-slate-200 leading-relaxed">
          <span className="font-semibold text-emerald-400">Advisor Note: </span>
          {answer}
        </div>
      )}

      {/* Explainable AI Reasoning */}
      <div className="mb-5 p-4 bg-emerald-950/30 border border-emerald-500/20 rounded-xl">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1.5">
          <Lightbulb className="w-4 h-4" />
          <span>Why AgriMind Recommends This (Explainable AI)</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {reasoning}
        </p>
      </div>

      {/* Action Steps & Financial Impact Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-800 pt-4">
        
        {/* Action Steps (2 cols) */}
        <div className="md:col-span-2 space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Immediate Action Steps
          </span>
          {actionSteps.length > 0 ? (
            actionSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{step}</span>
              </div>
            ))
          ) : (
            <div className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Execute decision window over next 5 days.</span>
            </div>
          )}
        </div>

        {/* Financial Impact Card */}
        {estimatedImpact && (
          <div className="p-3.5 bg-emerald-950/80 border border-emerald-500/40 rounded-xl flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase text-emerald-400 tracking-wider">
              Estimated Value / Savings
            </span>
            <span className="text-sm font-extrabold text-white mt-1">
              {estimatedImpact}
            </span>
          </div>
        )}

      </div>

    </div>
  );
}
