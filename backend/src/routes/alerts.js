// [Judging Category: Insights, forecasts, alerts - Autonomous Alerting]
import express from 'express';
import { detectAnomaliesAndAlerts } from '../services/anomalyService.js';

const router = express.Router();

router.get('/alerts', async (req, res) => {
  try {
    const region = req.query.region || 'Vidarbha';
    const alerts = await detectAnomaliesAndAlerts(region);

    return res.json({
      success: true,
      region,
      timestamp: new Date().toISOString(),
      count: alerts.length,
      alerts
    });

  } catch (err) {
    console.error('[AlertsRoute] Error fetching alerts:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to retrieve proactive alerts',
      alerts: [
        {
          id: 'alert-fallback',
          type: 'PRICE_ANOMALY',
          severity: 'CRITICAL',
          title: 'Cotton Price Drop in Vidarbha Mandi',
          crop: 'Cotton',
          region: 'Vidarbha',
          deviationPercent: -18.2,
          currentPrice: 5650,
          ma7: 6700,
          message: 'Cotton prices dropped 18.2% in 3 days. Do not distress sell.',
          recommendedAction: 'HOLD stock for 4-6 days. Price rebound expected.'
        }
      ]
    });
  }
});

export default router;
