-- Khelo Vidya PostgreSQL Schema DDL
-- Team Binary Beasts | SIH25048

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Schools table
CREATE TABLE IF NOT EXISTS schools (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    udise_code VARCHAR(50) UNIQUE NOT NULL,
    district VARCHAR(100) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (Students, Teachers, Admins, Department Viewers)
-- Follows DPDP Act minimization: collects only essential fields
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(20) NOT NULL CHECK (role IN ('student', 'teacher', 'admin', 'department')),
    name VARCHAR(150) NOT NULL,
    email_or_username VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    school_id UUID REFERENCES schools(id) ON DELETE SET NULL,
    class_section VARCHAR(20),
    grade INTEGER CHECK (grade >= 6 AND grade <= 9 OR grade IS NULL),
    language_pref VARCHAR(10) NOT NULL DEFAULT 'or' CHECK (language_pref IN ('or', 'en')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Content Topics (STEM curriculum modules)
CREATE TABLE IF NOT EXISTS content_topics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    subject VARCHAR(50) NOT NULL DEFAULT 'STEM',
    grade INTEGER NOT NULL CHECK (grade >= 6 AND grade <= 9),
    topic_name VARCHAR(255) NOT NULL,
    topic_name_odia VARCHAR(255),
    order_index INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lessons (Offline-cachable lesson content with versioning)
CREATE TABLE IF NOT EXISTS lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    topic_id UUID NOT NULL REFERENCES content_topics(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    title_odia VARCHAR(255),
    content_version INTEGER NOT NULL DEFAULT 1,
    language VARCHAR(10) NOT NULL DEFAULT 'or',
    content_body JSONB NOT NULL DEFAULT '{}'::jsonb,
    media_refs JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Quiz Questions (MCQ questions with difficulty tags)
CREATE TABLE IF NOT EXISTS quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_text_odia TEXT,
    options JSONB NOT NULL,
    options_odia JSONB,
    correct_option INTEGER NOT NULL,
    difficulty_tag VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (difficulty_tag IN ('easy', 'medium', 'hard')),
    points INTEGER NOT NULL DEFAULT 10,
    order_index INTEGER NOT NULL DEFAULT 0
);

-- Attempts (Append-only immutable log with attemptUUID idempotency)
CREATE TABLE IF NOT EXISTS attempts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_uuid UUID UNIQUE NOT NULL,
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
    answers JSONB NOT NULL DEFAULT '[]'::jsonb,
    client_submitted_score INTEGER DEFAULT 0,
    server_computed_score INTEGER NOT NULL DEFAULT 0,
    total_questions INTEGER NOT NULL DEFAULT 0,
    correct_answers INTEGER NOT NULL DEFAULT 0,
    status VARCHAR(20) NOT NULL DEFAULT 'synced' CHECK (status IN ('pending_sync', 'synced')),
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    synced_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Topic Progress (Derived table recomputed from attempts)
CREATE TABLE IF NOT EXISTS progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    topic_id UUID NOT NULL REFERENCES content_topics(id) ON DELETE CASCADE,
    mastery_level NUMERIC(5, 2) NOT NULL DEFAULT 0.00,
    total_points INTEGER NOT NULL DEFAULT 0,
    lessons_completed INTEGER NOT NULL DEFAULT 0,
    last_activity_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_student_topic UNIQUE (student_id, topic_id)
);

-- Badges Earned (Derived table awarded on lesson completion / mastery)
CREATE TABLE IF NOT EXISTS badges_earned (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    badge_id VARCHAR(100) NOT NULL,
    badge_name VARCHAR(150) NOT NULL,
    badge_name_odia VARCHAR(150),
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_student_badge UNIQUE (student_id, badge_id)
);

-- Sync Log (Audit trail for client queue synchronization)
CREATE TABLE IF NOT EXISTS sync_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    device_id VARCHAR(150) NOT NULL,
    student_id UUID REFERENCES users(id) ON DELETE SET NULL,
    last_sync_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    attempts_pushed INTEGER NOT NULL DEFAULT 0,
    attempts_accepted INTEGER NOT NULL DEFAULT 0,
    attempts_rejected_duplicate INTEGER NOT NULL DEFAULT 0
);

-- Lesson / Gamified Progress (Level, XP, Plant Stage, Difficulty, Completed)
CREATE TABLE IF NOT EXISTS lesson_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id VARCHAR(100) NOT NULL,
    current_level INTEGER NOT NULL DEFAULT 1,
    xp INTEGER NOT NULL DEFAULT 0,
    score INTEGER NOT NULL DEFAULT 0,
    difficulty VARCHAR(20) NOT NULL DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
    plant_stage VARCHAR(50) NOT NULL DEFAULT 'seed',
    completed BOOLEAN NOT NULL DEFAULT FALSE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_student_lesson_progress UNIQUE (student_id, lesson_id)
);

-- Indexes for lightning fast queries and idempotent upserts
CREATE INDEX IF NOT EXISTS idx_users_email_or_username ON users(email_or_username);
CREATE INDEX IF NOT EXISTS idx_users_role_school ON users(role, school_id);
CREATE INDEX IF NOT EXISTS idx_attempts_student ON attempts(student_id);
CREATE INDEX IF NOT EXISTS idx_attempts_attempt_uuid ON attempts(attempt_uuid);
CREATE INDEX IF NOT EXISTS idx_lessons_topic ON lessons(topic_id);
CREATE INDEX IF NOT EXISTS idx_quiz_questions_lesson ON quiz_questions(lesson_id);
CREATE INDEX IF NOT EXISTS idx_progress_student ON progress(student_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_student ON lesson_progress(student_id, lesson_id);
