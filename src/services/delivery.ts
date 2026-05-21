import { supabase } from './supabase';
import { getDistance, getBearing } from './geo';

const WAREHOUSE = { lat: -31.532863, lng: -68.59375 };
const EDGE_FUNCTION_URL = import.meta.env.VITE_SUPABASE_URL + '/functions/v1/send_notification';
const SERVICE_KEY = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY || '';

export interface DeliveryOrder {
  id: string;
  cliente_id: string;
  fecha_pedido: string;
  first_delivery_date: string;
  estado: string;
  total: number;
  direccion_envio: any;
  latitude: number | null;
  longitude: number | null;
  cliente_nombre?: string;
  cliente_email?: string;
  cliente_telefono?: string;
  items_count?: number;
  distance_from_prev?: number;
  cumulative_distance?: number;
  estimated_arrival?: string;
  productos?: OrderItem[];
}

export interface OrderItem {
  id: string;
  pedido_id: string;
  producto_id: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  product_name?: string;
  product_image?: string;
}

export interface OptimizedRoute {
  orders: DeliveryOrder[];
  totalDistance: number;
  estimatedDuration: string;
}

export async function getDeliveryOrders() {
  const { data, error } = await supabase
    .from('pedidos')
    .select(`
      *,
      clientes_tienda ( nombre, apellido, email, telefono )
    `)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .not('estado', 'in', '("cancelado","entregado")')
    .order('first_delivery_date', { ascending: true })
    .order('fecha_pedido', { ascending: true });

  if (error) throw error;

  return (data || []).map((o: any) => ({
    ...o,
    cliente_nombre: o.clientes_tienda
      ? `${o.clientes_tienda.nombre || ''} ${o.clientes_tienda.apellido || ''}`.trim() || 'N/A'
      : o.profiles?.full_name || 'N/A',
    cliente_email: o.clientes_tienda?.email || o.profiles?.email || 'N/A',
    cliente_telefono: o.clientes_tienda?.telefono || 'N/A',
  }));
}

export function optimizeRoute(orders: DeliveryOrder[]): OptimizedRoute {
  if (orders.length === 0) return { orders: [], totalDistance: 0, estimatedDuration: '' };

  const unvisited = [...orders];
  const route: DeliveryOrder[] = [];
  let current = WAREHOUSE;
  let totalDistance = 0;

  while (unvisited.length > 0) {
    let nearestIdx = 0;
    let nearestDist = Infinity;

    for (let i = 0; i < unvisited.length; i++) {
      const o = unvisited[i];
      if (o.latitude == null || o.longitude == null) continue;
      const d = getDistance(current.lat, current.lng, o.latitude, o.longitude);
      if (d < nearestDist) {
        nearestDist = d;
        nearestIdx = i;
      }
    }

    const order = unvisited.splice(nearestIdx, 1)[0];
    order.distance_from_prev = nearestDist;
    totalDistance += nearestDist;
    order.cumulative_distance = totalDistance;
    order.estimated_arrival = formatTimeFromMinutes(totalDistance / 30 * 60);

    route.push(order);
    if (order.latitude != null && order.longitude != null) {
      current = { lat: order.latitude, lng: order.longitude };
    }
  }

  const minutes = (totalDistance / 30) * 60;
  const hours = Math.floor(minutes / 60);
  const mins = Math.round(minutes % 60);

  return {
    orders: route,
    totalDistance,
    estimatedDuration: hours > 0 ? `${hours}h ${mins}min` : `${mins}min`,
  };
}

export function formatTimeFromMinutes(totalMinutes: number): string {
  const base = 9 * 60 + 30; // 9:30
  const total = base + totalMinutes;
  const h = Math.floor(total / 60);
  const m = Math.round(total % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}

export async function updateDeliveryStatus(orderId: string, estado: string) {
  const { error } = await supabase
    .from('pedidos')
    .update({ estado, fecha_actualizacion: new Date().toISOString() })
    .eq('id', orderId);
  if (error) throw error;

  // Enviar notificación al cliente según el estado
  if ((estado === 'en_camino' || estado === 'entregado') && SERVICE_KEY) {
    try {
      const { data: order } = await supabase
        .from('pedidos')
        .select('cliente_id')
        .eq('id', orderId)
        .single();

      if (order?.cliente_id) {
        const title = estado === 'en_camino'
          ? '🚚 Tu pedido está en camino'
          : '✅ Tu pedido fue entregado';
        const message = estado === 'en_camino'
          ? 'Tu pedido ya está en camino y pronto llegará a tu domicilio. Gracias por elegir PetoClub.'
          : 'Tu pedido fue entregado con éxito. Esperamos que disfrutes tus productos. Gracias por confiar en PetoClub.';

        await fetch(EDGE_FUNCTION_URL, {
          method: 'POST',
          headers: {
            'apikey': SERVICE_KEY,
            'Authorization': `Bearer ${SERVICE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: order.cliente_id,
            title,
            message,
            type: 'order_status_change',
            metadata: { order_id: orderId, status: estado },
          }),
        });
      }
    } catch (e) {
    }
  }
}

export async function getOrderItems(orderId: string): Promise<OrderItem[]> {
  const { data, error } = await supabase
    .from('pedidos_items')
    .select('*')
    .eq('pedido_id', orderId);

  if (error) throw error;
  return (data || []).map((i: any) => ({
    ...i,
    product_name: i.nombre_producto || 'Producto',
    product_image: null,
  }));
}

export async function rescheduleDelivery(orderId: string, newDate: string, customerName?: string) {
  // Obtener el pedido para conocer el cliente
  const { data: order } = await supabase
    .from('pedidos')
    .select('cliente_id')
    .eq('id', orderId)
    .single();

  // Actualizar la fecha
  const { error } = await supabase
    .from('pedidos')
    .update({ first_delivery_date: newDate, fecha_actualizacion: new Date().toISOString() })
    .eq('id', orderId);
  if (error) throw error;

  // Enviar notificación al cliente
  if (order?.cliente_id && SERVICE_KEY) {
    try {
      const fecha = new Date(newDate + 'T12:00:00').toLocaleDateString('es-AR', {
        weekday: 'long', day: 'numeric', month: 'long'
      });
      await fetch(EDGE_FUNCTION_URL, {
        method: 'POST',
        headers: {
          'apikey': SERVICE_KEY,
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: order.cliente_id,
          title: '📦 Tu pedido fue reprogramado',
          message: `Hola ${customerName || ''}, lamentamos informarte que tu entrega fue reprogramada para el ${fecha}. Pedimos disculpas por las molestias ocasionadas. Cualquier consulta contactate a Soporte.`,
          type: 'order_update',
          metadata: { order_id: orderId, type: 'rescheduled', new_date: newDate },
        }),
      });
    } catch (e) {
    }
  }
}
