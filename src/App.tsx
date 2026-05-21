import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

import { AuthProvider } from '@/contexts/AuthContext';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

function lazyLoad(importFn: () => Promise<any>, name: string) {
  return lazy(() => importFn().then(m => ({ default: m[name] })));
}

// Lazy loaded pages (named exports need lazyLoad helper)
const LoginPage = lazyLoad(() => import('@/pages/auth/LoginPage'), 'LoginPage');
const DashboardPage = lazyLoad(() => import('@/pages/dashboard/DashboardPage'), 'DashboardPage');
const UsersPage = lazyLoad(() => import('@/pages/usuarios/UsersPage'), 'UsersPage');
const PetsPage = lazyLoad(() => import('@/pages/mascotas/PetsPage'), 'PetsPage');
const MembershipsPage = lazyLoad(() => import('@/pages/membresias/MembershipsPage'), 'MembershipsPage');
const ProductsPage = lazyLoad(() => import('@/pages/tienda/productos/ProductsPage'), 'ProductsPage');
const OrdersPage = lazyLoad(() => import('@/pages/tienda/pedidos/OrdersPage'), 'OrdersPage');
const CategoriesPage = lazyLoad(() => import('@/pages/tienda/categorias/CategoriesPage'), 'CategoriesPage');
const CouponsPage = lazyLoad(() => import('@/pages/tienda/cupones/CouponsPage'), 'CouponsPage');
const EventsPage = lazyLoad(() => import('@/pages/eventos/EventsPage'), 'EventsPage');
const PlacesPage = lazyLoad(() => import('@/pages/lugares/PlacesPage'), 'PlacesPage');
const OwnerPlacePanel = lazyLoad(() => import('@/pages/lugares/OwnerPlacePanel'), 'OwnerPlacePanel');
const BannersPage = lazyLoad(() => import('@/pages/banners/BannersPage'), 'BannersPage');
const RedDeAyudaPage = lazyLoad(() => import('@/pages/red-de-ayuda/RedDeAyudaPage'), 'RedDeAyudaPage');
const ReportsPage = lazyLoad(() => import('@/pages/reportes/ReportsPage'), 'ReportsPage');
const PromotionalCodesPage = lazyLoad(() => import('@/pages/codigos-promocionales/PromotionalCodesPage'), 'PromotionalCodesPage');
const PopupsPage = lazyLoad(() => import('@/pages/popups/PopupsPage'), 'PopupsPage');
// Default export pages
const RefugiosPage = lazy(() => import('@/pages/refugios/RefugiosPage'));
const AnalyticsPage = lazy(() => import('@/pages/analytics/AnalyticsPage'));
const ConfiguracionPage = lazy(() => import('@/pages/configuracion/ConfiguracionPage'));
const NotificationsPage = lazy(() => import('@/pages/notifications/NotificationsPage'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function PageLoading() {
  return (
    <div className="flex items-center justify-center h-64">
      <Loader2 className="w-6 h-6 animate-spin text-primary" />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="admin-container">
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/login" element={<LoginPage />} />

                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="usuarios" element={<UsersPage />} />
                  <Route path="mascotas" element={<PetsPage />} />
                  <Route path="membresias" element={<MembershipsPage />} />
                  <Route path="tienda">
                    <Route path="productos" element={<ProductsPage />} />
                    <Route path="pedidos" element={<OrdersPage />} />
                    <Route path="categorias" element={<CategoriesPage />} />
                    <Route path="cupones" element={<CouponsPage />} />
                  </Route>
                  <Route path="eventos" element={<EventsPage />} />
                  <Route path="lugares">
                    <Route index element={<PlacesPage />} />
                    <Route path=":id/panel" element={<OwnerPlacePanel />} />
                  </Route>
                  <Route path="banners" element={<BannersPage />} />
                  <Route path="red-de-ayuda" element={<RedDeAyudaPage />} />
                  <Route path="reportes" element={<ReportsPage />} />
                  <Route path="refugios" element={<RefugiosPage />} />
                  <Route path="analytics" element={<AnalyticsPage />} />
                  <Route path="notificaciones" element={<NotificationsPage />} />
                  <Route path="codigos-promocionales" element={<PromotionalCodesPage />} />
                  <Route path="popups" element={<PopupsPage />} />
                  <Route path="configuracion" element={<ConfiguracionPage />} />
                </Route>

                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>

            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
                success: {
                  duration: 3000,
                  iconTheme: {
                    primary: '#4aed88',
                    secondary: '#fff',
                  },
                },
                error: {
                  duration: 5000,
                  iconTheme: {
                    primary: '#ff6b6b',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
