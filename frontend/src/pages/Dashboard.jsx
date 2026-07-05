// [Judging Category: Solution quality & functionality / Demo, UX & presentation]
import React, { useState, useEffect } from 'react';
import AlertBanner from '../components/AlertBanner';
import ChatInterface from '../components/ChatInterface';
import RecommendationCard from '../components/RecommendationCard';
import CropImageUpload from '../components/CropImageUpload';
import PriceForecastChart from '../components/PriceForecastChart';
import ArchitectureDiagram from '../components/ArchitectureDiagram';

import { fetchAlerts, sendChatQuery, uploadCropImage, fetchPriceForecast } from '../lib/api';
import { initAnonymousAuth } from '../lib/firebase';
import { Sprout, CloudRain, Sun, MapPin, ShieldCheck, Sparkles, UserCheck } from 'lucide-react';

export default function Dashboard() {
  const [region, setRegion] = useState('Vidarbha');
  const [selectedCrop, setSelectedCrop] = useState('Cotton');
  const [alerts, setAlerts] = useState([]);
  const [topAlert, setTopAlert] = useState(null);
  
  const [decision, setDecision] = useState(null);
  const [isDecisionLoading, setIsDecisionLoading] = useState(false);

  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  const [forecastData, setForecastData] = useState(null);

  // Initial Data Load & Firebase Anonymous Auth Mount
  useEffect(() => {
    initAnonymousAuth();
    loadDashboardData(region, selectedCrop);
  }, [region]);

  const loadDashboardData = async (targetRegion, targetCrop) => {
    // 1. Fetch Proactive Alerts (<3s time to first alert)
    const alertList = await fetchAlerts(targetRegion);
    setAlerts(alertList);
    if (alertList.length > 0) {
      setTopAlert(alertList[0]);
    }

    // 2. Fetch Price Forecast for chart
    const fcData = await fetchPriceForecast(targetCrop, targetRegion);
    setForecastData(fcData);

    // Initial default decision for Ramesh persona
    if (!decision) {
      handleChatQuery({
        query: "Kya mujhe Vidarbha mandi me abhi cotton bechna chahiye?",
        crop: targetCrop
      });
    }
  };

  const handleChatQuery = async ({ query, crop }) => {
    setIsDecisionLoading(true);
    const result = await sendChatQuery({ query, region, crop: crop || selectedCrop });
    setDecision(result);
    setIsDecisionLoading(false);

    // Refresh forecast chart for the discussed crop
    const fc = await fetchPriceForecast(crop || selectedCrop, region);
    setForecastData(fc);
  };

  const handleDiagnose = async ({ imageBase64, mimeType }) => {
    setIsDiagnosing(true);
    const diag = await uploadCropImage({ imageBase64, mimeType, region });
    setDiagnosisResult(diag);
    setIsDiagnosing(false);
  };

  const handleSelectAlert = (alertItem) => {
    handleChatQuery({
      query: `Explain recommendation for alert: ${alertItem.title}`,
      crop: alertItem.crop !== 'All' ? alertItem.crop : selectedCrop
    });
  };

  return (
    <div className="min-h-screen bg-[#0b130f] text-slate-100 pb-16">
      
      {/* Top Navigation & Persona Header */}
      <header className="bg-slate-900/90 border-b border-emerald-900/50 sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo & Pitch Title */}
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-emerald-500 to-emerald-700 text-slate-950 rounded-xl font-black shadow-lg shadow-emerald-500/20">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">AgriMind</h1>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  Decision Intelligence
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">AI Platform for Indian Farmers & Rural Communities</p>
            </div>
          </div>

          {/* District Region Selector & Active Persona Badge */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
              <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Persona: <strong>Ramesh (Cotton Farmer)</strong></span>
            </div>

            <div className="flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 border border-slate-700 rounded-xl">
              <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer"
              >
                <option value="Vidarbha">Vidarbha (Yavatmal)</option>
                <option value="Nashik">Nashik (Maharashtra)</option>
                <option value="Indore">Indore (Madhya Pradesh)</option>
                <option value="Punjab">Punjab (Ludhiana)</option>
              </select>
            </div>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        
        {/* 1. Proactive Alert Banner (AI reaches out first within 3 seconds) */}
        <section>
          <AlertBanner alert={topAlert} onSelectAlert={handleSelectAlert} />
        </section>

        {/* 2. Top Grid: Natural Language Interface & Decision Recommendation Card */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Chat Interface */}
          <div className="lg:col-span-5">
            <ChatInterface
              onSubmitQuery={handleChatQuery}
              isLoading={isDecisionLoading}
              region={region}
            />
          </div>

          {/* Right Column: Single Recommendation Card (Decision Support) */}
          <div className="lg:col-span-7">
            <RecommendationCard
              decision={decision}
              isLoading={isDecisionLoading}
            />
          </div>

        </section>

        {/* 3. Middle Grid: Crop Disease Detector & Recharts Price Forecast */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Gemini Vision Disease Diagnosis */}
          <div className="lg:col-span-5">
            <CropImageUpload
              onDiagnose={handleDiagnose}
              isLoading={isDiagnosing}
              diagnosisResult={diagnosisResult}
            />
          </div>

          {/* Price History & 7-Day Trajectory */}
          <div className="lg:col-span-7">
            <PriceForecastChart
              forecastData={forecastData}
              selectedCrop={selectedCrop}
              onCropChange={(c) => {
                setSelectedCrop(c);
                fetchPriceForecast(c, region).then(setForecastData);
              }}
              selectedRegion={region}
              onRegionChange={(r) => {
                setRegion(r);
              }}
            />
          </div>

        </section>

        {/* 4. Bottom Section: Pitch Architecture Diagram */}
        <section>
          <ArchitectureDiagram />
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 mt-12 text-center text-xs text-slate-500 border-t border-slate-800/80 pt-6">
        <p>AgriMind • Powered by Gemini 2.0 Flash, Gemini Vision & Google Cloud Run</p>
        <p className="mt-1 text-slate-600">Built for Google Cloud Hackathon • Vidarbha Agricultural Decision Support System</p>
      </footer>

    </div>
  );
}
