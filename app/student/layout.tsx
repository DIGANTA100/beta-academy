'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sidebar, SidebarItem } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Logo } from '@/components/shared/Logo';
import { BookOpen, Award, MessageSquare, User } from 'lucide-react';

const studentSidebarItems: SidebarItem[] = [
  { icon: BookOpen, label: 'My Courses', href: '/student/courses' },
  { icon: Award, label: 'Exams', href: '/student/exams' },
  { icon: MessageSquare, label: 'Discussions', href: '/student/discussions' },
  { icon: User, label: 'Profile', href: '/student/profile' },
];

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ProtectedRoute requiredRole="student">
      <div className="flex h-screen bg-slate-50">
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
          <div className="h-16 border-b border-slate-200 bg-white flex items-center px-4">
            {sidebarOpen && <Logo size="sm" showText={true} />}
          </div>
          <Sidebar items={studentSidebarItems} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        </div>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <DashboardHeader sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
