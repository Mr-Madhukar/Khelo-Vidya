# phases.md — Khelo Vidya

## Phase 0 — Foundation
- Repo setup, .antigravityrules / .cursorrules in place
- Auth (student/teacher roles), school linkage
- Offline shell (PWA install, service worker, local storage schema)

## Phase 1 — Core Learning Loop
- Lesson content model + 15–20 hand-authored lessons (one grade/subject as demo depth)
- Quiz engine with local attempt queue (attemptUUID generated client-side)
- Basic points/badges (no leaderboard)

## Phase 2 — Sync + Offline Proof
- Sync service with idempotent upsert on attemptUUID
- Live demo path: go offline → complete lesson+quiz → reconnect → show no duplication
- Progress/badges recomputed from synced attempts

## Phase 3 — Odia Localization
- Bhashini integration for UI + content translation/TTS
- Language toggle, Odia as default

## Phase 4 — Teacher Dashboard
- Per-student and class-wide weak-topic view
- Reads only from synced, server-recomputed data
- Department view: same data source, rolled up and anonymized to school/topic level (no new backend work beyond an aggregation query — do not treat as a separate feature)

## Phase 5 — Polish & Pitch Readiness
- Rule-based adaptive difficulty (if/else thresholds, not ML)
- SECURITY.md checklist pass (DPDP Act consent, data minimization) before any real student pilot
- Pitch deck + demo script rehearsal

## Explicitly Deferred (post-MVP)
- ML-based personalization
- Leaderboards
- SMS/USSD fallback
- Multi-subject expansion beyond STEM
