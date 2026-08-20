# Safety & Security — Khelo Vidya

## 1. Minors' Data (Applies if this ever touches real students)
- Primary users are children. India's **Digital Personal Data Protection (DPDP) Act, 2023** requires verifiable parental/guardian consent before processing a child's personal data, and prohibits behavioral tracking/targeted ads directed at children.
- MVP/pilot mitigation: collect the minimum possible — first name or username, class/grade, no phone numbers or precise location unless strictly necessary. Route consent through the school/teacher as the responsible adult rather than collecting it directly from a child.
- Do not use student data (scores, engagement patterns) for anything beyond the stated educational purpose (e.g., no ad targeting, no resale, no undisclosed analytics sharing).

## 2. Authentication
- Passwords: hash with bcrypt/argon2, never store plaintext, never log credentials
- JWT: short-lived access tokens; if implementing offline-tolerant sessions (see architecture.md), keep the refresh token scope narrow (identity only, not elevated permissions) and revalidate server-side before any write with real consequence (e.g., teacher dashboard edits)
- Teacher accounts should have stronger auth than student accounts (real email + password, since teachers can view multiple students' data)

## 3. API Security
- Validate and sanitize all input server-side, even from your own client (never trust the device — offline clients are more likely to be tampered with locally)
- Rate-limit `/auth` and `/attempts` endpoints to reduce brute-force and spam-submission risk
- The `/attempts` endpoint must verify `studentId` matches the authenticated user — a student should never be able to submit attempts on behalf of another student ID
- Use HTTPS everywhere in production (no exceptions, even for a "just a pilot" deployment)

## 4. Data at Rest
- MongoDB: restrict network access (IP allowlist or VPC), enable auth, never expose the DB directly to the internet
- Local device storage (IndexedDB): assume the device may be shared among family members — do not cache anything more sensitive than lesson content and the current student's own progress; avoid caching other students' data on a shared-device client

## 5. Content Integrity
- Only teacher/admin roles (server-enforced, not just UI-hidden) can create/edit lesson content
- Version lesson content (see db-design.md) so a mid-sync content change can't silently corrupt a student's in-progress offline attempt

## 6. Abuse/Misuse Considerations
- Points/badges create an incentive to game the system — server must recompute scores from submitted answers, never trust a client-submitted score value directly
- Idempotency (attemptUUID) also protects against accidental or intentional duplicate-submission point farming

## 7. Dependency & Infra Hygiene (solo-dev reality check)
- Keep dependencies minimal — a solo dev cannot audit a huge node_modules tree; prefer well-maintained, widely used packages (Express, Mongoose, Workbox, Dexie) over niche libraries
- Set up basic environment variable management (`.env`, never committed) for DB URIs and JWT secrets
- Add `.env`, `node_modules`, and any real student data exports to `.gitignore` from day one

## 8. Before Any Real Pilot (Non-Negotiable Checklist)
- [ ] Parental/guardian consent process defined and routed through the school
- [ ] HTTPS enabled in production
- [ ] DB not publicly accessible
- [ ] No plaintext secrets in the repo
- [ ] Data minimization reviewed (only collecting what's needed)
- [ ] A clear, simple explanation of what data is collected, given to the school/teacher in plain language

This document should be revisited before Phase 5 (pilot prep) in phases.md — not treated as a one-time checklist.
