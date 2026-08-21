export type UserRole = 'student' | 'teacher' | 'admin' | 'department';
export type LanguageCode = 'or' | 'en';

export interface User {
  id: string;
  role: UserRole;
  name: string;
  email_or_username: string;
  school_id?: string | null;
  school_name?: string | null;
  class_section?: string | null;
  grade?: number | null;
  language_pref: LanguageCode;
  created_at: string;
}

export interface RegisterData {
  role: UserRole;
  name: string;
  email_or_username: string;
  password: string;
  grade?: number | null;
  class_section?: string | null;
  school_id?: string | null;
  language_pref?: LanguageCode;
}

export interface School {
  id: string;
  name: string;
  udise_code: string;
  district: string;
}

export interface QueuedAttempt {
  attemptUUID: string;
  studentId: string;
  lessonId: string;
  answers: { question_id: string; selected_option: number }[];
  clientSubmittedScore: number;
  totalQuestions: number;
  correctAnswers: number;
  status: 'pending_sync' | 'synced';
  submittedAt: string;
  syncedAt?: string | null;
}

export interface CachedLesson {
  id: string;
  topicId: string;
  grade: number;
  subject: string;
  title: string;
  titleOdia?: string;
  contentVersion: number;
  language: LanguageCode;
  contentBody: Record<string, unknown>;
  mediaRefs?: string[];
  questions: CachedQuestion[];
  cachedAt: string;
}

export interface CachedQuestion {
  id: string;
  lessonId: string;
  questionText: string;
  questionTextOdia?: string;
  options: string[];
  optionsOdia?: string[];
  correctOption: number;
  difficultyTag: 'easy' | 'medium' | 'hard';
  points: number;
}

export interface CachedBadge {
  id: string;
  studentId: string;
  badgeId: string;
  badgeName: string;
  badgeNameOdia?: string;
  earnedAt: string;
}

export interface ContentTopic {
  id: string;
  subject: string;
  grade: number;
  topic_name: string;
  topic_name_odia?: string | null;
  order_index: number;
  lesson_count?: number;
}

export interface LessonSummary {
  id: string;
  topic_id: string;
  title: string;
  title_odia?: string | null;
  content_version: number;
  language: LanguageCode;
  subject: string;
  grade: number;
  topic_name: string;
  topic_name_odia?: string | null;
  question_count?: number;
  media_refs?: string[];
  created_at?: string;
}

export interface LessonSection {
  title: string;
  titleOdia: string;
  content: string;
  contentOdia: string;
  keyPoints?: string[];
  keyPointsOdia?: string[];
}

export interface LessonContentBody {
  summary?: string;
  summaryOdia?: string;
  sections?: LessonSection[];
  realWorldOdisha?: {
    title: string;
    titleOdia: string;
    context: string;
    contextOdia: string;
  };
  funFact?: {
    en: string;
    or: string;
  };
}

export interface AttemptSubmissionResponse {
  success: boolean;
  isDuplicate: boolean;
  score: number;
  totalPossibleScore: number;
  correctCount: number;
  totalQuestions: number;
  answerBreakdown: Array<{
    question_id: string;
    selected_option: number;
    correct_option: number;
    is_correct: boolean;
    points_earned: number;
  }>;
  newBadges: Array<{
    id: string;
    name: string;
    nameOdia: string;
  }>;
  progress: {
    topicId: string;
    masteryPercent: number;
    completedLessonsCount: number;
    topicTotalPoints: number;
  };
}

export interface TopicProgressItem {
  topic_id: string;
  mastery_level: number;
  total_points: number;
  lessons_completed: number;
  last_activity_at: string;
  subject: string;
  grade: number;
  topic_name: string;
  topic_name_odia?: string | null;
  total_topic_lessons: number;
}

export interface StudentProgressSummary {
  stats: {
    totalPoints: number;
    totalCompletedLessons: number;
    badgesCount: number;
  };
  topicProgress: TopicProgressItem[];
  badges: Array<{
    id: string;
    badge_id: string;
    badge_name: string;
    badge_name_odia?: string | null;
    earned_at: string;
  }>;
}

export interface TeacherStudentRosterItem {
  id: string;
  name: string;
  email_or_username: string;
  school_id: string | null;
  class_section: string | null;
  grade: number | null;
  language_pref: LanguageCode;
  created_at: string;
  total_points: number;
  lessons_completed: number;
  mastery_percent: number;
  quizzes_taken: number;
  weak_topics: string[];
  last_activity_at: string;
}

export interface TeacherTopicDiagnostic {
  topic_id: string;
  topic_name: string;
  topic_name_odia?: string;
  subject: string;
  grade: number;
  average_accuracy: number;
  attempts_count: number;
  is_weak_topic: boolean;
}

export interface TeacherRecentActivityItem {
  id: string;
  attempt_uuid: string;
  student_id: string;
  student_name: string;
  class_section: string;
  lesson_title: string;
  lesson_title_odia?: string;
  subject: string;
  score: number;
  total_questions: number;
  correct_answers: number;
  submitted_at: string;
  status: string;
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

export interface ClassSummaryResponse {
  success: boolean;
  schoolName?: string | null;
  udiseCode?: string | null;
  classStats: {
    totalStudents: number;
    totalAttempts: number;
    classAvgScore: number;
    weakTopicsCount: number;
  };
  students: TeacherStudentRosterItem[];
  teachers?: TeacherFacultyItem[];
  topicDiagnostics: TeacherTopicDiagnostic[];
  recentActivity: TeacherRecentActivityItem[];
}



