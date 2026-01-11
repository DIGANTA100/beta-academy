'use client';

import React from 'react';
import { Menu, X, Bell, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Logo } from '../shared/Logo';
import { LanguageToggle } from '../shared/LanguageToggle';
import { Button } from '../ui/button';
import { logoutUser } from '@/lib/firebase/auth';
import { useAuthContext } from '../auth/AuthProvider';

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  sidebarOpen, 
  onToggleSidebar 
}) => {
  const router = useRouter();
  const { userProfile } = useAuthContext();

  const handleLogout = async () => {
    try {
      await logoutUser();
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center space-x-4">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-slate-100 transition"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
        {!sidebarOpen && <Logo size="sm" showText={true} />}
      </div>

      <div className="flex items-center space-x-4">
        <LanguageToggle />
        
        <button className="p-2 rounded-lg hover:bg-slate-100 transition relative">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-slate-200">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">{userProfile?.name || 'User'}</p>
            <p className="text-xs text-slate-500 capitalize">{userProfile?.role || 'Student'}</p>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {userProfile?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-red-600 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
};
