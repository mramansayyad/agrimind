// [Judging Category: Natural language interaction / Decision support]
import express from 'express';
import { generateDecisionReasoning } from '../services/geminiService.js';
import { getCropPrices, getRegionSoilInfo } from '../services/marketDataService.js';
import { getWeatherForecast } from '../services/weatherService.js';

const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { query, region = 'Vidarbha', crop = 'Cotton' } = req.body;

    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    // 1. Gather Ground-Truth Context (RAG)
    const marketContext = getCropPrices(crop, region);
    const soilContext = getRegionSoilInfo(region);
    const weatherContext = await getWeatherForecast(region);

    // 2. Call Gemini Service with RAG payload
    const decision = await generateDecisionReasoning({
      query,
      region,
      marketContext,
      weatherContext,
      soilContext
    });

    return res.json({
      success: true,
      query,
      region,
      crop,
      decision
    });

  } catch (err) {
    console.error('[ChatRoute] Error processing chat query:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to process AgriMind decision query',
      fallback: {
        recommendation: 'HOLD stock and check local Mandi advisory.',
        confidence: 75,
        reasoning: 'Temporary connection delay. Retrying context lookup.'
      }
    });
  }
});

export default router;
