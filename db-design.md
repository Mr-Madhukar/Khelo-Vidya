# db-design.md — Khelo Vidya

## Database: PostgreSQL (relational — matches the append-only, idempotency-heavy attempt log below)

## Core Tables

**users**
`id, role (student|teacher|admin), name, school_id, class_section, language_pref, created_at`

**schools**
`id, name, udise_code, district`

**content_topics**
`id, subject (STEM), grade, topic_name, order_index`

**lessons**
`id, topic_id, title, content_version, language, media_refs[]`

**quiz_questions**
`id, lesson_id, question_text, options[], correct_option, difficulty_tag`

**attempts** (append-only, the record most likely to break under sync bugs)
`id, attemptUUID (client-generated, unique), student_id, lesson_id or quiz_id, answers[], client_submitted_score, server_computed_score, status (pending_sync|synced), submitted_at, synced_at`

**progress**
`student_id, topic_id, mastery_level, last_activity_at` — derived/recomputed from `attempts`, never written directly by client

**badges_earned**
`student_id, badge_id, earned_at`

**sync_log**
`device_id, last_sync_at, attempts_pushed, attempts_accepted, attempts_rejected_duplicate`

## Idempotency Pattern (critical)
- Every attempt gets a client-generated `attemptUUID` at creation time, before the student even starts answering.
- `attemptUUID` has a `UNIQUE` constraint in Postgres. On sync, the server does an `INSERT ... ON CONFLICT (attemptUUID) DO NOTHING` (or `DO UPDATE` for the sync-status fields only): if it already exists, the retry is a no-op — not a duplicate row, not a duplicate score.
- `server_computed_score` is always recalculated server-side from `answers[]` — `client_submitted_score` is stored only for audit/debugging, never trusted.
- `progress` and `badges_earned` are derived tables, recomputed from `attempts` — this makes replaying sync safe.

## Offline Behavior
- Attempts write to local queue with status `pending_sync`.
- On reconnect, queue flushes in order; each attempt's `attemptUUID` makes the flush safe to retry/resume partway.
