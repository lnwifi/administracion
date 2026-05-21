import React from 'react';
import { cn } from '@/utils/cn';

export interface TableWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether to show horizontal scroll indicator on mobile */
  showScrollIndicator?: boolean;
  /** Optional minimum width for the table content */
  minWidth?: string;
}

/**
 * Responsive table wrapper with horizontal scroll on mobile devices
 * and visual indicators for scrollable content
 */
export function TableWrapper({
  children,
  className,
  showScrollIndicator = true,
  minWidth = '600px',
  ...props
}: TableWrapperProps) {
  const [showScrollHint, setShowScrollHint] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check if content is scrollable
    const checkScrollable = () => {
      setShowScrollHint(container.scrollWidth > container.clientWidth);
    };

    checkScrollable();
    window.addEventListener('resize', checkScrollable);

    // Hide hint after user scrolls
    const handleScroll = () => {
      if (showScrollHint) {
        setShowScrollHint(false);
      }
    };

    container.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', checkScrollable);
      container.removeEventListener('scroll', handleScroll);
    };
  }, [showScrollHint]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={cn(
          'overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0',
          'scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600',
          'scrollbar-track-gray-100 dark:scrollbar-track-gray-800',
          className
        )}
        style={{ minWidth: '100%' }}
        {...props}
      >
        <div style={{ minWidth }}>
          {children}
        </div>
      </div>

      {/* Scroll indicator for mobile */}
      {showScrollIndicator && showScrollHint && (
        <div className="sm:hidden absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-8 h-16 bg-gradient-to-l from-white dark:from-gray-800 to-transparent pointer-events-none animate-pulse">
          <svg
            className="w-4 h-4 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

/**
 * Table cell that hides on specific breakpoints
 */
export interface ResponsiveTableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  /** Breakpoint at which to hide the cell */
  hideOn?: 'mobile' | 'tablet' | 'desktop';
}

export function ResponsiveTableCell({
  hideOn,
  className,
  ...props
}: ResponsiveTableCellProps) {
  const hideClasses = {
    mobile: 'hidden sm:table-cell',
    tablet: 'hidden lg:table-cell',
    desktop: 'lg:hidden',
  };

  return (
    <td
      className={cn(
        hideOn && hideClasses[hideOn],
        className
      )}
      {...props}
    />
  );
}

/**
 * Table header cell that hides on specific breakpoints
 */
export interface ResponsiveTableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  /** Breakpoint at which to hide the cell */
  hideOn?: 'mobile' | 'tablet' | 'desktop';
}

export function ResponsiveTableHeader({
  hideOn,
  className,
  ...props
}: ResponsiveTableHeaderProps) {
  const hideClasses = {
    mobile: 'hidden sm:table-cell',
    tablet: 'hidden lg:table-cell',
    desktop: 'lg:hidden',
  };

  return (
    <th
      className={cn(
        hideOn && hideClasses[hideOn],
        className
      )}
      {...props}
    />
  );
}

/**
 * Responsive table row that stacks content on mobile
 */
export interface ResponsiveTableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  /** Data that should be shown on mobile when row is expanded */
  mobileData?: React.ReactNode;
}

export function ResponsiveTableRow({
  mobileData,
  children,
  className,
  ...props
}: ResponsiveTableRowProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  return (
    <>
      <tr
        className={cn('sm:table-row', className)}
        onClick={() => setIsExpanded(!isExpanded)}
        {...props}
      >
        {children}
      </tr>
      {/* Mobile detail row */}
      {mobileData && (
        <tr className="sm:hidden">
          <td colSpan={100} className="px-4 py-3 bg-gray-50 dark:bg-gray-800/50">
            <div
              className={cn(
                'overflow-hidden transition-all duration-200',
                isExpanded ? 'max-h-96' : 'max-h-0'
              )}
            >
              {mobileData}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
