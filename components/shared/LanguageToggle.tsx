'use client';

import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '@/lib/hooks/useLanguage';
import { Button } from '../ui/button';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2"
    >
      <Globe className="w-4 h-4" />
      <span className="font-semibold uppercase">{language}</span>
    </Button>
  );
};
