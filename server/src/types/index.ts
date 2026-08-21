export type UserRole = 'student' | 'teacher' | 'admin' | 'department';
export type LanguagePref = 'or' | 'en';
export type DifficultyTag = 'easy' | 'medium' | 'hard';
export type AttemptStatus = 'pending_sync' | 'synced';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email_or_username: string;
  password_hash: string;
  school_id?: string | null;
  class_section?: string | null;
  grade?: number | null;
  language_pref: LanguagePref;
  created_at: string;
}

export interface UserResponse {
  id: string;
  role: UserRole;
  name: string;
  email_or_username: string;
  school_id?: string | null;
  school_name?: string | null;
  class_section?: string | null;
  grade?: number | null;
  language_pref: LanguagePref;
  created_at: string;
}

export interface School {
  id: string;
  name: string;
  udise_code: string;
  district: string;
  created_at: string;
}

export interface ContentTopic {
  id: string;
  subject: string;
  grade: number;
  topic_name: string;
  topic_name_odia?: string | null;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  topic_id: string;
  title: string;
  title_odia?: string | null;
  content_version: number;
  language: LanguagePref;
  content_body: Record<string, any>;
  media_refs: string[];
  created_at: string;
}

export interface QuizQuestion {
  id: string;
  lesson_id: string;
  question_text: string;
  question_text_odia?: string | null;
  options: string[];
  options_odia?: string[];
  correct_option: number;
  difficulty_tag: DifficultyTag;
  points: number;
  order_index: number;
}

export interface AttemptAnswer {
  question_id: string;
  selected_option: number;
}

export interface Attempt {
  id: string;
  attempt_uuid: string;
  student_id: string;
  lesson_id: string;
  answers: AttemptAnswer[];
  client_submitted_score: number;
  server_computed_score: number;
  total_questions: number;
  correct_answers: number;
  status: AttemptStatus;
  submitted_at: string;
  synced_at: string;
}

export interface Progress {
  id: string;
  student_id: string;
  topic_id: string;
  mastery_level: number;
  total_points: number;
  lessons_completed: number;
  last_activity_at: string;
}

export interface BadgeEarned {
  id: string;
  student_id: string;
  badge_id: string;
  badge_name: string;
  badge_name_odia?: string | null;
  earned_at: string;
}

export interface JWTPayload {
  id: string;
  role: UserRole;
  name: string;
  grade?: number | null;
}

export interface TeacherFacultyItem {
  id: string;
  name: string;
  email_or_username: string;
  school_id: string | null;
  school_name?: string | null;
  class_section?: string | null;
  role: string;
  created_at: string;
}

