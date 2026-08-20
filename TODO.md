# TODO

## Phase 0
- [x] Init client (React + Vite) and server (Express) repos/folders
- [x] Set up PostgreSQL relational schema per db-design.md
- [x] Implement `/auth/register`, `/auth/login`, `/auth/me`, JWT middleware
- [x] Configure offline shell (PWA manifest, service worker, Dexie.js)

## Phase 1
- [x] Lesson list screen (`/lessons`)
- [x] Lesson detail screen (`/lessons/:id`)
- [x] Quiz-taking flow with MCQ, pre-generated `attemptUUID` + instant feedback (`/lessons/:id/quiz`)
- [x] Seed script: 16 STEM lessons across Physics, Chemistry, Biology & Math with Odia/English content
- [x] `/lessons`, `/topics`, `/attempts`, and `/progress` endpoints with zero-trust score calculation & idempotent upsert

## Phase 2
- [x] Points calculation logic
- [x] Badge award logic on lesson completion
- [x] Student profile/progress screen (`/progress`)

## Phase 3 (offline-first — budget the most time here)
- [ ] Configure Workbox service worker, precache app shell
- [ ] Cache lesson/quiz JSON on first fetch
- [ ] Set up Dexie.js schema: attempts_queue, lessons_cache, session
- [ ] Implement background sync of queued attempts
- [ ] Make `/attempts` idempotent via client-generated UUID
- [ ] Handle offline-tolerant auth (long-lived refresh token or local session reconciliation)
- [ ] Test with Chrome DevTools network throttling AND a real low-end Android device

## Phase 4
- [ ] Teacher login/route guard
- [ ] Dashboard table: student, completion %, avg score, last active
- [ ] Basic sort/filter

## Phase 5
- [ ] Error/empty/loading states across app
- [ ] Log MVP success metrics (completion rate, sync success rate, return rate)
- [ ] Deploy client + server (single low-cost host)
- [ ] Smoke test full offline → online → sync cycle end to end

## Ongoing / Don't Forget
- [ ] Review SECURITY.md before handling any real student data
- [ ] Keep content versioning in mind before editing seeded lessons post-launch
- [ ] Do not add AI/voice/multi-language until MVP metrics are reviewed (see PRD.md §6)
