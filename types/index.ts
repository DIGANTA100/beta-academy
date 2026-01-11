import { Timestamp } from 'firebase/firestore';

export type UserRole = 'admin' | 'student';
export type Language = 'en' | 'bn';

export interface User {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  language: Language;
  createdAt: Timestamp;
}

export interface BilingualText {
  en: string;
  bn: string;
}

export interface Course {
  id?: string;
  title: BilingualText;
  description: BilingualText;
  thumbnail?: string;
  published: boolean;
  createdAt: Timestamp;
  order: number;
}

export interface Topic {
  id?: string;
  courseId: string;
  title: BilingualText;
  youtubeUrl: string;
  notesUrl?: string;
  order: number;
  published: boolean;
}

export interface Exam {
  id?: string;
  courseId: string;
  title: BilingualText;
  duration: number;
  totalMarks: number;
  passingMarks: number;
  published: boolean;
  instructions: BilingualText;
}

export interface Question {
  id?: string;
  examId: string;
  question: BilingualText;
  options: BilingualText[];
  correctAnswer: number;
  marks: number;
  order: number;
}

export interface Attempt {
  id?: string;
  userId: string;
  examId: string;
  answers: { questionId: string; selectedAnswer: number }[];
  score: number;
  totalQuestions: number;
  startedAt: Timestamp;
  submittedAt: Timestamp;
}
