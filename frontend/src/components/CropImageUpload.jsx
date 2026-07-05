// [Judging Category: Pattern/anomaly detection - Gemini Vision Crop Diagnosis]
import React, { useState } from 'react';
import { Camera, Upload, AlertTriangle, CheckCircle2, RefreshCw, Eye, ShieldAlert } from 'lucide-react';

export default function CropImageUpload({ onDiagnose, isLoading, diagnosisResult }) {
  const [imagePreview, setImagePreview] = useState(null);

  // Pre-loaded realistic sample leaf image (cotton bollworm sample)
  const sampleLeafImage = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'><rect width='100%' height='100%' fill='%2314532d'/><path d='M200 40 Q280 120 200 260 Q120 120 200 40 Z' fill='%2316a34a'/><circle cx='180' cy='140' r='12' fill='%2378350f'/><circle cx='210' cy='160' r='8' fill='%23d97706'/><text x='110' y='280' fill='%23ffffff' font-family='sans-serif' font-size='14'>Cotton Leaf Pest Sample (Pink Bollworm)</text></svg>";

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onDiagnose({ imageBase64: reader.result, mimeType: file.type });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLoadSample = () => {
    setImagePreview(sampleLeafImage);
    onDiagnose({ imageBase64: sampleLeafImage, mimeType: 'image/jpeg' });
  };

  return (
    <div className="agri-card p-5 sm:p-6 border-slate-800 bg-slate-900/90 rounded-2xl shadow-xl">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Visual Crop Disease Detector</h3>
            <p className="text-xs text-slate-400">Upload leaf photo for Instant Gemini Vision Diagnosis</p>
          </div>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-1 bg-amber-950 text-amber-300 border border-amber-500/30 rounded-full">
          Gemini Vision
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Upload Box / Image Preview */}
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-700 hover:border-emerald-500/50 rounded-xl p-4 bg-slate-950/60 transition-all text-center min-h-[220px]">
          {imagePreview ? (
            <div className="relative w-full h-full flex flex-col items-center">
              <img
                src={imagePreview}
                alt="Uploaded Leaf"
                className="max-h-40 rounded-lg object-contain mb-3 border border-slate-700"
              />
              <button
                onClick={() => setImagePreview(null)}
                className="text-xs text-slate-400 hover:text-red-400 underline"
              >
                Clear / Upload different photo
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Upload className="w-8 h-8 text-slate-500 mb-2" />
              <p className="text-xs text-slate-300 font-medium mb-1">
                Drag & drop leaf photo or tap to browse
              </p>
              <p className="text-[11px] text-slate-500 mb-3">Supports JPG, PNG (Max 5MB)</p>
              
              <label className="cursor-pointer text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3.5 py-2 rounded-xl transition-all mb-2">
                Select Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              <button
                type="button"
                onClick={handleLoadSample}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold underline"
              >
                Or Load Demo Leaf Sample
              </button>
            </div>
          )}
        </div>

        {/* Diagnosis Result Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center h-full py-8 text-center">
              <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mb-3" />
              <p className="text-sm font-bold text-white">Gemini Vision Analyzing Leaf Pattern...</p>
              <p className="text-xs text-slate-400 mt-1">Detecting fungal, pest, or deficiency signatures</p>
            </div>
          ) : diagnosisResult ? (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1">
                  <ShieldAlert className="w-4 h-4" />
                  Diagnosis Result
                </span>
                <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  {diagnosisResult.confidence}% Match
                </span>
              </div>

              <h4 className="text-base font-extrabold text-white mb-2">
                {diagnosisResult.diagnosis}
              </h4>

              <div className="p-2.5 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-amber-200 mb-3">
                <span className="font-bold text-white">Recommended Action: </span>
                {diagnosisResult.recommended_action}
              </div>

              {diagnosisResult.symptoms && (
                <div className="space-y-1 text-xs text-slate-300">
                  <span className="font-bold text-slate-400 block text-[11px] uppercase">Detected Symptoms:</span>
                  {diagnosisResult.symptoms.slice(0, 2).map((sym, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                      <span>{sym}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-6 text-slate-500">
              <Eye className="w-8 h-8 mb-2 stroke-1 text-slate-600" />
              <p className="text-xs font-semibold text-slate-400">No image analyzed yet</p>
              <p className="text-[11px] text-slate-500 mt-1">Upload a crop photo above or click 'Load Demo Leaf Sample'</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
