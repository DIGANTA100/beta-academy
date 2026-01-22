
'use client';

import React, { useState } from 'react';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sidebar, SidebarItem } from '@/components/layout/Sidebar';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { Logo } from '@/components/shared/Logo';
import { BookOpen, FileText, Award, Users, MessageSquare, BarChart3 } from 'lucide-react';

const adminSidebarItems: SidebarItem[] = [
  { icon: BookOpen, label: 'Courses', href: '/admin/courses' },
  { icon: FileText, label: 'Topics', href: '/admin/topics' },
  { icon: Award, label: 'Exams', href: '/admin/exams' },
  { icon: Users, label: 'Students', href: '/admin/students' },
  { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="flex h-screen bg-slate-50">
        <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
          <div className="h-16 border-b border-slate-200 bg-white flex items-center px-4">
            {sidebarOpen && <Logo size="sm" showText={true} />}
          </div>
          <Sidebar items={adminSidebarItems} isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
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