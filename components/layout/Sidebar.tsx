'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

export interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href: string;
  badge?: string;
}

interface SidebarProps {
  items: SidebarItem[];
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ items, isOpen }) => {
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        'bg-white border-r border-slate-200 transition-all duration-300 flex flex-col',
        isOpen ? 'w-64' : 'w-20'
      )}
    >
      <nav className="flex-1 p-4 space-y-2">
        {items.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center space-x-3 px-4 py-3 rounded-lg transition-all',
                'hover:bg-slate-100',
                isActive && 'bg-primary-50 text-primary-700 font-semibold'
              )}
            >
              <Icon className={cn('w-5 h-5 flex-shrink-0', isActive ? 'text-primary-600' : 'text-slate-600')} />
              {isOpen && (
                <>
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="bg-primary-100 text-primary-600 text-xs font-semibold px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
