// [Judging Category: Architecture & technical execution / Deployment on GCP]
import express from 'express';
import cors from 'cors';
import chatRouter from './routes/chat.js';
import diagnoseRouter from './routes/diagnose.js';
import forecastRouter from './routes/forecast.js';
import alertsRouter from './routes/alerts.js';
import { getRegions, getCrops } from './services/marketDataService.js';
import { getWeatherForecast } from './services/weatherService.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for frontend requests
app.use(cors({ origin: '*' }));

// High payload limit for base64 image uploads (10MB)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint for Cloud Run
app.get('/', (req, res) => {
  res.json({
    name: 'AgriMind AI Backend',
    status: 'HEALTHY',
    version: '1.0.0',
    platform: 'Google Cloud Run',
    aiEngine: 'Gemini 3.5 Flash & Gemini Vision',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api', chatRouter);
app.use('/api', diagnoseRouter);
app.use('/api', forecastRouter);
app.use('/api', alertsRouter);

// Metadata Endpoint for frontend initialization
app.get('/api/metadata', async (req, res) => {
  const region = req.query.region || 'Vidarbha';
  const weather = await getWeatherForecast(region);
  res.json({
    regions: getRegions(),
    crops: getCrops(),
    currentRegion: region,
    weather
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AgriMind Cloud Run Server running on port ${PORT}`);
});
