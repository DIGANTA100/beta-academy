import { useAuth } from './useAuth';
import { UserRole } from '../firebase/auth';

export const useRole = () => {
  const { userProfile, loading } = useAuth();

  const hasRole = (role: UserRole): boolean => {
    return userProfile?.role === role;
  };

  const isAdmin = (): boolean => {
    return hasRole('admin');
  };

  const isStudent = (): boolean => {
    return hasRole('student');
  };

  return {
    role: userProfile?.role,
    isAdmin: isAdmin(),
    isStudent: isStudent(),
    loading,
  };
};
