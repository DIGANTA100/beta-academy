'use client';

import React from 'react';
import { useRole } from '@/lib/hooks/useRole';
import { UserRole } from '@/lib/firebase/auth';

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: UserRole[];
  fallback?: React.ReactNode;
}

export const RoleGuard: React.FC<RoleGuardProps> = ({ 
  children, 
  allowedRoles,
  fallback 
}) => {
  const { role, loading } = useRole();

  if (loading) {
    return null;
  }

  if (!role || !allowedRoles.includes(role)) {
    return <>{fallback || null}</>;
  }

  return <>{children}</>;
};