import React, { useState, useEffect } from 'react';
import { Gift, Loader2, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { appConfigService } from '@/services/supabase';
import toast from 'react-hot-toast';

const FreeTrialConfig: React.FC = () => {
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      setLoading(true);
      const config = await appConfigService.getByKey('free_trial_config');
      setEnabled(config.config_value?.enabled === true);
    } catch {
      setEnabled(false);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (checked: boolean) => {
    setEnabled(checked);
    setSaving(true);
    try {
      await appConfigService.updateConfig('free_trial_config', { enabled: checked });
      toast.success(checked ? 'Oferta 3 meses gratis activada' : 'Oferta 3 meses gratis desactivada');
    } catch {
      setEnabled(!checked);
      toast.error('Error al actualizar la configuración');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-purple-600" />
            Prueba Gratis de PetoClub+
          </CardTitle>
          <CardDescription>
            Controla la oferta de 3 meses gratis de PetoClub+ para nuevos usuarios
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="space-y-1">
              <Label className="text-base font-semibold text-purple-900">
                3 meses GRATIS de PetoClub+
              </Label>
              <p className="text-sm text-purple-700">
                {enabled
                  ? 'Los nuevos usuarios reciben 3 meses de Membresía Premium al registrarse'
                  : 'Los nuevos usuarios reciben la Membresía Gratuita estándar'
                }
              </p>
            </div>
            <div className="flex items-center gap-3">
              {saving && <Loader2 className="w-4 h-4 animate-spin text-purple-600" />}
              <Switch
                checked={enabled}
                onCheckedChange={handleToggle}
                disabled={saving}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Badge variant={enabled ? 'default' : 'secondary'} className="text-sm px-3 py-1">
              {enabled ? 'Activado' : 'Desactivado'}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={loadConfig}
              disabled={loading}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Recargar
            </Button>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <p className="text-sm text-amber-800">
              <strong>Nota:</strong> Este cambio solo afecta a los usuarios NUEVOS que se registren
              después de modificar esta configuración. Los usuarios existentes no se ven afectados.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeTrialConfig;
