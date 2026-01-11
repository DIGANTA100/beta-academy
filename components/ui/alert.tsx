import React from 'react';
import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'info', title, dismissible, onDismiss, children, ...props }, ref) => {
    const variants = {
      info: {
        container: 'bg-blue-50 border-blue-200 text-blue-900',
        icon: Info,
        iconColor: 'text-blue-500',
      },
      success: {
        container: 'bg-green-50 border-green-200 text-green-900',
        icon: CheckCircle,
        iconColor: 'text-green-500',
      },
      warning: {
        container: 'bg-amber-50 border-amber-200 text-amber-900',
        icon: AlertTriangle,
        iconColor: 'text-amber-500',
      },
      error: {
        container: 'bg-red-50 border-red-200 text-red-900',
        icon: AlertCircle,
        iconColor: 'text-red-500',
      },
    };

    const { container, icon: Icon, iconColor } = variants[variant];

    return (
      <div
        ref={ref}
        className={cn('border rounded-lg p-4', container, className)}
        {...props}
      >
        <div className="flex items-start">
          <Icon className={cn('w-5 h-5 mt-0.5 mr-3 flex-shrink-0', iconColor)} />
          <div className="flex-1">
            {title && <p className="font-semibold mb-1">{title}</p>}
            <div className="text-sm">{children}</div>
          </div>
          {dismissible && onDismiss && (
            <button
              onClick={onDismiss}
              className="ml-3 flex-shrink-0 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';
