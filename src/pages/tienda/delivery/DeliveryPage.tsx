import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Truck, Search, MapPin, Phone, User, Package, Calendar,
  Clock, ChevronDown, ChevronRight, RefreshCw, RotateCcw,
  CheckCircle, XCircle, Navigation,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/utils/formatters';
import {
  getDeliveryOrders, optimizeRoute, updateDeliveryStatus, rescheduleDelivery, getOrderItems,
  DeliveryOrder, OptimizedRoute, OrderItem,
} from '@/services/delivery';
import { formatDistance } from '@/services/geo';

const STATUS_FLOW: Record<string, { label: string; color: string; next: string[] }> = {
  pago_pendiente: { label: 'Pago Pendiente', color: 'yellow', next: ['pagado'] },
  pago_aprobado: { label: 'Pagado', color: 'blue', next: ['en_preparacion'] },
  en_preparacion: { label: 'En Preparación', color: 'purple', next: ['en_camino'] },
  en_camino: { label: 'En Camino', color: 'orange', next: ['entregado'] },
  entregado: { label: 'Entregado', color: 'green', next: [] },
  cancelado: { label: 'Cancelado', color: 'red', next: [] },
};

function getNextStatuses(current: string): string[] {
  return STATUS_FLOW[current]?.next || [];
}

function parseAddress(addr: any): { calle?: string; ciudad?: string; referencia?: string } {
  if (!addr) return {};
  if (typeof addr === 'string') { try { addr = JSON.parse(addr); } catch { return { calle: addr }; } }
  return {
    calle: [addr.calle, addr.numero].filter(Boolean).join(' ') || addr.address_1 || addr.direccion,
    ciudad: addr.ciudad || addr.city,
    referencia: addr.referencia || addr.address_2 || addr.reference,
  };
}

