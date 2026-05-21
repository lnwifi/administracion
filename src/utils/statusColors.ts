/**
 * Status color utilities for admin-v3
 * Provides consistent semantic color variants across the application
 */

export type StatusColor = 'success' | 'warning' | 'info' | 'danger' | 'purple' | 'default' | 'secondary' | 'outline';

export interface StatusConfig {
  variant: StatusColor;
  icon?: React.ReactNode;
  label: string;
}

/**
 * Get status configuration for order states
 */
export function getOrderStatusConfig(status: string): StatusConfig {
  const statusMap: Record<string, StatusConfig> = {
    pendiente: { variant: 'warning', label: 'Pendiente' },
    pagado: { variant: 'info', label: 'Pagado' },
    enviado: { variant: 'purple', label: 'Enviado' },
    entregado: { variant: 'success', label: 'Entregado' },
    cancelado: { variant: 'danger', label: 'Cancelado' },
  };
  return statusMap[status] || { variant: 'secondary', label: status };
}

/**
 * Get status configuration for user states
 */
export function getUserStatusConfig(isActive: boolean, isAdmin: boolean): StatusConfig {
  if (!isActive) return { variant: 'danger', label: 'Inactivo' };
  if (isAdmin) return { variant: 'purple', label: 'Admin' };
  return { variant: 'success', label: 'Activo' };
}

/**
 * Get status configuration for product states
 */
export function getProductStatusConfig(isActive: boolean): StatusConfig {
  return isActive
    ? { variant: 'success', label: 'Activo' }
    : { variant: 'secondary', label: 'Inactivo' };
}

/**
 * Get status configuration for stock levels
 */
export function getStockStatusConfig(stock: number): StatusConfig {
  if (stock <= 0) return { variant: 'danger', label: 'Sin stock' };
  if (stock <= 10) return { variant: 'warning', label: 'Bajo stock' };
  return { variant: 'success', label: 'En stock' };
}

/**
 * Get status configuration for red de ayuda avisos
 */
export function getRedDeAyudaStatusConfig(estado: string): StatusConfig {
  const statusMap: Record<string, StatusConfig> = {
    activo: { variant: 'success', label: 'Activo' },
    resuelto: { variant: 'info', label: 'Resuelto' },
    expirado: { variant: 'secondary', label: 'Expirado' },
  };
  return statusMap[estado] || { variant: 'secondary', label: estado };
}

/**
 * Get badge color class (fallback for non-component usage)
 * Note: Prefer using the Badge component with variant prop
 */
export function getBadgeColorClass(variant: StatusColor): string {
  const colorMap: Record<StatusColor, string> = {
    success: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    info: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    danger: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    default: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    secondary: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    outline: 'text-foreground border border-gray-300 dark:border-gray-600',
  };
  return colorMap[variant] || colorMap.default;
}
