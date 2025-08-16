// TypeScript type definitions for GitHub Master Study App

export interface Bindings {
  DB: D1Database;
}

export interface UserProgress {
  id?: number;
  user_id: string;
  course_type: 'beginner' | 'intermediate' | 'advanced';
  lesson_id: string;
  completed: boolean;
  completion_date?: string;
  time_spent: number; // in seconds
}

export interface QuizResult {
  id?: number;
  user_id: string;
  quiz_type: 'basic' | 'commands' | 'workflow';
  question_id: string;
  answer: string;
  is_correct: boolean;
  attempts: number;
  completed_at?: string;
  time_spent: number; // in seconds
}

export interface PracticeSession {
  id?: number;
  user_id: string;
  practice_type: 'command' | 'branch' | 'pullrequest';
  session_data?: string; // JSON string
  completed: boolean;
  completion_date?: string;
  time_spent: number; // in seconds
}

export interface UserStats {
  id?: number;
  user_id: string;
  total_study_time: number; // in seconds
  lessons_completed: number;
  quizzes_completed: number;
  practice_sessions_completed: number;
  current_level: 'beginner' | 'intermediate' | 'advanced';
  streak_days: number;
  last_activity_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Achievement {
  id?: number;
  user_id: string;
  achievement_type: string;
  achievement_data?: string; // JSON string
  earned_at?: string;
}

export interface LearningPath {
  id?: number;
  user_id: string;
  path_name: string;
  path_config?: string; // JSON string
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

// Lesson content types
export interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  course_type: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  order: number;
}

export interface QuizQuestion {
  id: string;
  quiz_type: 'basic' | 'commands' | 'workflow';
  question: string;
  options: string[];
  correct_answer: number; // index of correct option
  explanation: string;
  points: number;
}

export interface PracticeExercise {
  id: string;
  practice_type: 'command' | 'branch' | 'pullrequest';
  title: string;
  description: string;
  instructions: string[];
  expected_commands: string[];
  hints: string[];
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ProgressSummary {
  user_id: string;
  overall_progress: number; // 0-100
  beginner_progress: number;
  intermediate_progress: number;
  advanced_progress: number;
  quiz_scores: {
    basic: number;
    commands: number;
    workflow: number;
  };
  total_study_time: number;
  achievements_count: number;
  streak_days: number;
}