export function DeliveryPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('route');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [statusDialog, setStatusDialog] = useState<{ order: DeliveryOrder; nextStatus: string } | null>(null);
  const [rescheduleDialog, setRescheduleDialog] = useState<{ order: DeliveryOrder; date: string } | null>(null);
  const [orderItems, setOrderItems] = useState<Record<string, OrderItem[]>>({});
  const [loadingItems, setLoadingItems] = useState<Record<string, boolean>>({});

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ['delivery-orders'],
    queryFn: getDeliveryOrders,
    refetchInterval: 30000,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, estado }: { id: string; estado: string }) => updateDeliveryStatus(id, estado),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-orders'] });
      toast.success('Estado actualizado');
      setStatusDialog(null);
    },
    onError: (e: any) => toast.error(e.message || 'Error al actualizar'),
  });

  const rescheduleMutation = useMutation({
    mutationFn: ({ id, date, name }: { id: string; date: string; name?: string }) => rescheduleDelivery(id, date, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['delivery-orders'] });
      toast.success('Entrega reprogramada');
      setRescheduleDialog(null);
    },
    onError: (e: any) => toast.error(e.message || 'Error al reprogramar'),
  });

  const filtered = useMemo(() => {
    if (!search) return orders;
    const q = search.toLowerCase();
    return orders.filter((o: DeliveryOrder) =>
      o.cliente_nombre?.toLowerCase().includes(q) ||
      o.cliente_email?.toLowerCase().includes(q) ||
      o.id?.toLowerCase().includes(q) ||
      (o.direccion_envio && JSON.stringify(o.direccion_envio).toLowerCase().includes(q))
    );
  }, [orders, search]);

  const grouped = useMemo(() => {
    const groups: Record<string, DeliveryOrder[]> = {};
    filtered.forEach((o: DeliveryOrder) => {
      const date = o.first_delivery_date || 'sin-fecha';
      if (!groups[date]) groups[date] = [];
      groups[date].push(o);
    });
    return groups;
  }, [filtered]);

  const routeData = useMemo(() => {
    const withCoords = filtered.filter((o: DeliveryOrder) => o.latitude != null && o.longitude != null);
    return optimizeRoute(withCoords);
  }, [filtered]);

  const toggleExpand = async (id: string) => {
    if (expandedId === id) { setExpandedId(null); return; }
    setExpandedId(id);
    if (!orderItems[id]) {
      setLoadingItems(prev => ({ ...prev, [id]: true }));
      try {
        const items = await getOrderItems(id);
        setOrderItems(prev => ({ ...prev, [id]: items }));
      } catch (e) {
      } finally {
        setLoadingItems(prev => ({ ...prev, [id]: false }));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Truck className="h-8 w-8" /> Delivery
          </h1>
          <p className="text-gray-500 mt-1">Gestión de entregas y optimización de rutas</p>
        </div>
        <Button variant="outline" onClick={() => queryClient.invalidateQueries({ queryKey: ['delivery-orders'] })}>
          <RefreshCw className="h-4 w-4 mr-2" /> Actualizar
        </Button>
      </div>

      {routeData.orders.length > 0 && tab === 'route' && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="p-4 flex flex-wrap gap-6 items-center">
            <div className="flex items-center gap-2">
              <Navigation className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Ruta optimizada</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{routeData.orders.length}</span> paradas
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{formatDistance(routeData.totalDistance)}</span> total
            </div>
            <div className="text-sm text-gray-600">
              <Clock className="inline h-4 w-4 mr-1" />
              <span className="font-semibold">{routeData.estimatedDuration}</span>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={tab} onValueChange={setTab}>
        <TabsList>
          <TabsTrigger value="route">
            <Truck className="h-4 w-4 mr-2" /> Ruta
          </TabsTrigger>
          <TabsTrigger value="orders">
            <Package className="h-4 w-4 mr-2" /> Todos los pedidos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="route" className="space-y-4 mt-4">
          <div className="flex gap-3 items-center">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="text-sm">
              <span className="font-medium">Inicio:</span>{' '}
              <span className="text-gray-500">Depósito (-31.532863, -68.593750)</span>
            </div>
          </div>

          {routeData.orders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Truck className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hay pedidos con coordenadas GPS para ruteo</p>
            </div>
          ) : (
            <ol className="space-y-2">
              {routeData.orders.map((order, idx) => {
                const addr = parseAddress(order.direccion_envio);
                const status = STATUS_FLOW[order.estado] || { label: order.estado, color: 'gray', next: [] };
                const expanded = expandedId === order.id;
                return (
                  <li key={order.id} className="relative">
                    <div className="flex items-start gap-3">
                      <div className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white
                          ${idx === 0 ? 'bg-green-500' : 'bg-primary'}`}>
                          {idx + 1}
                        </div>
                        {idx < routeData.orders.length - 1 && (
                          <div className="w-0.5 h-full min-h-[20px] bg-gray-200" />
                        )}
                      </div>
                      <Card className="flex-1 cursor-pointer hover:shadow-md transition-shadow" onClick={() => toggleExpand(order.id)}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-semibold">{order.cliente_nombre || 'N/A'}</span>
                                <Badge variant={status.color as any} className="text-xs">{status.label}</Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{addr.calle || 'Sin dirección'}</p>
                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-gray-400">
                                <span>{formatDistance(order.distance_from_prev || 0)}</span>
                                <span>Acum: {formatDistance(order.cumulative_distance || 0)}</span>
                                <span>Llega ~{order.estimated_arrival}</span>
                              </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-semibold">{formatCurrency(order.total)}</div>
                              {expanded ? <ChevronDown className="h-4 w-4 text-gray-400 ml-auto mt-1" /> : <ChevronRight className="h-4 w-4 text-gray-400 ml-auto mt-1" />}
                            </div>
                          </div>
                          {expanded && (
                            <div className="mt-4 pt-4 border-t space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <LabelBlock label="Cliente" value={order.cliente_nombre} icon={<User className="h-3.5 w-3.5" />} />
                                  <LabelBlock label="Email" value={order.cliente_email} />
                                  <LabelBlock label="Teléfono" value={order.cliente_telefono} icon={<Phone className="h-3.5 w-3.5" />} />
                                  <LabelBlock label="Dirección" value={addr.calle} icon={<MapPin className="h-3.5 w-3.5" />} />
                                  <LabelBlock label="Ciudad" value={addr.ciudad} />
                                  {order.latitude != null && order.longitude != null ? (
  <div className="flex items-center gap-1.5 text-gray-600 mb-1">
    <MapPin className="h-3.5 w-3.5" />
    <span className="text-gray-400">Coordenadas:</span>
    <a
      href={`https://www.google.com/maps/dir/?api=1&destination=${order.latitude},${order.longitude}`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 hover:text-blue-800 underline underline-offset-2 text-sm font-medium"
    >
      Ver Mapa
    </a>
  </div>
) : <LabelBlock label="Coordenadas" value="No disponible" />}
                                </div>
                              </div>
                              {orderItems[order.id] && orderItems[order.id].length > 0 && (
                                <div className="border-t pt-3 mt-3">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Productos</h4>
                                  <div className="space-y-1.5">
                                    {orderItems[order.id].map((item) => (
                                      <div key={item.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 min-w-0">
                                          <span className="text-gray-400 font-mono text-xs w-6 text-right">{item.cantidad}x</span>
                                          <span className="truncate">{item.product_name || 'Producto'}</span>
                                        </div>
                                        <span className="text-gray-600 font-medium flex-shrink-0 ml-2">${Number(item.precio_unitario).toLocaleString('es-AR')}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {loadingItems[order.id] && <p className="text-xs text-gray-400 mt-2">Cargando productos...</p>}
                              <div className="flex flex-wrap gap-2 mt-2">
                                {getNextStatuses(order.estado).map((ns) => (
                                  <Button key={ns} size="sm" variant="outline"
                                    onClick={(e) => { e.stopPropagation(); setStatusDialog({ order, nextStatus: ns }); }}>
                                    {STATUS_FLOW[ns]?.label || ns}
                                  </Button>
                                ))}
                                <Button size="sm" variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50"
                                  onClick={(e) => { e.stopPropagation(); setRescheduleDialog({ order, date: order.first_delivery_date || '' }); }}>
                                  <Calendar className="h-3.5 w-3.5 mr-1" /> Reprogramar
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </li>
                );
              })}
            </ol>
          )}
        </TabsContent>

        <TabsContent value="orders" className="mt-4">
          <div className="mb-4">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Buscar por nombre, email o ID..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          {Object.entries(grouped).length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No hay pedidos pendientes de entrega</p>
            </div>
          ) : (
            Object.entries(grouped).map(([date, dateOrders]) => (
              <div key={date} className="mb-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {date === 'sin-fecha' ? 'Sin fecha asignada' : date}
                  <Badge variant="secondary" className="ml-2">{dateOrders.length}</Badge>
                </h3>
                <div className="space-y-2">
                  {(dateOrders as DeliveryOrder[]).map((order) => {
                    const addr = parseAddress(order.direccion_envio);
                    const status = STATUS_FLOW[order.estado] || { label: order.estado, color: 'gray', next: [] };
                    const expanded = expandedId === order.id;
                    return (
                      <Card key={order.id} className="cursor-pointer hover:shadow-sm transition-shadow" onClick={() => toggleExpand(order.id)}>
                        <CardContent className="p-4">
                              <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="font-medium">{order.cliente_nombre}</span>
                                <Badge variant={status.color as any} className="text-xs whitespace-nowrap">{status.label}</Badge>
                              </div>
                              <p className="text-sm text-gray-500 mt-0.5 truncate">{addr.calle || 'Sin dirección'}</p>
                              <p className="text-xs text-gray-400 mt-0.5 truncate">{order.cliente_email}</p>
                            </div>
                            <div className="text-right flex-shrink-0">
                              <div className="font-semibold">{formatCurrency(order.total)}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{new Date(order.fecha_pedido).toLocaleDateString('es-AR')}</div>
                            </div>
                          </div>
                          {expanded && (
                            <div className="mt-4 pt-4 border-t space-y-3">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                                <div>
                                  <LabelBlock label="Cliente" value={order.cliente_nombre} />
                                  <LabelBlock label="Email" value={order.cliente_email} />
                                  <LabelBlock label="Teléfono" value={order.cliente_telefono} icon={<Phone className="h-3.5 w-3.5" />} />
                                  <LabelBlock label="ID Pedido" value={order.id.slice(0, 8) + '...'} />
                                </div>
                                <div>
                                  <LabelBlock label="Dirección" value={addr.calle} />
                                  <LabelBlock label="Ciudad" value={addr.ciudad || 'N/A'} />
                                  <LabelBlock label="Total" value={formatCurrency(order.total)} />
                                  {order.latitude != null && order.longitude != null && (
                                    <div className="flex items-center gap-1.5 text-gray-600 mb-1">
                                      <MapPin className="h-3.5 w-3.5" />
                                      <a href={`https://www.google.com/maps/dir/?api=1&destination=${order.latitude},${order.longitude}`}
                                         target="_blank" rel="noopener noreferrer"
                                         className="text-blue-600 hover:text-blue-800 underline underline-offset-2 text-sm font-medium">Ver Mapa</a>
                                    </div>
                                  )}
                                </div>
                              </div>
                              {orderItems[order.id] && orderItems[order.id].length > 0 && (
                                <div className="border-t pt-3 mt-3">
                                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Productos</h4>
                                  <div className="space-y-1.5">
                                    {orderItems[order.id].map((item) => (
                                      <div key={item.id} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 min-w-0">
                                          <span className="text-gray-400 font-mono text-xs w-6 text-right">{item.cantidad}x</span>
                                          <span className="truncate">{item.product_name || 'Producto'}</span>
                                        </div>
                                        <span className="text-gray-600 font-medium flex-shrink-0 ml-2">${Number(item.precio_unitario).toLocaleString('es-AR')}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {loadingItems[order.id] && <p className="text-xs text-gray-400 mt-2">Cargando productos...</p>}
                              <div className="flex flex-wrap gap-2 mt-2">
                                {getNextStatuses(order.estado).map((ns) => (
                                  <Button key={ns} size="sm" variant="outline"
                                    onClick={(e) => { e.stopPropagation(); setStatusDialog({ order, nextStatus: ns }); }}>
                                    {STATUS_FLOW[ns]?.label || ns}
                                  </Button>
                                ))}
                                <Button size="sm" variant="outline" className="text-amber-600 border-amber-300 hover:bg-amber-50"
                                  onClick={(e) => { e.stopPropagation(); setRescheduleDialog({ order, date: order.first_delivery_date || '' }); }}>
                                  <Calendar className="h-3.5 w-3.5 mr-1" /> Reprogramar
                                </Button>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!statusDialog} onOpenChange={() => setStatusDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cambiar estado del pedido</DialogTitle>
          </DialogHeader>
          {statusDialog && (
            <div className="py-4">
              <p className="text-sm text-gray-600 mb-2">
                Cliente: <span className="font-medium">{statusDialog.order.cliente_nombre}</span>
              </p>
              <p className="text-sm text-gray-600 mb-4">
                De <Badge>{(STATUS_FLOW[statusDialog.order.estado]?.label) || statusDialog.order.estado}</Badge>
                {' → '}
                <Badge>{(STATUS_FLOW[statusDialog.nextStatus]?.label) || statusDialog.nextStatus}</Badge>
              </p>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setStatusDialog(null)}>Cancelar</Button>
            <Button onClick={() => statusDialog && statusMutation.mutate({ id: statusDialog.order.id, estado: statusDialog.nextStatus })} disabled={statusMutation.isPending}>
              {statusMutation.isPending ? 'Actualizando...' : 'Confirmar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!rescheduleDialog} onOpenChange={() => setRescheduleDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reprogramar entrega</DialogTitle>
          </DialogHeader>
          {rescheduleDialog && (
            <div className="py-4 space-y-4">
              <p className="text-sm text-gray-600">
                Cliente: <span className="font-medium">{rescheduleDialog.order.cliente_nombre}</span>
              </p>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Nueva fecha de entrega</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  value={rescheduleDialog.date}
                  onChange={(e) => setRescheduleDialog({ ...rescheduleDialog, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          )}
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setRescheduleDialog(null)}>Cancelar</Button>
            <Button
              onClick={() => rescheduleDialog && rescheduleMutation.mutate({ id: rescheduleDialog.order.id, date: rescheduleDialog.date, name: rescheduleDialog.order.cliente_nombre })}
              disabled={rescheduleMutation.isPending || !rescheduleDialog?.date}
            >
              {rescheduleMutation.isPending ? 'Guardando...' : 'Reprogramar'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LabelBlock({ label, value, icon }: { label: string; value?: string; icon?: React.ReactNode }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-1.5 text-gray-600 mb-1">
      {icon}
      <span className="text-gray-400">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
