# Technical Decisions & Architectural Choices — AgriMind

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

## 5. Firebase Anonymous Authentication
- **Decision**: Auto-authenticate users anonymously via Firebase Auth SDK on app mount.
- **Rationale**: Fulfills authentication requirement without imposing sign-up friction on judges during evaluation.
