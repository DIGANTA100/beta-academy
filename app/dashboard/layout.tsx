'use client';

import React, { useState } from 'react';
import { Logo } from '@/components/shared/Logo';
import { DashboardHeader } from '@/components/layout/DashboardHeader';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50">
      {children}
    </div>
  );
}