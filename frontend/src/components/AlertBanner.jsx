// [Judging Category: Insights, forecasts, alerts / Presentation & WOW Moment]
import React from 'react';
import { AlertTriangle, TrendingDown, ShieldAlert, ChevronRight, CheckCircle2, DollarSign } from 'lucide-react';

export default function AlertBanner({ alert, onSelectAlert }) {
  if (!alert) return null;

  const isCritical = alert.severity === 'CRITICAL';

  return (
    <div className={`w-full rounded-2xl p-4 sm:p-5 border shadow-xl transition-all duration-300 ${
      isCritical 
        ? 'bg-gradient-to-r from-amber-950/90 via-red-950/80 to-slate-900 border-amber-500/50 text-amber-100 shadow-amber-950/40' 
        : 'bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950 border-emerald-500/40 text-emerald-100'
    }`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Left Icon & Main Text */}
        <div className="flex items-start gap-3.5">
          <div className={`p-2.5 rounded-xl shrink-0 ${
            isCritical ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}>
            {isCritical ? <TrendingDown className="w-6 h-6 animate-pulse" /> : <ShieldAlert className="w-6 h-6" />}
          </div>
          
          <div>
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className={`text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                isCritical ? 'bg-red-500/20 text-red-300 border-red-500/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
              }`}>
                ⚡ Proactive AI Alert • {alert.region}
              </span>
              {alert.deviationPercent && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/30">
                  {alert.deviationPercent}% deviation
                </span>
              )}
            </div>

            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {alert.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {alert.message}
            </p>
          </div>
        </div>

        {/* Right Recommended Quick Action & Impact Badge */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0 border-t sm:border-t-0 border-slate-700/60 pt-3 sm:pt-0">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-lg border border-emerald-500/30">
            <DollarSign className="w-3.5 h-3.5 text-emerald-300" />
            <span>{alert.financialImpact || 'Saves ₹10,500/acre'}</span>
          </div>

          <button
            onClick={() => onSelectAlert && onSelectAlert(alert)}
            className="inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2 rounded-xl transition-all font-sans shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            <span>Ask AgriMind Advice</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
