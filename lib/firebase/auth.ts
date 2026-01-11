import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

export type UserRole = 'admin' | 'student';

export interface UserProfile {
  uid: string;
  email: string;
  name: string;
  role: UserRole;
  language: 'en' | 'bn';
  createdAt: Date;
}

// Register new user
export const registerUser = async (
  email: string,
  password: string,
  name: string,
  role: UserRole = 'student'
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user profile in Firestore
    const userProfile: UserProfile = {
      uid: userCredential.user.uid,
      email: userCredential.user.email || email,
      name,
      role,
      language: 'en',
      createdAt: new Date(),
    };
    
    await setDoc(doc(db, 'users', userCredential.user.uid), userProfile);
    
    return userCredential;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Login user
export const loginUser = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Logout user
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    throw new Error(error.message);
  }
};

// Get user profile
export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserProfile;
    }
    return null;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
