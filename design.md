# Design — Gamified Learning Platform (MVP)

## 1. Core Learning Loop
```
Student opens lesson → reads/views content → attempts quiz →
gets instant feedback → earns points/badge → returns to lesson list
```
This loop is the entire MVP. Everything else (AI, voice, leaderboards) is a later layer on top of this loop, not a replacement for it.

## 2. Gamification Mechanics (MVP-scoped)
- **Points**: fixed points per correct answer, no complex scoring curve initially
- **Badges**: awarded on lesson completion (not per-question) — e.g., "Completed: Fractions Basics"
- **No leaderboard in MVP** — comparing students across a class raises design/ethics questions (see below) and isn't needed to test the core hypothesis
- **Streaks/levels**: explicitly deferred post-MVP

## 3. Adaptivity (rule-based, not AI, for MVP)
Simple deterministic rules:
- Score < 60% on a quiz → next attempt surfaces easier/remedial questions from a tagged pool
- Score > 90% → optional "challenge" question shown (nice-to-have, not blocking)
No model training, no external AI calls required for this behavior.

## 4. Offline UX Principles
- The app must **never block** a student because of connectivity — every core action (view lesson, take quiz) works fully offline once content is cached
- Sync status shown subtly (small icon), never as a blocking modal
- Clearly separate "always offline" features (lessons, quizzes) from "requires connectivity" features (if voice/AI added later) so students don't file bug reports for expected behavior

## 5. Content Model (MVP)
- One subject, one grade, one language, 10–15 lessons
- Each lesson: title, short content block (text/image), 3–5 quiz questions (MCQ only for MVP — no free text grading needed)
- Content authored manually and seeded into MongoDB — no authoring UI in MVP

## 6. Teacher Dashboard Design
- Single table view: student name, lessons completed, average score, last active date
- No charts/analytics needed for MVP — a sortable table answers "who needs help" well enough

## 7. Ethical/Design Considerations Deferred but Noted
- Public leaderboards can demotivate low performers — if added later, consider class-level or effort-based framing rather than raw score ranking
- Badges should reward completion/effort, not just correctness, to avoid discouraging struggling students

## 8. Visual/UI Notes
- Design for a small, low-res Android screen first — not desktop-first
- Minimize asset weight (compress images, avoid heavy animation libraries) — every KB costs a real student real data money
- High-contrast, large tap targets — assume variable literacy and unfamiliarity with app UI conventions
