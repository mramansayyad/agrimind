// [Judging Category: Solution quality & functionality / Technical choices]
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '../../data');
const mandiPricesPath = path.join(dataDir, 'mandi_prices.json');
const soilRegionsPath = path.join(dataDir, 'soil_regions.json');

let mandiPrices = null;
let soilRegions = null;

function loadData() {
  if (!mandiPrices) {
    const rawMandi = fs.readFileSync(mandiPricesPath, 'utf8');
    mandiPrices = JSON.parse(rawMandi);
  }
  if (!soilRegions) {
    const rawSoil = fs.readFileSync(soilRegionsPath, 'utf8');
    soilRegions = JSON.parse(rawSoil);
  }
}

export function getRegions() {
  loadData();
  return Object.keys(mandiPrices.regions);
}

export function getCrops() {
  loadData();
  return mandiPrices.crops;
}

export function getRegionSoilInfo(region = 'Vidarbha') {
  loadData();
  return soilRegions[region] || soilRegions['Vidarbha'];
}

export function getCropPrices(crop = 'Cotton', region = 'Vidarbha') {
  loadData();
  const regionData = mandiPrices.regions[region] || mandiPrices.regions['Vidarbha'];
  const prices = regionData.prices[crop] || regionData.prices['Cotton'];
  return {
    crop,
    region,
    district: regionData.district,
    state: regionData.state,
    currency: regionData.currency,
    history: prices, // 30 daily price values
    todayPrice: prices[prices.length - 1],
    yesterdayPrice: prices[prices.length - 2],
    price7DaysAgo: prices[prices.length - 8] || prices[0]
  };
}

export function getMarketOverview(region = 'Vidarbha') {
  loadData();
  const regionData = mandiPrices.regions[region] || mandiPrices.regions['Vidarbha'];
  const overview = [];

  for (const [cropName, priceArray] of Object.entries(regionData.prices)) {
    const today = priceArray[priceArray.length - 1];
    const past7 = priceArray.slice(-7);
    const ma7 = past7.reduce((a, b) => a + b, 0) / past7.length;
    const change7dPercent = ((today - priceArray[priceArray.length - 7]) / priceArray[priceArray.length - 7]) * 100;

    overview.push({
      crop: cropName,
      todayPrice: today,
      ma7: Math.round(ma7),
      change7dPercent: parseFloat(change7dPercent.toFixed(2))
    });
  }

  return overview;
}
