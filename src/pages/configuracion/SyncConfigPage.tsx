import React, { useState } from 'react';
import { RefreshCw, Database, CheckCircle, AlertCircle, Clock, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabaseAdmin } from '@/services/supabase';
import { formatDate } from '@/utils/formatters';
import toast from 'react-hot-toast';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_ROLE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

export default function SyncConfigPage() {
  const [syncing, setSyncing] = useState(false);
  const [lastSyncResult, setLastSyncResult] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);

  React.useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const { data, error } = await supabaseAdmin
        .from('petgestion_sync_config')
        .select('*')
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setConfig(data);
    } catch (error) {
    }
  };

  const runSync = async (mode: 'full' | 'incremental') => {
    setSyncing(true);
    setLastSyncResult(null);

    try {
      const response = await fetch(
        `${SUPABASE_URL}/functions/v1/sync-petgestion?mode=${mode}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_SERVICE_ROLE_KEY,
            'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`
          },
        }
      );

      const result = await response.json();
      setLastSyncResult(result);

      if (response.ok && result.success) {
        toast.success(`Sincronización ${mode === 'full' ? 'completa' : 'incremental'} ejecutada correctamente`);
      } else {
        toast.error(result.error || 'Error al ejecutar sincronización');
      }

      fetchConfig();
    } catch (error: any) {
      toast.error('Error al ejecutar sincronización');
      setLastSyncResult({ error: error.message });
    } finally {
      setSyncing(false);
    }
  };

  if (!config) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Sincronización PetGestion</h1>
        <p className="text-muted-foreground">
          Controla la sincronización de productos y stock desde PetGestion
        </p>
      </div>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Estado de Conexión
          </CardTitle>
          <CardDescription>
            Configuración actual de la conexión con PetGestion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">URL de PetGestion</span>
                <Badge variant="outline" className="font-mono text-xs">
                  {config.petgestion_url?.replace('https://', '') || 'No configurada'}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Sucursal Principal</span>
                <Badge variant="secondary">
                  {config.default_branch_name || 'No configurada'}
                </Badge>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Última Sincronización</span>
                <span className="text-sm">
                  {config.last_sync_at ? (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle className="h-4 w-4" />
                      {formatDate(config.last_sync_at)}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-yellow-600">
                      <Clock className="h-4 w-4" />
                      Nunca
                    </span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Intervalo</span>
                <Badge variant="outline">
                  {config.sync_interval_minutes || 30} minutos
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sync Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Ejecutar Sincronización
          </CardTitle>
          <CardDescription>
            Sincroniza productos, precios y stock desde PetGestion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Sincronización Incremental</h3>
              <p className="text-sm text-gray-500">
                Solo sincroniza productos modificados desde la última sincronización.
                Más rápido, ideal para actualizaciones regulares.
              </p>
              <Button
                onClick={() => runSync('incremental')}
                disabled={syncing}
                variant="outline"
                className="w-full gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Sincronizando...' : 'Ejecutar Incremental'}
              </Button>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Sincronización Completa</h3>
              <p className="text-sm text-gray-500">
                Sincroniza todos los productos. Puede tardar varios minutos.
                Útil para re sincronizar toda la información.
              </p>
              <Button
                onClick={() => runSync('full')}
                disabled={syncing}
                className="w-full gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${syncing ? 'animate-spin' : ''}`} />
                {syncing ? 'Sincronizando...' : 'Ejecutar Completa'}
              </Button>
            </div>
          </div>

          {lastSyncResult && (
            <div className={`mt-4 p-4 rounded-lg ${lastSyncResult.error ? 'bg-red-50 border border-red-200' : 'bg-green-50 border border-green-200'}`}>
              <div className="flex items-start gap-3">
                {lastSyncResult.error ? (
                  <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-medium ${lastSyncResult.error ? 'text-red-800' : 'text-green-800'}`}>
                    {lastSyncResult.error ? 'Error en la sincronización' : 'Sincronización exitosa'}
                  </p>
                  <div className="mt-2 text-sm text-gray-600 space-y-1">
                    {lastSyncResult.products_synced !== undefined && (
                      <p>Productos sincronizados: {lastSyncResult.products_synced}</p>
                    )}
                    {lastSyncResult.stock_records !== undefined && (
                      <p>Registros de stock: {lastSyncResult.stock_records}</p>
                    )}
                    {lastSyncResult.products_with_stock !== undefined && (
                      <p>Productos con stock: {lastSyncResult.products_with_stock}</p>
                    )}
                    {lastSyncResult.error && (
                      <p className="text-red-600">Error: {lastSyncResult.error}</p>
                    )}
                    {lastSyncResult.message && !lastSyncResult.error && (
                      <p>{lastSyncResult.message}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Info */}
      <Card>
        <CardHeader>
          <CardTitle>Información</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• La sincronización automática se ejecuta cada {config.sync_interval_minutes || 30} minutos</li>
            <li>• El stock se suma de todas las sucursales de PetGestion</li>
            <li>• Los productos deshabilitados localmente mantienen su estado</li>
            <li>• Precios de venta y mayorista se sincronizan automáticamente</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}