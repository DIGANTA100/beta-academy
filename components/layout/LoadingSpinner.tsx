import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text 
}) => {
  const sizes = {
    sm: 'w-8 h-8 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className={`${sizes[size]} border-primary-600 border-t-transparent rounded-full animate-spin`}></div>
      {text && (
        <p className="mt-4 text-slate-600 font-medium">{text}</p>
      )}
    </div>
  );
};
