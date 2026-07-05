# Technical Decisions & Architectural Choices — AgriMind v2

## 1. Single-Page Reactive Architecture (Vite + React + Tailwind)
- **Decision**: Use Vite with React for fast loading (<1s initial paint) and single-page dashboard composition.
- **Rationale**: Farmers with low-bandwidth connections benefit from a fast SPA. Single page prevents routing friction during judge demo.

## 2. Server-side AI Proxy & Prompt Enrichment (Cloud Run + Express)
- **Decision**: All calls to Gemini 2.0 Flash / Vision route through Express backend services (`/api/chat`, `/api/diagnose`).
- **Rationale**: Keeps `GEMINI_API_KEY` hidden. Enables Retrieval-Augmented Context Injection (attaching real-time weather & mandi price data to Gemini prompts before generation) to eliminate price hallucinations.

## 3. Graceful Offline & Fallback Intelligence Engine
- **Decision**: Build deterministic fallback engines inside `geminiService.js` and `weatherService.js`.
- **Rationale**: Guarantees a zero-downtime, sub-3-second response even if external API limits or network latency occur during live pitch.

## 4. 7-Day Moving Average Anomaly Detection Algorithm
- **Decision**: Calculate percentage deviation `(today_price - ma_7) / ma_7 * 100`. Flag deviations exceeding ±15%.
- **Rationale**: Provides instant, rule-backed proactive alerts ("AI reaches out first") on page load.

## 5. Firebase Anonymous Authentication & Graceful Guest Mode
- **Decision**: Automatically attempt Firebase Anonymous Auth if keys are present; otherwise fall back cleanly to a guest farmer session.
- **Rationale**: Eliminates network errors when running without a configured Firebase project while fulfilling auth requirements when deployed.

## 6. Deterministic Least-Squares Linear Regression Forecasts
- **Decision**: Implement linear regression for general crop/region price trajectories while retaining the Cotton/Vidarbha rebound curve as the explicit hackathon demo scenario.
- **Rationale**: Guarantees identical, reproducible output when calling `/forecast` repeatedly on any crop.

## 7. UI Contrast Design (Evaluation Screen Polish)
- **Decision**: Retain dark high-contrast theme for evaluator laptops/projectors.
- **Rationale**: Provides optimal visual presentation during pitch evaluations; light-mode variant is planned for outdoor direct-sunlight field deployment.
