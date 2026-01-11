'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '../shared/Logo';
import { LanguageToggle } from '../shared/LanguageToggle';
import { Button } from '../ui/button';

export const Navbar: React.FC = () => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <Logo size="md" showText={true} />
          </Link>
          
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            <Link href="/login">
              <Button variant="ghost" size="sm">Login</Button>
            </Link>
            <Link href="/register">
              <Button variant="primary" size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

