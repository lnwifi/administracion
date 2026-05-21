import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  MoreHorizontal,
  Search,
  Plus,
  Edit,
  Trash2,
  Truck,
  MapPin,
  DollarSign,
  Package,
  Check,
  X,
} from 'lucide-react';
import { shippingConfigService } from '@/services/supabase';
import { formatDate } from '@/utils/formatters';
import toast from 'react-hot-toast';

interface ShippingConfigFormData {
  city: string;
  province: string;
  base_price: string;
  price_per_km: string;
  free_distance_km: string;
  max_distance_km: string;
  depot_lat: string;
  depot_lng: string;
  is_active: boolean;
  free_shipping_enabled: boolean;
  free_shipping_min_amount: string;
}

export function ShippingConfigPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<any>(null);
  const [formData, setFormData] = useState<ShippingConfigFormData>({
    city: '',
    province: 'San Juan',
    base_price: '1000',
    price_per_km: '100',
    free_distance_km: '5',
    max_distance_km: '',
    depot_lat: '-31.5375',
    depot_lng: '-68.5364',
    is_active: true,
    free_shipping_enabled: false,
    free_shipping_min_amount: '',
  });

  const queryClient = useQueryClient();

  // Queries
  const { data: shippingConfigs, isLoading } = useQuery({
    queryKey: ['shipping-config'],
    queryFn: shippingConfigService.getAll,
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: (config: any) => shippingConfigService.create(config),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-config'] });
      setIsCreateDialogOpen(false);
      resetForm();
      toast.success('Configuración de envío creada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al crear configuración');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      shippingConfigService.update(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-config'] });
      setIsEditDialogOpen(false);
      setSelectedConfig(null);
      toast.success('Configuración de envío actualizada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al actualizar configuración');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: shippingConfigService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-config'] });
      toast.success('Configuración de envío eliminada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al eliminar configuración');
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, isActive }: { id: string; isActive: boolean }) =>
      shippingConfigService.toggleActive(id, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['shipping-config'] });
      toast.success('Estado de la configuración actualizado');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Error al actualizar estado');
    },
  });

  const resetForm = () => {
    setFormData({
      city: '',
      province: 'San Juan',
      base_price: '1000',
      price_per_km: '100',
      free_distance_km: '5',
      max_distance_km: '',
      depot_lat: '-31.5375',
      depot_lng: '-68.5364',
      is_active: true,
      free_shipping_enabled: false,
      free_shipping_min_amount: '',
    });
  };

  const handleCreateConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.city) {
      toast.error('Por favor completa el nombre de la ciudad');
      return;
    }

    const depot_coordinates = (formData.depot_lat && formData.depot_lng)
      ? { lat: parseFloat(formData.depot_lat), lng: parseFloat(formData.depot_lng) }
      : null;

    const configData = {
      city: formData.city,
      province: formData.province,
      base_price: parseFloat(formData.base_price),
      price_per_km: parseFloat(formData.price_per_km),
      free_distance_km: parseFloat(formData.free_distance_km),
      max_distance_km: formData.max_distance_km ? parseFloat(formData.max_distance_km) : null,
      depot_coordinates,
      is_active: formData.is_active,
      free_shipping_enabled: formData.free_shipping_enabled,
      free_shipping_min_amount: formData.free_shipping_min_amount ? parseFloat(formData.free_shipping_min_amount) : null,
    };

    createMutation.mutate(configData);
  };

  const handleEditConfig = (config: any) => {
    setSelectedConfig(config);
    setFormData({
      city: config.city,
      province: config.province,
      base_price: config.base_price?.toString() || '1000',
      price_per_km: config.price_per_km?.toString() || '100',
      free_distance_km: config.free_distance_km?.toString() || '5',
      max_distance_km: config.max_distance_km?.toString() || '',
      depot_lat: config.depot_coordinates?.lat?.toString() || '-31.5375',
      depot_lng: config.depot_coordinates?.lng?.toString() || '-68.5364',
      is_active: config.is_active,
      free_shipping_enabled: config.free_shipping_enabled || false,
      free_shipping_min_amount: config.free_shipping_min_amount?.toString() || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedConfig || !formData.city) {
      toast.error('Por favor completa el nombre de la ciudad');
      return;
    }

    const depot_coordinates = (formData.depot_lat && formData.depot_lng)
      ? { lat: parseFloat(formData.depot_lat), lng: parseFloat(formData.depot_lng) }
      : null;

    const configData = {
      city: formData.city,
      province: formData.province,
      base_price: parseFloat(formData.base_price),
      price_per_km: parseFloat(formData.price_per_km),
      free_distance_km: parseFloat(formData.free_distance_km),
      max_distance_km: formData.max_distance_km ? parseFloat(formData.max_distance_km) : null,
      depot_coordinates,
      is_active: formData.is_active,
      free_shipping_enabled: formData.free_shipping_enabled,
      free_shipping_min_amount: formData.free_shipping_min_amount ? parseFloat(formData.free_shipping_min_amount) : null,
    };

    updateMutation.mutate({
      id: selectedConfig.id,
      updates: configData,
    });
  };

  const handleDeleteConfig = (configId: string) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta configuración de envío?')) {
      deleteMutation.mutate(configId);
    }
  };

  const handleToggleActive = (config: any) => {
    toggleActiveMutation.mutate({
      id: config.id,
      isActive: !config.is_active,
    });
  };

  const filteredConfigs = shippingConfigs?.filter(config =>
    config.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    config.province?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Estadísticas
  const activeConfigs = shippingConfigs?.filter(c => c.is_active).length || 0;
  const freeShippingEnabled = shippingConfigs?.filter(c => c.free_shipping_enabled).length || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            Configuración de Envíos
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Administra las zonas de envío y tarifas
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Zonas Activas
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {activeConfigs}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-green-500">
              <MapPin className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Con Envío Gratis
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {freeShippingEnabled}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-blue-500">
              <Truck className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total de Zonas
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {shippingConfigs?.length || 0}
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-500">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar ciudades..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 w-64"
            />
          </div>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 sm:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Nueva Zona de Envío
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[95vh] overflow-y-auto">
            <DialogHeader className="space-y-2 sm:space-y-0">
              <DialogTitle className="text-xl sm:text-2xl">Nueva Zona de Envío</DialogTitle>
              <DialogDescription className="text-sm sm:text-base">
                Configura una nueva zona de envío con sus tarifas.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleCreateConfig}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="city" className="text-right sm:mt-2.5">
                    Ciudad *
                  </Label>
                  <div className="col-span-1">
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ej: Capital"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="province" className="text-right sm:mt-2.5">
                    Provincia *
                  </Label>
                  <div className="col-span-1">
                    <Input
                      id="province"
                      value={formData.province}
                      onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                      placeholder="Ej: San Juan"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="base_price" className="text-right sm:mt-2.5">
                    Precio Base *
                  </Label>
                  <div className="col-span-1">
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="base_price"
                        type="number"
                        step="0.01"
                        value={formData.base_price}
                        onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="price_per_km" className="text-right sm:mt-2.5">
                    Precio por KM *
                  </Label>
                  <div className="col-span-1">
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="price_per_km"
                        type="number"
                        step="0.01"
                        value={formData.price_per_km}
                        onChange={(e) => setFormData({ ...formData, price_per_km: e.target.value })}
                        className="pl-8"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="free_distance_km" className="text-right sm:mt-2.5">
                    KM Gratis *
                  </Label>
                  <div className="col-span-1">
                    <Input
                      id="free_distance_km"
                      type="number"
                      step="0.1"
                      value={formData.free_distance_km}
                      onChange={(e) => setFormData({ ...formData, free_distance_km: e.target.value })}
                      placeholder="Kilómetros sin costo adicional"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="max_distance_km" className="text-right sm:mt-2.5">
                    Distancia Máx
                  </Label>
                  <div className="col-span-1">
                    <Input
                      id="max_distance_km"
                      type="number"
                      step="0.1"
                      value={formData.max_distance_km}
                      onChange={(e) => setFormData({ ...formData, max_distance_km: e.target.value })}
                      placeholder="Dejar vacío para sin límite"
                    />
                  </div>
                </div>

                <div className="col-span-2 pt-2 border-t">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Coordenadas del Depósito</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="depot_lat" className="text-right sm:mt-2.5">
                    Latitud
                  </Label>
                  <div className="col-span-1">
                    <Input
                      id="depot_lat"
                      type="number"
                      step="0.000001"
                      value={formData.depot_lat}
                      onChange={(e) => setFormData({ ...formData, depot_lat: e.target.value })}
                      placeholder="-31.5375"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="depot_lng" className="text-right sm:mt-2.5">
                    Longitud
                  </Label>
                  <div className="col-span-1">
                    <Input
                      id="depot_lng"
                      type="number"
                      step="0.000001"
                      value={formData.depot_lng}
                      onChange={(e) => setFormData({ ...formData, depot_lng: e.target.value })}
                      placeholder="-68.5364"
                    />
                  </div>
                </div>

                <div className="col-span-2 pt-2 border-t">
                  <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Envío Gratuito</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="free_shipping_enabled" className="text-right sm:mt-2.5">
                    Habilitar Envío Gratis
                  </Label>
                  <div className="col-span-1 flex items-center space-x-2">
                    <Switch
                      id="free_shipping_enabled"
                      checked={formData.free_shipping_enabled}
                      onCheckedChange={(checked) => setFormData({ ...formData, free_shipping_enabled: checked })}
                    />
                    <Label htmlFor="free_shipping_enabled" className="text-sm">
                      Activar envío gratis por monto mínimo
                    </Label>
                  </div>
                </div>

                {formData.free_shipping_enabled && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                    <Label htmlFor="free_shipping_min_amount" className="text-right sm:mt-2.5">
                      Monto Mínimo *
                    </Label>
                    <div className="col-span-1">
                      <div className="relative">
                        <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                        <Input
                          id="free_shipping_min_amount"
                          type="number"
                          step="0.01"
                          value={formData.free_shipping_min_amount}
                          onChange={(e) => setFormData({ ...formData, free_shipping_min_amount: e.target.value })}
                          className="pl-8"
                          placeholder="Monto mínimo para envío gratis"
                          required={formData.free_shipping_enabled}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="is_active" className="text-right sm:mt-2.5">
                    Activa
                  </Label>
                  <div className="col-span-1 flex items-center space-x-2">
                    <Switch
                      id="is_active"
                      checked={formData.is_active}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                    />
                    <Label htmlFor="is_active">La zona está disponible para envíos</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={createMutation.isPending}>
                  {createMutation.isPending ? 'Creando...' : 'Crear Zona'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Shipping Config Table */}
      <div className="admin-card">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ciudad</TableHead>
                <TableHead>Precio Base</TableHead>
                <TableHead>Precio/KM</TableHead>
                <TableHead>KM Gratis</TableHead>
                <TableHead>Envío Gratis</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredConfigs.map((config) => (
                <TableRow key={config.id}>
                  <TableCell>
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                        {config.city}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {config.province}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm font-medium">
                      ${config.base_price?.toLocaleString('es-AR')}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      ${config.price_per_km?.toLocaleString('es-AR')}/km
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {config.free_distance_km} km
                    </span>
                  </TableCell>
                  <TableCell>
                    {config.free_shipping_enabled ? (
                      <div className="flex items-center">
                        <Check className="w-4 h-4 text-green-500 mr-1" />
                        <span className="text-sm">
                          ${config.free_shipping_min_amount?.toLocaleString('es-AR')}+
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <X className="w-4 h-4 text-gray-400 mr-1" />
                        <span className="text-sm text-gray-400">No</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      config.is_active
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }`}>
                      {config.is_active ? 'Activa' : 'Inactiva'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menú</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleEditConfig(config)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleToggleActive(config)}
                        >
                          {config.is_active ? (
                            <>
                              <X className="mr-2 h-4 w-4" />
                              Desactivar
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Activar
                            </>
                          )}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteConfig(config.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {filteredConfigs.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              {searchTerm ? 'No se encontraron zonas que coincidan con la búsqueda' : 'No hay zonas de envío configuradas'}
            </div>
          )}
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-[95vw] sm:max-w-[500px] max-h-[95vh] overflow-y-auto">
          <DialogHeader className="space-y-2 sm:space-y-0">
            <DialogTitle className="text-xl sm:text-2xl">Editar Zona de Envío</DialogTitle>
            <DialogDescription className="text-sm sm:text-base">
              Modifica la configuración de envío seleccionada.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUpdateConfig}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_city" className="text-right sm:mt-2.5">
                  Ciudad *
                </Label>
                <div className="col-span-1">
                  <Input
                    id="edit_city"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ej: Capital"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_province" className="text-right sm:mt-2.5">
                  Provincia *
                </Label>
                <div className="col-span-1">
                  <Input
                    id="edit_province"
                    value={formData.province}
                    onChange={(e) => setFormData({ ...formData, province: e.target.value })}
                    placeholder="Ej: San Juan"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_base_price" className="text-right sm:mt-2.5">
                  Precio Base *
                </Label>
                <div className="col-span-1">
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="edit_base_price"
                      type="number"
                      step="0.01"
                      value={formData.base_price}
                      onChange={(e) => setFormData({ ...formData, base_price: e.target.value })}
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_price_per_km" className="text-right sm:mt-2.5">
                  Precio por KM *
                </Label>
                <div className="col-span-1">
                  <div className="relative">
                    <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      id="edit_price_per_km"
                      type="number"
                      step="0.01"
                      value={formData.price_per_km}
                      onChange={(e) => setFormData({ ...formData, price_per_km: e.target.value })}
                      className="pl-8"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_free_distance_km" className="text-right sm:mt-2.5">
                  KM Gratis *
                </Label>
                <div className="col-span-1">
                  <Input
                    id="edit_free_distance_km"
                    type="number"
                    step="0.1"
                    value={formData.free_distance_km}
                    onChange={(e) => setFormData({ ...formData, free_distance_km: e.target.value })}
                    placeholder="Kilómetros sin costo adicional"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_max_distance_km" className="text-right sm:mt-2.5">
                  Distancia Máx
                </Label>
                <div className="col-span-1">
                  <Input
                    id="edit_max_distance_km"
                    type="number"
                    step="0.1"
                    value={formData.max_distance_km}
                    onChange={(e) => setFormData({ ...formData, max_distance_km: e.target.value })}
                    placeholder="Dejar vacío para sin límite"
                  />
                </div>
              </div>

              <div className="col-span-2 pt-2 border-t">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Coordenadas del Depósito</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_depot_lat" className="text-right sm:mt-2.5">
                  Latitud
                </Label>
                <div className="col-span-1">
                  <Input
                    id="edit_depot_lat"
                    type="number"
                    step="0.000001"
                    value={formData.depot_lat}
                    onChange={(e) => setFormData({ ...formData, depot_lat: e.target.value })}
                    placeholder="-31.5375"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_depot_lng" className="text-right sm:mt-2.5">
                  Longitud
                </Label>
                <div className="col-span-1">
                  <Input
                    id="edit_depot_lng"
                    type="number"
                    step="0.000001"
                    value={formData.depot_lng}
                    onChange={(e) => setFormData({ ...formData, depot_lng: e.target.value })}
                    placeholder="-68.5364"
                  />
                </div>
              </div>

              <div className="col-span-2 pt-2 border-t">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Envío Gratuito</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_free_shipping_enabled" className="text-right sm:mt-2.5">
                  Habilitar Envío Gratis
                </Label>
                <div className="col-span-1 flex items-center space-x-2">
                  <Switch
                    id="edit_free_shipping_enabled"
                    checked={formData.free_shipping_enabled}
                    onCheckedChange={(checked) => setFormData({ ...formData, free_shipping_enabled: checked })}
                  />
                  <Label htmlFor="edit_free_shipping_enabled" className="text-sm">
                    Activar envío gratis por monto mínimo
                  </Label>
                </div>
              </div>

              {formData.free_shipping_enabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                  <Label htmlFor="edit_free_shipping_min_amount" className="text-right sm:mt-2.5">
                    Monto Mínimo *
                  </Label>
                  <div className="col-span-1">
                    <div className="relative">
                      <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                      <Input
                        id="edit_free_shipping_min_amount"
                        type="number"
                        step="0.01"
                        value={formData.free_shipping_min_amount}
                        onChange={(e) => setFormData({ ...formData, free_shipping_min_amount: e.target.value })}
                        className="pl-8"
                        placeholder="Monto mínimo para envío gratis"
                        required={formData.free_shipping_enabled}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-2 sm:gap-4">
                <Label htmlFor="edit_is_active" className="text-right sm:mt-2.5">
                  Activa
                </Label>
                <div className="col-span-1 flex items-center space-x-2">
                  <Switch
                    id="edit_is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                  />
                  <Label htmlFor="edit_is_active">La zona está disponible para envíos</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={updateMutation.isPending}>
                {updateMutation.isPending ? 'Actualizando...' : 'Actualizar Zona'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
