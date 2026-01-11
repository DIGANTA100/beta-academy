import { 
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  Timestamp
} from 'firebase/firestore';
import { db } from './config';

// ===== COURSES =====

export interface Course {
  id?: string;
  title: { en: string; bn: string };
  description: { en: string; bn: string };
  thumbnail?: string;
  published: boolean;
  createdAt: Timestamp;
  order: number;
}

export const createCourse = async (course: Omit<Course, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'courses'), {
    ...course,
    createdAt: Timestamp.now(),
  });
  return docRef.id;
};

export const getCourse = async (id: string): Promise<Course | null> => {
  const docSnap = await getDoc(doc(db, 'courses', id));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Course;
  }
  return null;
};

export const getAllCourses = async (publishedOnly: boolean = false): Promise<Course[]> => {
  const q = publishedOnly
    ? query(collection(db, 'courses'), where('published', '==', true), orderBy('order'))
    : query(collection(db, 'courses'), orderBy('order'));
  
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Course));
};

export const updateCourse = async (id: string, data: Partial<Course>): Promise<void> => {
  await updateDoc(doc(db, 'courses', id), data);
};

export const deleteCourse = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'courses', id));
};

// ===== TOPICS =====

export interface Topic {
  id?: string;
  courseId: string;
  title: { en: string; bn: string };
  youtubeUrl: string;
  notesUrl?: string;
  order: number;
  published: boolean;
}

export const createTopic = async (topic: Omit<Topic, 'id'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'topics'), topic);
  return docRef.id;
};

export const getTopic = async (id: string): Promise<Topic | null> => {
  const docSnap = await getDoc(doc(db, 'topics', id));
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Topic;
  }
  return null;
};

export const getTopicsByCourse = async (courseId: string): Promise<Topic[]> => {
  const q = query(
    collection(db, 'topics'),
    where('courseId', '==', courseId),
    orderBy('order')
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Topic));
};

export const updateTopic = async (id: string, data: Partial<Topic>): Promise<void> => {
  await updateDoc(doc(db, 'topics', id), data);
};

export const deleteTopic = async (id: string): Promise<void> => {
  await deleteDoc(doc(db, 'topics', id));
};
