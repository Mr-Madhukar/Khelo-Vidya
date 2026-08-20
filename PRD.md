# PRD — Khelo Vidya
**Team:** Binary Beasts · **Problem Statement ID:** SIH25048 (Govt of Odisha) · **Theme:** Smart Education · **PS Category:** Software · **Status:** MVP scope, locked

## 1. Problem
Rural students in grades 6–9 struggle with STEM because content is abstract/chalk-and-talk, connectivity is unreliable, material isn't in Odia, and teachers get no visibility into who's falling behind. Rural girls in particular often have less access to extra help or safe study spaces outside class, so a private, on-device practice tool closes an access gap standard classroom teaching doesn't.

## 2. Goal
A gamified, offline-first STEM learning app that works fully without internet, teaches in Odia, gives every student (regardless of gender or access to outside tutoring) equal private practice, and gives teachers a real-time picture of class performance.

## 3. Scope (MVP)
- **Subject:** STEM only (not all subjects)
- **Grades:** 6–9
- **Language:** Odia-first (via Bhashini), English fallback
- **Connectivity:** Offline-first PWA — full functionality offline, background sync when online
- **Personalization:** Rule-based difficulty adaptation (no ML model in MVP)
- **Gamification:** Points, badges, levels, daily streaks. Leaderboards explicitly out of MVP.
- **Content:** Hand-authored lessons for one grade/subject combo as demo depth; structure supports scaling later.
- **Department view:** MVP-lite, read-only, anonymized aggregate of already-synced teacher-dashboard data (school/topic-level trends only — no individual student data). Not a separate admin feature to build; it's a derived view on top of Phase 4's dashboard data.

## 4. Core Loop
Student → Learning (lesson) → Game (interactive activity) → Assessment (quiz) → Rule-based analysis → Progress update → Teacher Dashboard

## 5. Key User Stories
- As a student, I download a lesson pack once and complete lessons/quizzes fully offline.
- As a student, I see my progress, points, and badges update after each activity.
- As a teacher, I see per-student and class-wide weak topics without needing connectivity myself at demo time (dashboard syncs when online).
- As a student, my daily streak keeps me coming back even between low-connectivity sessions.
- As a state education department, I see anonymized, school/topic-level trends (not individual students) without any extra data collection beyond what teachers already have.
- As a system, I never double-count a quiz attempt submitted twice due to sync retries (attemptUUID idempotency).

## 6. Non-Goals (MVP)
- No ML-based personalization
- No leaderboards
- No non-STEM subjects
- No SMS/USSD fallback (documented as future work only)

## 7. Success Metrics (for demo/pilot)
- Offline lesson completion → sync without duplication, demonstrated live
- Teacher dashboard reflects synced data within one sync cycle
- Content available in Odia for the demo grade/subject

## 8. Dependencies
- Bhashini API for Odia translation/TTS
- Curriculum source: NCERT open textbooks / Odisha State Board syllabus (hand-converted for MVP)

## 9. Research Grounding (for pitch credibility)
- **NEP 2020, Govt. of India** — policy basis for tech-enabled, equitable school education
- **UNESCO (2023)**, *Digital Learning for All: Challenges & Solutions for Rural Education* — problem framing
- **DIKSHA / Sunbird (NCERT / MoE)** — reference for curriculum-aligned content structure/standards
- **Kolibri (Learning Equality)** — architecture reference for offline-first LMS proven at low-connectivity scale
- **Bhashini (Govt. of India)** — open API powering Odia voice/translation
- **Pandey, A. et al. (2024)**, *Gamification in STEM Education: Improving Engagement in Rural Schools*, IJCSIT — supports the gamification approach

**Open item:** the "32.4% of rural schools have computers, only 17% have internet" stat used on the pitch deck needs a citable source (e.g. a specific ASER or UDISE+ report + year) before a judge asks — not yet documented here.
