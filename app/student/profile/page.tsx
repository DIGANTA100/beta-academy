'use client';

import { useAuthContext } from '@/components/auth/AuthProvider';

export default function StudentProfilePage() {
  const { userProfile } = useAuthContext();
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <p className="text-slate-600"><strong>Name:</strong> {userProfile?.name}</p>
        <p className="text-slate-600"><strong>Email:</strong> {userProfile?.email}</p>
        <p className="text-slate-600"><strong>Role:</strong> {userProfile?.role}</p>
      </div>
    </div>
  );
}