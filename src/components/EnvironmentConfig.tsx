import React, { useState, useEffect } from 'react';
import {
  Settings,
  FlaskConical,
  Building2,
  RefreshCw,
  Save,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { supabase } from '../services/supabase';
import { createClient } from '@supabase/supabase-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from '@/components/ui/dialog';

interface EnvironmentConfig {
  id: string;
  environment: 'production' | 'test';
  supabase_url: string;
  supabase_anon_key: string;
  mercadopago_public_key: string;
  mercadopago_access_token: string;
  mercadopago_environment: 'production' | 'sandbox';
  cloudinary_cloud_name: string;
  cloudinary_upload_preset: string;
  cloudinary_api_key: string;
  firebase_api_key: string;
  firebase_project_id: string;
  google_client_id: string;
  updated_at: string;
}

interface EnvironmentConfigProps {
  onEnvironmentChange?: (environment: 'production' | 'test') => void;
}

export default function EnvironmentConfig({ onEnvironmentChange }: EnvironmentConfigProps) {
  const [currentEnvironment, setCurrentEnvironment] = useState<'production' | 'test'>('production');
  const [configs, setConfigs] = useState<Record<'production' | 'test', Partial<EnvironmentConfig>>>({
    production: {},
    test: {}
  });
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingEnv, setEditingEnv] = useState<'production' | 'test' | null>(null);
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});
  const [testingConnection, setTestingConnection] = useState<Record<string, boolean>>({});
  const [connectionStatus, setConnectionStatus] = useState<Record<string, 'success' | 'error' | null>>({});

  useEffect(() => {
    loadEnvironmentConfig();
  }, []);

  const loadEnvironmentConfig = async () => {
    setLoading(true);
    try {
      const { data: activeEnv, error: envError } = await supabase
        .from('app_settings')
        .select('value')
        .eq('key', 'environment')
        .single();

      if (!envError && activeEnv?.value) {
        setCurrentEnvironment(activeEnv.value as 'production' | 'test');
      }

      const { data, error } = await supabase
        .from('environment_configs')
        .select('*')
        .in('environment', ['production', 'test']);

      if (error) throw error;

      const configsMap: Record<'production' | 'test', Partial<EnvironmentConfig>> = {
        production: {},
        test: {}
      };

      data?.forEach(config => {
        configsMap[config.environment as 'production' | 'test'] = config as Partial<EnvironmentConfig>;
      });

      setConfigs(configsMap);
    } catch (_error) {
    } finally {
      setLoading(false);
    }
  };

  const handleEnvironmentToggle = async (checked: boolean) => {
    const newEnvironment = checked ? 'production' : 'test';

    try {
      const { error } = await supabase
        .from('app_settings')
        .upsert({ key: 'environment', value: newEnvironment, updated_at: new Date().toISOString() } as any);

      if (error) throw error;

      setCurrentEnvironment(newEnvironment);
      onEnvironmentChange?.(newEnvironment);
      await loadEnvironmentConfig();
    } catch (_error) {
    }
  };

  const handleEditConfig = (environment: 'production' | 'test') => {
    setEditingEnv(environment);
    setDialogOpen(true);
  };

  const handleSaveConfig = async () => {
    if (!editingEnv) return;

    setLoading(true);
    try {
      const configToSave = {
        ...configs[editingEnv],
        environment: editingEnv,
        updated_at: new Date().toISOString()
      };

      const { error } = await supabase
        .from('environment_configs')
        .upsert(configToSave as any);

      if (error) throw error;

      setDialogOpen(false);
      setEditingEnv(null);
      await loadEnvironmentConfig();
    } catch (_error) {
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async (service: string, environment: 'production' | 'test') => {
    const testKey = `${service}_${environment}`;
    setTestingConnection(prev => ({ ...prev, [testKey]: true }));
    setConnectionStatus(prev => ({ ...prev, [testKey]: null }));

    try {
      const config = configs[environment];
      let isValid = false;

      switch (service) {
        case 'supabase':
          if (config.supabase_url && config.supabase_anon_key) {
            const testClient = createClient(config.supabase_url, config.supabase_anon_key);
            const { error } = await testClient.from('profiles').select('id').limit(1);
            isValid = !error;
          }
          break;

        case 'mercadopago':
          if (config.mercadopago_access_token) {
            const response = await fetch('https://api.mercadopago.com/users/me', {
              headers: {
                'Authorization': `Bearer ${config.mercadopago_access_token}`
              }
            });
            isValid = response.ok;
          }
          break;

        case 'cloudinary':
          isValid = !!(config.cloudinary_cloud_name && config.cloudinary_api_key);
          break;
      }

      setConnectionStatus(prev => ({ ...prev, [testKey]: isValid ? 'success' : 'error' }));
    } catch (_error) {
      setConnectionStatus(prev => ({ ...prev, [testKey]: 'error' }));
    } finally {
      setTestingConnection(prev => ({ ...prev, [testKey]: false }));
    }
  };

  const updateConfig = (key: keyof EnvironmentConfig, value: string) => {
    if (!editingEnv) return;
    setConfigs(prev => ({
      ...prev,
      [editingEnv]: {
        ...prev[editingEnv],
        [key]: value
      }
    }));
  };

  const renderConfigField = (label: string, key: keyof EnvironmentConfig, isSecret = false) => (
    <div className="space-y-1.5">
      <Label htmlFor={key}>{label}</Label>
      <div className="relative">
        <Input
          id={key}
          value={editingEnv ? (configs[editingEnv]?.[key] as string || '') : ''}
          onChange={(e) => updateConfig(key, e.target.value)}
          type={isSecret && !showSecrets[key] ? 'password' : 'text'}
          className={isSecret ? 'pr-10' : ''}
        />
        {isSecret && (
          <button
            type="button"
            onClick={() => setShowSecrets(prev => ({ ...prev, [key]: !prev[key] }))}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showSecrets[key] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
    </div>
  );

  const renderConnectionBadge = (service: string, environment: 'production' | 'test') => {
    const testKey = `${service}_${environment}`;
    const isTesting = testingConnection[testKey];
    const status = connectionStatus[testKey];

    return (
      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
        status === 'success'
          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800'
          : status === 'error'
          ? 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800'
          : 'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700'
      }`}>
        {isTesting ? (
          <Loader2 className="w-3 h-3 animate-spin" />
        ) : status === 'success' ? (
          <CheckCircle2 className="w-3 h-3" />
        ) : status === 'error' ? (
          <AlertCircle className="w-3 h-3" />
        ) : null}
        {service.charAt(0).toUpperCase() + service.slice(1)}
      </div>
    );
  };

  const renderEnvironmentCard = (environment: 'production' | 'test') => {
    const config = configs[environment];
    const isActive = currentEnvironment === environment;
    const hasConfig = Object.keys(config).length > 1; // more than just `environment` key

    return (
      <div className="admin-card space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {environment === 'production'
              ? <Building2 className="w-5 h-5 text-emerald-600" />
              : <FlaskConical className="w-5 h-5 text-amber-600" />
            }
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">
              Ambiente {environment === 'production' ? 'Producción' : 'Prueba'}
            </h3>
            <Badge variant={isActive ? 'default' : 'secondary'}>
              {isActive ? 'Activo' : 'Inactivo'}
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                testConnection('supabase', environment);
                testConnection('mercadopago', environment);
                testConnection('cloudinary', environment);
              }}
              title="Probar conexiones"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleEditConfig(environment)}
              title="Editar configuración"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!hasConfig ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200 text-sm">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            No hay configuración guardada para este ambiente.
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Última actualización: {config.updated_at ? new Date(config.updated_at).toLocaleString() : '-'}
            </p>

            <div className="flex flex-wrap gap-2">
              {renderConnectionBadge('supabase', environment)}
              {renderConnectionBadge('mercadopago', environment)}
              {renderConnectionBadge('cloudinary', environment)}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Supabase:</span>{' '}
                <span className="text-gray-600 dark:text-gray-400">{config.supabase_url ? 'Configurado' : 'No configurado'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">MP Ambiente:</span>{' '}
                <span className="text-gray-600 dark:text-gray-400">{config.mercadopago_environment || 'No configurado'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Cloudinary:</span>{' '}
                <span className="text-gray-600 dark:text-gray-400">{config.cloudinary_cloud_name || 'No configurado'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Firebase:</span>{' '}
                <span className="text-gray-600 dark:text-gray-400">{config.firebase_project_id || 'No configurado'}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <div className="admin-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Configuración de Ambientes MercadoPago
          </h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Switch
                id="env-toggle"
                checked={currentEnvironment === 'production'}
                onCheckedChange={handleEnvironmentToggle}
              />
              <Label htmlFor="env-toggle" className="flex items-center gap-1.5 text-sm cursor-pointer">
                <span>Producción</span>
                <Badge variant={currentEnvironment === 'production' ? 'default' : 'secondary'}>
                  {currentEnvironment === 'production' ? 'PAGOS REALES' : 'PAGOS DE PRUEBA'}
                </Badge>
              </Label>
            </div>
            <Button variant="ghost" size="sm" onClick={loadEnvironmentConfig} disabled={loading} title="Recargar configuración">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Cómo funciona:</strong><br />
            • <strong>Producción</strong>: Pagos reales con dinero real (como siempre)<br />
            • <strong>Prueba</strong>: Pagos de prueba con dinero ficticio (sandbox)<br />
            • Cambiar el ambiente solo afecta a los NUEVOS pagos<br />
            • Las credenciales se guardan en EAS Secrets (seguro)
          </div>
        </div>

        <hr className="border-gray-200 dark:border-gray-700" />

        <div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Ambientes Configurados</h3>
          {loading && !dialogOpen ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-4">
              {renderEnvironmentCard('production')}
              {renderEnvironmentCard('test')}
            </div>
          )}
        </div>

        <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 text-amber-800 dark:bg-amber-950 dark:text-amber-200 text-sm">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div>
            <strong>Nota:</strong> Asegúrate de probar las conexiones después de cambiar las credenciales para verificar que todo funciona correctamente.
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              Editar Configuración - {editingEnv === 'production' ? 'Producción' : 'Prueba'}
            </DialogTitle>
            <DialogDescription>
              Modifica las credenciales y configuraciones del ambiente seleccionado.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {renderConfigField('URL de Supabase', 'supabase_url')}
            {renderConfigField('Clave Anónima de Supabase', 'supabase_anon_key', true)}
            {renderConfigField('Clave Pública de MercadoPago', 'mercadopago_public_key')}
            {renderConfigField('Token de Acceso de MercadoPago', 'mercadopago_access_token', true)}

            <div className="space-y-1.5">
              <Label htmlFor="mp_environment">Ambiente de MercadoPago</Label>
              <select
                id="mp_environment"
                value={editingEnv ? (configs[editingEnv]?.mercadopago_environment || 'production') : 'production'}
                onChange={(e) => updateConfig('mercadopago_environment', e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="production">Producción</option>
                <option value="sandbox">Prueba (Sandbox)</option>
              </select>
            </div>

            {renderConfigField('Cloud Name de Cloudinary', 'cloudinary_cloud_name')}
            {renderConfigField('Upload Preset de Cloudinary', 'cloudinary_upload_preset')}
            {renderConfigField('API Key de Cloudinary', 'cloudinary_api_key')}
            {renderConfigField('API Key de Firebase', 'firebase_api_key', true)}
            {renderConfigField('Project ID de Firebase', 'firebase_project_id')}
            {renderConfigField('Client ID de Google', 'google_client_id', true)}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button onClick={handleSaveConfig} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
