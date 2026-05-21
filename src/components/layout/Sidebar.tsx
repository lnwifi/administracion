import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Heart,
  Crown,
  ShoppingCart,
  Calendar,
  MapPin,
  Image,
  HelpCircle,
  Building,
  BarChart3,
  Settings,
  LogOut,
  Package,
  Tags,
  Receipt,
  Ticket,
  Bell,
  Gift,
  Flag,
  MessageSquare,
  PawPrint,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight } from 'lucide-react';

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Usuarios',
    href: '/usuarios',
    icon: Users,
  },
  {
    name: 'Mascotas',
    href: '/mascotas',
    icon: Heart,
  },
  {
    name: 'Membresías',
    href: '/membresias',
    icon: Crown,
  },
  {
    name: 'Tienda',
    icon: ShoppingCart,
    children: [
      { name: 'Productos', href: '/tienda/productos', icon: Package },
      { name: 'Pedidos', href: '/tienda/pedidos', icon: Receipt },
      { name: 'Categorías', href: '/tienda/categorias', icon: Tags },
      { name: 'Cupones', href: '/tienda/cupones', icon: Ticket },
    ],
  },
  {
    name: 'Eventos',
    href: '/eventos',
    icon: Calendar,
  },
  {
    name: 'Lugares',
    href: '/lugares',
    icon: MapPin,
  },
  {
    name: 'Banners',
    href: '/banners',
    icon: Image,
  },
  {
    name: 'Red de Ayuda',
    href: '/red-de-ayuda',
    icon: HelpCircle,
  },
  {
    name: 'Reportes',
    href: '/reportes',
    icon: Flag,
  },
  {
    name: 'Refugios',
    href: '/refugios',
    icon: Building,
  },
  {
    name: 'Notificaciones',
    href: '/notificaciones',
    icon: Bell,
  },
  {
    name: 'Códigos Promocionales',
    href: '/codigos-promocionales',
    icon: Gift,
  },
  {
    name: 'Popups',
    href: '/popups',
    icon: MessageSquare,
  },
  {
    name: 'Analíticas',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    name: 'Configuración',
    href: '/configuracion',
    icon: Settings,
  },
];

interface SidebarProps {
  onClose?: () => void;
}

export function Sidebar({ onClose }: SidebarProps) {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [openSections, setOpenSections] = React.useState<string[]>(['Tienda']);

  const toggleSection = (sectionName: string) => {
    setOpenSections(prev =>
      prev.includes(sectionName)
        ? prev.filter(name => name !== sectionName)
        : [...prev, sectionName]
    );
  };

  const handleSignOut = async () => {
    await signOut();
    onClose?.();
  };

  const navItem = (item: typeof navigation[0]) => {
    const isActive = 'href' in item ? location.pathname === item.href : false;
    const hasChildren = 'children' in item && item.children && item.children.length > 0;
    const isSectionOpen = openSections.includes(item.name);

    if (hasChildren) {
      const child = item as typeof navigation[0] & { children: typeof navigation[0]['children'] };
      return (
        <Collapsible key={item.name} open={isSectionOpen} onOpenChange={() => toggleSection(item.name)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start pl-2 pr-3 h-9 text-sm ${
                location.pathname.startsWith((child.children?.[0] as any)?.href || '')
                  ? 'bg-primary/10 text-primary'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {item.icon && <item.icon className="w-4.5 h-4.5 mr-2.5" />}
              <span className="flex-1 text-left">{item.name}</span>
              {isSectionOpen ? (
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
              )}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-0.5 ml-3">
            {(child.children || []).map((childItem: any) => {
              const isChildActive = location.pathname === childItem.href;
              return (
                <NavLink
                  key={childItem.href}
                  to={childItem.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                    isChildActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  {childItem.icon && <childItem.icon className="w-4 h-4 mr-2.5" />}
                  {childItem.name}
                </NavLink>
              );
            })}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <NavLink
        key={item.href}
        to={item.href!}
        onClick={onClose}
        className={`flex items-center px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        {item.icon && <item.icon className="w-4.5 h-4.5 mr-2.5" />}
        {item.name}
      </NavLink>
    );
  };

  return (
    <div className="admin-sidebar flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-sm">
            <Heart className="w-5 h-5 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">PetoClub</h1>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 leading-tight">Panel de Administración</p>
          </div>
        </div>
      </div>

      {/* User info */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white text-sm font-semibold">
              {user?.full_name?.charAt(0)?.toUpperCase() || 'A'}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 truncate">
              {user?.full_name || 'Admin'}
            </p>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
              {user?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <div className="px-2 py-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Principal</p>
        </div>
        {navigation.slice(0, 1).map((item) => navItem(item))}

        <div className="border-t border-gray-100 dark:border-gray-800 my-1" />

        <div className="px-2 py-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Gestión</p>
        </div>
        {navigation.slice(1, 4).map((item) => navItem(item))}

        <div className="border-t border-gray-100 dark:border-gray-800 my-1" />

        <div className="px-2 py-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Tienda</p>
        </div>
        {navigation.slice(4, 5).map((item) => navItem(item))}

        <div className="border-t border-gray-100 dark:border-gray-800 my-1" />

        <div className="px-2 py-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Contenido</p>
        </div>
        {navigation.slice(5, 11).map((item) => navItem(item))}

        <div className="border-t border-gray-100 dark:border-gray-800 my-1" />

        <div className="px-2 py-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Comunicación</p>
        </div>
        {navigation.slice(11, 13).map((item) => navItem(item))}

        <div className="border-t border-gray-100 dark:border-gray-800 my-1" />

        <div className="px-2 py-1.5">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">Sistema</p>
        </div>
        {navigation.slice(13).map((item) => navItem(item))}
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="w-full justify-start text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <LogOut className="w-5 h-5 mr-3" />
          Cerrar sesión
        </Button>
      </div>
    </div>
  );
}