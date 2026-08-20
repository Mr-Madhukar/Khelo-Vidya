# architecture.md — Khelo Vidya

## High-Level Flow
Student (PWA, offline-capable) → Local Queue (IndexedDB) → Sync Service → API → DB
                                                                              ↓
                                                              Teacher Dashboard (reads synced data)

## Client (PWA)
- Service worker caches lesson packs + app shell for full offline use
- IndexedDB stores: downloaded lessons, in-progress attempts (with attemptUUID), badge state
- Sync happens opportunistically on reconnect, resumable if interrupted

## Backend
- API layer: auth, content serving, attempt ingestion, dashboard reads
- Sync endpoint: idempotent upsert keyed on attemptUUID (see db-design.md)
- Score recomputation happens server-side only — client scores are advisory/audit-only
- Rule-based adaptivity: simple threshold logic (e.g., 3 wrong at a difficulty tag → drop tag; 3 right → raise tag) — no model serving needed

## Localization
- Bhashini API called at content-authoring/build time where possible (pre-translate, cache) rather than per-request, to keep the app usable offline
- Language preference stored per user, drives which cached content version loads

## Data Flow for the Offline Demo
1. Device goes offline → student completes lesson + quiz → attempt written locally with attemptUUID, status `pending_sync`
2. Device reconnects → sync service pushes queued attempts
3. Server upserts on attemptUUID (duplicate pushes are no-ops)
4. Progress/badges recomputed from attempts → teacher dashboard reflects it on next dashboard load

## Stack (locked — see .antigravityrules)
- Frontend: PWA (offline-first, installable)
- Backend: Node.js + Express, PostgreSQL (relational — chosen for the append-only attempt log + attemptUUID idempotency, and native `UNIQUE` constraints for upsert-on-conflict)
- Sync: custom queue + idempotent upsert, not a generic "cache when online" library
