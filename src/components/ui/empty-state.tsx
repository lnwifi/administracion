import React from 'react';
import { cn } from '@/utils/cn';
import { LucideIcon } from 'lucide-react';

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Icon to display in the empty state */
  icon?: LucideIcon;
  /** Title/headline for the empty state */
  title?: string;
  /** Description text for the empty state */
  description?: string;
  /** Action button text */
  actionText?: string;
  /** Action button click handler */
  onAction?: () => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
}

export function EmptyState({
  icon: Icon,
  title = 'No hay datos',
  description = 'No se encontraron elementos para mostrar',
  actionText,
  onAction,
  size = 'md',
  className,
  ...props
}: EmptyStateProps) {
  const sizeClasses = {
    sm: {
      icon: 'w-8 h-8',
      title: 'text-sm font-medium',
      description: 'text-xs',
      button: 'text-xs px-3 py-1.5',
      padding: 'py-4',
    },
    md: {
      icon: 'w-12 h-12',
      title: 'text-base font-semibold',
      description: 'text-sm',
      button: 'text-sm px-4 py-2',
      padding: 'py-8',
    },
    lg: {
      icon: 'w-16 h-16',
      title: 'text-lg font-semibold',
      description: 'text-base',
      button: 'text-base px-6 py-3',
      padding: 'py-12',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center',
        classes.padding,
        className
      )}
      {...props}
    >
      {Icon && (
        <Icon className={cn(
          'text-gray-400 dark:text-gray-600 mb-3',
          classes.icon
        )} />
      )}
      {title && (
        <p className={cn(
          'text-gray-900 dark:text-gray-100 mb-1',
          classes.title
        )}>
          {title}
        </p>
      )}
      {description && (
        <p className={cn(
          'text-gray-500 dark:text-gray-400 mb-4 max-w-sm',
          classes.description
        )}>
          {description}
        </p>
      )}
      {actionText && onAction && (
        <button
          onClick={onAction}
          className={cn(
            'bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors',
            classes.button
          )}
        >
          {actionText}
        </button>
      )}
    </div>
  );
}

/**
 * Pre-configured empty states for common use cases
 */
export const EmptyStates = {
  noResults: (searchTerm?: string) => ({
    title: 'No se encontraron resultados',
    description: searchTerm
      ? `No hay elementos que coincidan con "${searchTerm}"`
      : 'No se encontraron elementos con los filtros aplicados',
  }),

  noItems: (itemName: string) => ({
    title: `No hay ${itemName}`,
    description: `No se encontraron ${itemName} registrados en el sistema`,
  }),

  noData: () => ({
    title: 'No hay datos disponibles',
    description: 'No se pudo cargar la información. Por favor, intenta nuevamente.',
  }),

  noSelection: (itemName: string) => ({
    title: `Selecciona ${itemName}`,
    description: `Elige un elemento de la lista para ver sus detalles`,
  }),

  error: (message?: string) => ({
    title: 'Error al cargar',
    description: message || 'Ha ocurrido un error inesperado. Por favor, intenta nuevamente.',
  }),
};
