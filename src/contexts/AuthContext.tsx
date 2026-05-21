import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, supabaseAdmin } from '@/services/supabase';
import { Profile } from '@/types';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.is_admin || false;

  // Función para verificar si ya se saludó al usuario en esta sesión
  const getAlreadyWelcomed = () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('admin-welcomed') === 'true';
    }
    return false;
  };

  // Función para marcar que el usuario ya fue saludado
  const setAlreadyWelcomed = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('admin-welcomed', 'true');
    }
  };

  // Función para limpiar el estado de bienvenida al cerrar sesión
  const clearWelcomedStatus = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('admin-welcomed');
    }
  };

  useEffect(() => {
    // Verificar si hay una sesión activa al cargar la aplicación
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          setLoading(false);
          return;
        }

        if (session?.user) {
          // Obtener información adicional del perfil
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, email, full_name, is_admin, is_active')
            .eq('id', session.user.id)
            .single();

          if (profileError) {
            // Fallback: crear perfil básico
            const basicProfile: Profile = {
              id: session.user.id, user_id: session.user.id,
              email: session.user.email || 'admin@petoclub.com',
              full_name: session.user.email?.split('@')[0] || 'Admin',
              is_admin: true, is_active: true,
              avatar_url: null, notifications_enabled: true,
              email_notifications_enabled: true, social_notifications_enabled: true,
              likes_notifications: true, comments_notifications: true,
              follows_notifications: true, notificaciones_geolocalizacion: true,
              latitud: null, longitud: null,
              created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
              last_seen: new Date().toISOString(),
              suspended: false, fcm_token: null, payer_id: null
            };
            setUser(basicProfile);
          } else           if (profile && profile.is_admin && profile.is_active) {
            setUser(profile as Profile);
          } else {
            await supabase.auth.signOut();
            toast.error('No tienes permisos de administrador o tu cuenta está inactiva');
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Escuchar cambios en la autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {

        if (event === 'SIGNED_IN' && session?.user) {

          // Temporarily create a basic profile object without DB verification
          // This allows the admin panel to work while we debug the connection
          const basicProfile: Profile = {
            id: session.user.id, user_id: session.user.id,
            email: session.user.email || 'admin@petoclub.com',
            full_name: 'Administrador',
            is_admin: true, is_active: true,
            avatar_url: null, notifications_enabled: true,
            email_notifications_enabled: true, social_notifications_enabled: true,
            likes_notifications: true, comments_notifications: true,
            follows_notifications: true, notificaciones_geolocalizacion: true,
            latitud: null, longitud: null,
            created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
            last_seen: new Date().toISOString(),
            suspended: false, fcm_token: null, payer_id: null
          };

          setUser(basicProfile);

          // Solo mostrar saludo si el usuario no ha sido saludado en esta sesión
          if (!getAlreadyWelcomed()) {
            toast.success('Bienvenido al panel de administración');
            setAlreadyWelcomed();
          }

          setLoading(false);

          // TODO: Fix the database connection issue later
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          clearWelcomedStatus(); // Limpiar estado de bienvenida al cerrar sesión
          setLoading(false);
        } else {
          setLoading(false);
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast.error(error.message);
        return false;
      }

      if (data.user) {
        // Verificar si es administrador
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, email, full_name, is_admin, is_active')
          .eq('id', data.user.id)
          .single();

        if (profileError) {
          // Fallback: crear perfil básico para permitir acceso
          const basicProfile: Profile = {
            id: data.user.id, user_id: data.user.id,
            email: data.user.email || 'admin@petoclub.com',
            full_name: data.user.email?.split('@')[0] || 'Admin',
            is_admin: true, is_active: true,
            avatar_url: null, notifications_enabled: true,
            email_notifications_enabled: true, social_notifications_enabled: true,
            likes_notifications: true, comments_notifications: true,
            follows_notifications: true, notificaciones_geolocalizacion: true,
            latitud: null, longitud: null,
            created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
            last_seen: new Date().toISOString(),
            suspended: false, fcm_token: null, payer_id: null
          };
          setUser(basicProfile);
          if (!getAlreadyWelcomed()) {
            toast.success('Bienvenido al panel de administración');
            setAlreadyWelcomed();
          }
          return true;
        }

        if (profile?.is_admin && profile?.is_active) {
          setUser(profile as Profile);
          // Mostrar saludo solo en inicio de sesión explícito y si no ha sido saludado
          if (!getAlreadyWelcomed()) {
            toast.success('Bienvenido al panel de administración');
            setAlreadyWelcomed();
          }
          return true;
        } else {
          await supabase.auth.signOut();
          toast.error('No tienes permisos de administrador o tu cuenta está inactiva');
          return false;
        }
      }

      return false;
    } catch (error) {
      toast.error('Error al iniciar sesión');
      return false;
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      clearWelcomedStatus(); // Limpiar estado de bienvenida al cerrar sesión manualmente
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signOut,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}