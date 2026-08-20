# ROLE.md — Khelo Vidya

## User Roles

### Student
- View/download lesson packs
- Complete lessons, games, quizzes (offline-capable)
- View own progress, points, badges
- Cannot see other students' data

### Teacher
- Linked to one school + one or more class sections
- View class-wide and per-student progress/weak-topic dashboard
- Cannot edit student submitted attempts (read-only on assessment data)
- Can download/assign lesson packs to a class

### State Department (MVP-lite — read-only derived view, not a separate build)
- Sees the same synced data as the Teacher Dashboard, aggregated to school/topic level
- Anonymized by design — never exposes individual student identities or scores
- No new data collection, no separate write path — this is a read-only rollup of Phase 4's dashboard data

### System/Service Roles
- **Sync Service** — reconciles offline attempt queues using attemptUUID; never overwrites a synced attempt
- **Content Service** — serves versioned lesson packs; read-only to students/teachers

## Permission Rules
- A teacher can only see students in their own linked school/class.
- Students cannot self-elevate role or view teacher dashboards.
- All write operations for assessment data are append-only (immutable attempt log) — corrections happen via a new attempt, never an edit.
- Client-submitted scores are never trusted directly; the server recomputes score from submitted answers server-side.
