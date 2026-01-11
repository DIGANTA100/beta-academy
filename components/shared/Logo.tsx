'use client';

import React from 'react';
import Image from 'next/image';
import { GraduationCap } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showText = true }) => {
  const sizes = {
    sm: { icon: 'w-6 h-6', text: 'text-lg' },
    md: { icon: 'w-8 h-8', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl' },
  };

  return (
    <div className="flex items-center space-x-2">
      {/* Fallback gradient logo if actual logo not available */}
      <div className={`${sizes[size].icon} bg-gradient-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center flex-shrink-0`}>
        <GraduationCap className={`${size === 'sm' ? 'w-4 h-4' : size === 'md' ? 'w-5 h-5' : 'w-7 h-7'} text-white`} />
      </div>
      
      {/* Uncomment when you add your logo */}
      {/* <Image 
        src="/logo.png" 
        alt="Beta Academy" 
        width={size === 'sm' ? 32 : size === 'md' ? 40 : 56}
        height={size === 'sm' ? 32 : size === 'md' ? 40 : 56}
        className="flex-shrink-0"
      /> */}
      
      {showText && (
        <span className={`font-bold text-slate-900 ${sizes[size].text}`}>
          Beta Academy
        </span>
      )}
    </div>
  );
};