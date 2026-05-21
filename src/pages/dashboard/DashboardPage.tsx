import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  Heart,
  Crown,
  ShoppingCart,
  Calendar,
  MapPin,
  HelpCircle,
  Building,
  DollarSign,
  Package,
  AlertCircle,
  TrendingUp,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { dashboardService, analyticsService } from '@/services/supabase';
import { formatCurrency, formatDate } from '@/utils/formatters';

const COLORS = {
  blue: 'bg-blue-500',
  blueLight: 'bg-blue-100',
  green: 'bg-emerald-500',
  greenLight: 'bg-emerald-100',
  purple: 'bg-violet-500',
  purpleLight: 'bg-violet-100',
  amber: 'bg-amber-500',
  amberLight: 'bg-amber-100',
};

const PIE_COLORS = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#14B8A6', '#EC4899', '#6366F1'];

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, icon: Icon, color, trend }: StatCardProps) {
  return (
    <div className="admin-card">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 break-words">{value}</p>
          {trend && (
            <div className={`flex items-center mt-1 text-sm ${
              trend.isPositive ? 'text-emerald-600' : 'text-red-600'
            }`}>
              <TrendingUp className={`w-4 h-4 mr-1 flex-shrink-0 ${
                !trend.isPositive ? 'rotate-180' : ''
              }`} />
              <span className="truncate">{trend.value}%</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color} flex-shrink-0`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}

export function DashboardPage() {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: dashboardService.getStats,
    retry: 2,
    staleTime: 60000,
    refetchInterval: 60000,
  });

  const { data: growthMetrics } = useQuery({
    queryKey: ['dashboard-growth'],
    queryFn: () => analyticsService.getGrowthMetrics('month'),
    retry: 1,
    staleTime: 60000,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Cargando estadísticas...</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="admin-card">
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-8 bg-gray-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400">Error al cargar las estadísticas</p>
        </div>
        <div className="admin-card">
          <div className="flex items-center text-red-600">
            <AlertCircle className="w-5 h-5 mr-2" />
            {error.message || 'Error al cargar las estadísticas del dashboard'}
          </div>
        </div>
      </div>
    );
  }

  const statCards = [
    { title: 'Usuarios Totales', value: stats?.totalUsers || 0, icon: Users, color: COLORS.blue },
    { title: 'Usuarios Activos', value: stats?.activeUsers || 0, icon: Users, color: COLORS.blueLight },
    { title: 'Mascotas Registradas', value: stats?.totalPets || 0, icon: Heart, color: COLORS.green },
    { title: 'Mascotas Activas', value: stats?.activePets || 0, icon: Heart, color: COLORS.greenLight },
    { title: 'Membresías Activas', value: stats?.activeMemberships || 0, icon: Crown, color: COLORS.purple },
    { title: 'Pedidos Totales', value: stats?.totalOrders || 0, icon: ShoppingCart, color: COLORS.purpleLight },
    { title: 'Ingresos Totales', value: formatCurrency(stats?.totalRevenue || 0), icon: DollarSign, color: COLORS.amber },
    { title: 'Avisos Red de Ayuda', value: stats?.totalRedDeAyuda || 0, icon: HelpCircle, color: COLORS.blue },
    { title: 'Avisos Activos', value: stats?.activeRedDeAyuda || 0, icon: HelpCircle, color: COLORS.blueLight },
    { title: 'Eventos', value: stats?.totalEvents || 0, icon: Calendar, color: COLORS.greenLight },
    { title: 'Lugares', value: stats?.totalPlaces || 0, icon: MapPin, color: COLORS.amberLight },
    { title: 'Refugios', value: stats?.totalRefugios || 0, icon: Building, color: COLORS.purpleLight },
  ];

  const comparisonData = [
    { name: 'Usuarios', Total: stats?.totalUsers || 0, Activos: stats?.activeUsers || 0 },
    { name: 'Mascotas', Total: stats?.totalPets || 0, Activos: stats?.activePets || 0 },
    { name: 'Membresías', Total: stats?.totalMemberships || 0, Activos: stats?.activeMemberships || 0 },
    { name: 'Red Ayuda', Total: stats?.totalRedDeAyuda || 0, Activos: stats?.activeRedDeAyuda || 0 },
  ];

  const pieData = [
    { name: 'Usuarios', value: stats?.totalUsers || 0 },
    { name: 'Mascotas', value: stats?.totalPets || 0 },
    { name: 'Pedidos', value: stats?.totalOrders || 0 },
    { name: 'Eventos', value: stats?.totalEvents || 0 },
    { name: 'Lugares', value: stats?.totalPlaces || 0 },
    { name: 'Avisos', value: stats?.totalRedDeAyuda || 0 },
    { name: 'Refugios', value: stats?.totalRefugios || 0 },
    { name: 'Membresías', value: stats?.totalMemberships || 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">Resumen general de la plataforma PetoClub</p>
      </div>

      {/* Growth Metrics */}
      {growthMetrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="admin-card !p-3 sm:!p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">Usuarios</p>
              <span className={`text-xs font-semibold ${growthMetrics.users.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {growthMetrics.users.growth > 0 ? '+' : ''}{growthMetrics.users.growth}%
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{growthMetrics.users.current}</p>
            <p className="text-[10px] text-gray-400">vs {growthMetrics.users.previous} anterior</p>
          </div>
          <div className="admin-card !p-3 sm:!p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">Mascotas</p>
              <span className={`text-xs font-semibold ${growthMetrics.pets.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {growthMetrics.pets.growth > 0 ? '+' : ''}{growthMetrics.pets.growth}%
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{growthMetrics.pets.current}</p>
            <p className="text-[10px] text-gray-400">vs {growthMetrics.pets.previous} anterior</p>
          </div>
          <div className="admin-card !p-3 sm:!p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">Pedidos</p>
              <span className={`text-xs font-semibold ${growthMetrics.orders.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {growthMetrics.orders.growth > 0 ? '+' : ''}{growthMetrics.orders.growth}%
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{growthMetrics.orders.current}</p>
            <p className="text-[10px] text-gray-400">vs {growthMetrics.orders.previous} anterior</p>
          </div>
          <div className="admin-card !p-3 sm:!p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-gray-500">Ingresos</p>
              <span className={`text-xs font-semibold ${growthMetrics.revenue.growth > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                {growthMetrics.revenue.growth > 0 ? '+' : ''}{growthMetrics.revenue.growth}%
              </span>
            </div>
            <p className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{formatCurrency(growthMetrics.revenue.current)}</p>
            <p className="text-[10px] text-gray-400">vs {formatCurrency(growthMetrics.revenue.previous)} anterior</p>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 sm:gap-6">
        {statCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Comparison Bar Chart */}
        <div className="admin-card">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Total vs Activos</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Comparación de registros totales vs activos</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={comparisonData} barGap={4} barCategoryGap="20%">
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={{ stroke: '#E5E7EB' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                    fontSize: '13px',
                  }}
                />
                <Bar dataKey="Total" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Activos" fill="#10B981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="admin-card">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-1">Distribución General</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">Distribución de entidades en la plataforma</p>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.filter(d => d.value > 0).map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    fontSize: '13px',
                  }}
                  formatter={(value: number) => [value.toLocaleString(), 'Cantidad']}
                />
                <Legend
                  wrapperStyle={{ fontSize: '12px' }}
                  formatter={(value: string) => <span className="text-gray-600">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="admin-card">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Usuarios Recientes</h3>
          <div className="space-y-3">
            {stats?.recentUsers?.slice(0, 5).map((user, index) => (
              <div key={user.id || index} className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {user.full_name || 'Administrador'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user.email || 'admin@petoclub.com'}
                  </p>
                </div>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200 whitespace-nowrap">
                  Activo
                </span>
              </div>
            ))}
            {(!stats?.recentUsers || stats.recentUsers.length === 0) && (
              <p className="text-sm text-gray-500">No hay usuarios recientes</p>
            )}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Pedidos Recientes</h3>
          <div className="space-y-3">
            {stats?.recentOrders?.slice(0, 5).map((order, index) => (
              <div key={order.id || index} className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {formatCurrency(order.total || 0)}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(order.fecha_pedido)}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  order.estado_pago === 'pagado'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    : order.estado_pago === 'pendiente'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                  {order.estado_pago === 'pagado' ? 'Pagado' :
                   order.estado_pago === 'pendiente' ? 'Pendiente' : order.estado_pago}
                </span>
              </div>
            ))}
            {(!stats?.recentOrders || stats.recentOrders.length === 0) && (
              <p className="text-sm text-gray-500">No hay pedidos recientes</p>
            )}
          </div>
        </div>

        <div className="admin-card">
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Red de Ayuda</h3>
          <div className="space-y-3">
            {stats?.recentRedDeAyuda?.slice(0, 5).map((aviso, index) => (
              <div key={aviso.id || index} className="flex items-center justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                    {aviso.nombre || aviso.tipo_aviso || 'Aviso'}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {aviso.tipo_aviso} {aviso.especie ? `- ${aviso.especie}` : ''}
                  </p>
                </div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                  aviso.estado === 'activo'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200'
                    : aviso.estado === 'resuelto'
                    ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
                }`}>
                  {aviso.estado === 'activo' ? 'Activo' :
                   aviso.estado === 'resuelto' ? 'Resuelto' : aviso.estado}
                </span>
              </div>
            ))}
            {(!stats?.recentRedDeAyuda || stats.recentRedDeAyuda.length === 0) && (
              <p className="text-sm text-gray-500">No hay avisos recientes</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="admin-card">
        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Acciones Rápidas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          <button className="flex flex-col items-center p-3 sm:p-4 text-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Users className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mb-2" />
            <span className="text-xs sm:text-sm font-medium truncate">Gestión de Usuarios</span>
          </button>
          <button className="flex flex-col items-center p-3 sm:p-4 text-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-emerald-500 mb-2" />
            <span className="text-xs sm:text-sm font-medium truncate">Mascotas</span>
          </button>
          <button className="flex flex-col items-center p-3 sm:p-4 text-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Crown className="w-6 h-6 sm:w-8 sm:h-8 text-violet-500 mb-2" />
            <span className="text-xs sm:text-sm font-medium truncate">Membresías</span>
          </button>
          <button className="flex flex-col items-center p-3 sm:p-4 text-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <ShoppingCart className="w-6 h-6 sm:w-8 sm:h-8 text-violet-500 mb-2" />
            <span className="text-xs sm:text-sm font-medium truncate">Tienda</span>
          </button>
          <button className="flex flex-col items-center p-3 sm:p-4 text-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <Calendar className="w-6 h-6 sm:w-8 sm:h-8 text-amber-500 mb-2" />
            <span className="text-xs sm:text-sm font-medium truncate">Eventos</span>
          </button>
          <button className="flex flex-col items-center p-3 sm:p-4 text-center rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500 mb-2" />
            <span className="text-xs sm:text-sm font-medium truncate">Red de Ayuda</span>
          </button>
        </div>
      </div>
    </div>
  );
}
