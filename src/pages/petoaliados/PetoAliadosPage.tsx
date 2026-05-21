import { useState } from 'react';
import { supabase } from '@/services/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, Phone, Mail, MessageSquare, CheckCircle, XCircle, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface Request {
  id: string;
  business_name: string;
  category: string;
  description: string;
  address: string;
  phone: string;
  whatsapp: string | null;
  email: string | null;
  instagram: string | null;
  facebook: string | null;
  website: string | null;
  schedule: any;
  has_parking: boolean;
  accepts_credit_card: boolean;
  pet_friendly: boolean;
  source: string;
  status: string;
  created_at: string;
}

const CATEGORY_LABELS: Record<string, string> = {
  veterinaria: 'Veterinaria',
  tienda: 'Tienda de mascotas',
  pet_shop: 'Pet Shop',
  guarderia: 'Guardería',
  estetica: 'Estética canina',
  spa: 'Spa para mascotas',
  entrenamiento: 'Entrenamiento',
  hotel: 'Hotel pet-friendly',
  cafeteria: 'Cafetería pet-friendly',
  refugio: 'Refugio / Protectora',
  otro: 'Otro',
};

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  approved: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  contacted: 'bg-blue-100 text-blue-800',
};

export default function PetoAliadosPage() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const pageSize = 10;

  const fetchRequests = async (status: string = 'all', pageNum: number = 1) => {
    setLoading(true);
    try {
      let query = supabase
        .from('petoaliados_requests')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range((pageNum - 1) * pageSize, pageNum * pageSize - 1);

      if (status !== 'all') {
        query = query.eq('status', status);
      }

      const { data, error, count } = await query;

      if (error) throw error;
      setRequests(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      toast.error('Error al cargar las solicitudes');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('petoaliados_requests')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', id);

      if (error) throw error;

      toast.success('Estado actualizado');
      setSelectedRequest(null);
      fetchRequests(statusFilter, page);
    } catch (error) {
      toast.error('Error al actualizar el estado');
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado`);
  };

  const openWhatsApp = (phone: string) => {
    const cleanPhone = phone.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanPhone}`, '_blank');
  };

  const openEmail = (email: string) => {
    window.open(`mailto:${email}`, '_blank');
  };

  const getCategoryLabel = (category: string) => {
    return CATEGORY_LABELS[category] || category;
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Solicitudes PetoAliados</h1>
        <p className="text-gray-500">Gestiona las solicitudes de negocios que quieren unirse a la red</p>
      </div>

      <Tabs defaultValue="all" onValueChange={(v) => { setStatusFilter(v); setPage(1); fetchRequests(v, 1); }}>
        <TabsList>
          <TabsTrigger value="all">Todas</TabsTrigger>
          <TabsTrigger value="pending">Pendientes</TabsTrigger>
          <TabsTrigger value="contacted">Contactados</TabsTrigger>
          <TabsTrigger value="approved">Aprobados</TabsTrigger>
          <TabsTrigger value="rejected">Rechazados</TabsTrigger>
        </TabsList>

        <TabsContent value={statusFilter} className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Solicitudes ({totalCount})</CardTitle>
                <Button onClick={() => fetchRequests(statusFilter, page)} variant="outline">
                  Actualizar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              ) : requests.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No hay solicitudes {statusFilter !== 'all' ? `con estado "${statusFilter}"` : ''}
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Categoría</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Fecha</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {requests.map((request) => (
                        <TableRow key={request.id}>
                          <TableCell className="font-medium">{request.business_name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{getCategoryLabel(request.category)}</Badge>
                          </TableCell>
                          <TableCell>{request.phone}</TableCell>
                          <TableCell>
                            {new Date(request.created_at).toLocaleDateString('es-AR')}
                          </TableCell>
                          <TableCell>
                            <Badge className={STATUS_COLORS[request.status] || ''}>
                              {request.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setSelectedRequest(request)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-sm text-gray-500">
                        Mostrando {(page - 1) * pageSize + 1} - {Math.min(page * pageSize, totalCount)} de {totalCount}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newPage = page - 1;
                            setPage(newPage);
                            fetchRequests(statusFilter, newPage);
                          }}
                          disabled={page === 1}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="flex items-center px-3">
                          Página {page} de {totalPages}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newPage = page + 1;
                            setPage(newPage);
                            fetchRequests(statusFilter, newPage);
                          }}
                          disabled={page === totalPages}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de detalle */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">{selectedRequest.business_name}</h2>
                  <Badge className={`mt-2 ${STATUS_COLORS[selectedRequest.status]}`}>
                    {selectedRequest.status}
                  </Badge>
                </div>
                <Button variant="ghost" onClick={() => setSelectedRequest(null)}>
                  ✕
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Información de contacto */}
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Phone className="w-4 h-4" /> Información de contacto
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{selectedRequest.phone}</p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(selectedRequest.phone, 'Teléfono')}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  {selectedRequest.whatsapp && (
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{selectedRequest.whatsapp}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openWhatsApp(selectedRequest.whatsapp!)}
                        >
                          <MessageSquare className="w-4 h-4 text-green-600" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {selectedRequest.email && (
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{selectedRequest.email}</p>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => openEmail(selectedRequest.email!)}
                        >
                          <Mail className="w-4 h-4 text-blue-600" />
                        </Button>
                      </div>
                    </div>
                  )}
                  {selectedRequest.instagram && (
                    <div>
                      <p className="text-sm text-gray-500">Instagram</p>
                      <p className="font-medium">{selectedRequest.instagram}</p>
                    </div>
                  )}
                  {selectedRequest.website && (
                    <div>
                      <p className="text-sm text-gray-500">Sitio web</p>
                      <p className="font-medium">{selectedRequest.website}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Ubicación */}
              <div>
                <h3 className="font-semibold mb-3">Dirección</h3>
                <p>{selectedRequest.address}</p>
              </div>

              {/* Categoría y descripción */}
              <div>
                <h3 className="font-semibold mb-3">Categoría</h3>
                <Badge>{getCategoryLabel(selectedRequest.category)}</Badge>
                {selectedRequest.description && (
                  <div className="mt-4">
                    <h4 className="font-medium mb-2">Descripción</h4>
                    <p className="text-gray-600">{selectedRequest.description}</p>
                  </div>
                )}
              </div>

              {/* Beneficios */}
              <div>
                <h3 className="font-semibold mb-3">Beneficios</h3>
                <div className="flex gap-4">
                  <span className={selectedRequest.pet_friendly ? 'text-green-600' : 'text-gray-400'}>
                    {selectedRequest.pet_friendly ? '✓' : '✗'} Pet-friendly
                  </span>
                  <span className={selectedRequest.accepts_credit_card ? 'text-green-600' : 'text-gray-400'}>
                    {selectedRequest.accepts_credit_card ? '✓' : '✗'} Acepta tarjetas
                  </span>
                  <span className={selectedRequest.has_parking ? 'text-green-600' : 'text-gray-400'}>
                    {selectedRequest.has_parking ? '✓' : '✗'} Estacionamiento
                  </span>
                </div>
              </div>

              {/* Acciones */}
              <div className="flex gap-4 pt-4 border-t">
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => updateStatus(selectedRequest.id, 'approved')}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Aprobar
                </Button>
                <Button
                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                  onClick={() => updateStatus(selectedRequest.id, 'contacted')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contactado
                </Button>
                <Button
                  className="flex-1 bg-red-600 hover:bg-red-700"
                  onClick={() => updateStatus(selectedRequest.id, 'rejected')}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Rechazar
                </Button>
              </div>

              <Button
                className="w-full"
                variant="outline"
                onClick={() => openWhatsApp(selectedRequest.whatsapp || selectedRequest.phone)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Contactar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}