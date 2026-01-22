
import React, { ReactNode } from 'react';
import { Button } from '../ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
  };
}

export const PageHeader: React.FC<PageHeaderProps> = ({ 
  title, 
  description, 
  action 
}) => {
  return (
    <div className="bg-white border-b border-slate-200 px-8 py-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
          {description && (
            <p className="text-slate-600 mt-1">{description}</p>
          )}
        </div>
        {action && (
          <Button onClick={action.onClick}>
            {action.icon}
            {action.label}
          </Button>
        )}
      </div>
    </div>
  );
};

