import React from 'react';
import { cn } from '@/utils/cn';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Loading message to display */
  message?: string;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show the spinner */
  showSpinner?: boolean;
}

export function LoadingState({
  message = 'Cargando...',
  size = 'md',
  showSpinner = true,
  className,
  ...props
}: LoadingStateProps) {
  const sizeClasses = {
    sm: {
      spinner: 'w-4 h-4',
      text: 'text-sm',
      gap: 'gap-2',
    },
    md: {
      spinner: 'w-6 h-6',
      text: 'text-base',
      gap: 'gap-3',
    },
    lg: {
      spinner: 'w-8 h-8',
      text: 'text-lg',
      gap: 'gap-4',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center',
        classes.gap,
        className
      )}
      {...props}
    >
      {showSpinner && (
        <Loader2 className={cn(
          'animate-spin text-primary',
          classes.spinner
        )} />
      )}
      {message && (
        <p className={cn(
          'text-gray-600 dark:text-gray-400',
          classes.text
        )}>
          {message}
        </p>
      )}
    </div>
  );
}

/**
 * Card skeleton loader for tables and lists
 */
export function CardSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="admin-card animate-pulse">
          <div className="flex items-center space-x-4">
            <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Table skeleton loader
 */
export function TableSkeleton({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="admin-card">
      <div className="rounded-md border overflow-hidden">
        <div className="w-full">
          {/* Header */}
          <div className="flex border-b bg-gray-50 dark:bg-gray-800">
            {Array.from({ length: columns }).map((_, i) => (
              <div key={i} className="flex-1 p-4">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
          {/* Rows */}
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="flex border-b last:border-b-0">
              {Array.from({ length: columns }).map((_, colIndex) => (
                <div key={colIndex} className="flex-1 p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Stats card skeleton loader for dashboard
 */
export function StatsCardSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="admin-card animate-pulse">
          <div className="flex items-center justify-between">
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
