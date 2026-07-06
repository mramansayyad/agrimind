---
name: agrimind-decision-intelligence-builder
version: 1.0
description: Governs how the Antigravity agent builds, self-checks, and finishes "AgriMind" — the AI-Powered Decision Intelligence Platform for Cohort Hackathon Problem Statement 2 (Google Cloud + Gemini).
applies_to: Google Antigravity agentic IDE
project_codename: AgriMind
---

# SKILL: AgriMind — Decision Intelligence Builder

## 0. Non-Negotiable Context
- Solution Quality (20%), Architecture (20%), Impact (20%), Technical Feasibility (20%), Presentation (20%).
- Domain: Indian agriculture & rural economic decision-making (Persona: Ramesh in Vidarbha, Maharashtra).

## 1. Mandatory Architecture Pattern
Data Sources -> Ingestion Layer -> AI Engine (Gemini 2.0 Flash + Vision) -> Decision Layer -> Action Layer -> Outcome.

## 2. Required Core Modules
1. Multi-source ingestion (Weather API, Mandi prices, Soil data, NL queries)
2. Natural language interaction (Hinglish-tolerant chat via Gemini 2.0 Flash)
3. Insights, forecasts, alerts (Irrigation advisory, price trend forecast, proactive anomaly risk alerts)
4. Pattern/anomaly detection (Gemini Vision disease diagnosis, >15% moving average price anomaly detector)
5. Decision support (Single "Recommended Action" card with plain-language reasoning & confidence)
6. Deployment architecture (Cloud Run backend API proxy + Firebase Hosting frontend + Firestore state)
