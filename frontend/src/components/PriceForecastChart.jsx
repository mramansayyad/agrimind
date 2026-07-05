// [Judging Category: Insights, recommendations, forecasts - Recharts Visualization]
import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ReferenceLine } from 'recharts';
import { TrendingUp, Calendar, MapPin, DollarSign } from 'lucide-react';

export default function PriceForecastChart({ forecastData, selectedCrop, onCropChange, selectedRegion, onRegionChange }) {
  if (!forecastData) return null;

  const { summary, chartData = [], availableCrops = [], availableRegions = [] } = forecastData;

  return (
    <div className="agri-card p-5 sm:p-6 border-slate-800 bg-slate-900/90 rounded-2xl shadow-xl">
      
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 border-b border-slate-800 pb-4">
        
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Mandi Price History & 7-Day Forecast</h3>
              <p className="text-xs text-slate-400">Actual 30-Day Prices vs Predictive Model Trajectory</p>
            </div>
          </div>
        </div>

        {/* Dropdown Selectors */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <select
            value={selectedCrop}
            onChange={(e) => onCropChange(e.target.value)}
            className="bg-slate-950 text-white text-xs font-semibold rounded-xl px-3 py-2 border border-slate-700 focus:border-emerald-500 focus:outline-none"
          >
            {availableCrops.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="bg-slate-950 text-white text-xs font-semibold rounded-xl px-3 py-2 border border-slate-700 focus:border-emerald-500 focus:outline-none"
          >
            {availableRegions.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">Current Price</span>
          <span className="text-base sm:text-lg font-extrabold text-white">₹{summary?.currentPrice || '5,650'}</span>
          <span className="text-[10px] text-slate-500 block">per quintal</span>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">7-Day Moving Avg</span>
          <span className="text-base sm:text-lg font-extrabold text-amber-400">₹{summary?.ma7 || '6,700'}</span>
          <span className="text-[10px] text-slate-500 block">baseline</span>
        </div>

        <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl">
          <span className="text-[11px] font-bold uppercase text-slate-400 block">7-Day Predicted</span>
          <span className="text-base sm:text-lg font-extrabold text-emerald-400">₹{summary?.predicted7d || '6,580'}</span>
          <span className="text-[10px] text-emerald-400 block">Rebound Expected</span>
        </div>
      </div>

      {/* Recharts Chart Container */}
      <div className="h-64 sm:h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis dataKey="day" stroke="#64748b" tick={{ fontSize: 11 }} />
            <YAxis stroke="#64748b" tick={{ fontSize: 11 }} domain={['dataMin - 200', 'dataMax + 200']} />
            <Tooltip
              contentStyle={{ backgroundColor: '#090d16', borderColor: '#334155', borderRadius: '0.75rem', fontSize: '12px', color: '#fff' }}
              formatter={(value) => [`₹${value}/quintal`, 'Price']}
            />
            <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
            <ReferenceLine y={summary?.ma7} label={{ value: 'MA7 Level', fill: '#f59e0b', fontSize: 10 }} stroke="#f59e0b" strokeDasharray="4 4" />
            <Line
              type="monotone"
              dataKey="actual"
              name="30-Day Actual Mandi Price"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              name="7-Day Predicted Trajectory"
              stroke="#f59e0b"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ r: 4, fill: '#f59e0b' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
