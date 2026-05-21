import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { placesService, couponsService, profilesService } from '@/services/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import {
  ArrowLeft, Store, Tag, QrCode, Plus, Edit, Trash2, CheckCircle, XCircle,
  Clock, Calendar, MapPin, Phone, Globe, Star, RefreshCw, Search, User,
  Check, AlertTriangle, BarChart3, CreditCard, Save, ExternalLink, Percent,
  DollarSign, Gift, FileText,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { formatDate, formatDateTime } from '@/utils/formatters';

const categoryLabels: Record<string, string> = {
  veterinaria: 'Veterinaria', tienda: 'Tienda', guarderia: 'Guardería',
  spa: 'Spa/Estética', entrenamiento: 'Entrenamiento', refugio: 'Refugio',
  cafeteria: 'Cafetería', hotel: 'Hotel para mascotas', casa_cuna: 'Casa de cuna', otro: 'Otro',
};

export function OwnerPlacePanel() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Coupon modal state
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<any>(null);
  const [couponForm, setCouponForm] = useState({
    title: '', description: '', benefitType: 'pct', discount_percentage: '',
    discount_amount: '', benefit_label: '', valid_until: '', is_active: true,
  });

  // Validation state
  const [validationCode, setValidationCode] = useState('');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [validating, setValidating] = useState(false);

  // Settings form
  const [settingsForm, setSettingsForm] = useState<any>(null);

  // Queries
  const { data: place, isLoading } = useQuery({
    queryKey: ['place', id],
    queryFn: () => placesService.getById(id!),
    enabled: !!id,
  });

  const { data: coupons, isLoading: loadingCoupons } = useQuery({
    queryKey: ['place-coupons', id],
    queryFn: () => couponsService.getByPlaceId(id!),
    enabled: !!id,
  });

  const { data: redemptions, isLoading: loadingRedemptions } = useQuery({
    queryKey: ['place-redemptions', id],
    queryFn: () => couponsService.getRedemptionsByPlace(id!),
    enabled: !!id,
  });

  const { data: profiles } = useQuery({
    queryKey: ['profiles-by-ids', redemptions],
    queryFn: () => {
      const ids = [...new Set(redemptions.map(r => r.user_id))];
      return profilesService.getByIds(ids);
    },
    enabled: !!redemptions && redemptions.length > 0,
  });

  const profileMap = new Map(profiles?.map(p => [p.user_id, p.full_name || p.email]) || []);

  // Mutations
  const createCoupon = useMutation({
    mutationFn: (data: any) => couponsService.create({ ...data, place_id: id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place-coupons', id] });
      closeCouponModal();
      toast.success('Cupón creado exitosamente');
    },
    onError: (e: any) => toast.error(e.message || 'Error al crear cupón'),
  });

  const updateCoupon = useMutation({
    mutationFn: ({ id: cid, ...data }: any) => couponsService.update(cid, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place-coupons', id] });
      closeCouponModal();
      toast.success('Cupón actualizado');
    },
    onError: (e: any) => toast.error(e.message || 'Error al actualizar cupón'),
  });

  const deleteCoupon = useMutation({
    mutationFn: (cid: string) => couponsService.delete(cid),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place-coupons', id] });
      toast.success('Cupón eliminado');
    },
    onError: (e: any) => toast.error(e.message || 'Error al eliminar cupón'),
  });

  const updatePlace = useMutation({
    mutationFn: (data: any) => placesService.update(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['place', id] });
      toast.success('Local actualizado');
    },
    onError: (e: any) => toast.error(e.message || 'Error al actualizar local'),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  if (!place) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" onClick={() => navigate('/lugares')}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver a Lugares
        </Button>
        <div className="text-center py-12 text-gray-500">Lugar no encontrado</div>
      </div>
    );
  }

  // Coupon helpers
  const activeCoupons = coupons?.filter(c => c.is_active !== false) || [];
  const todayRedemptions = redemptions?.filter(r => {
    if (!r.redeemed_at) return false;
    const d = new Date(r.redeemed_at);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  }) || [];

  function openCreateCoupon() {
    setEditingCoupon(null);
    setCouponForm({ title: '', description: '', benefitType: 'pct', discount_percentage: '', discount_amount: '', benefit_label: '', valid_until: '', is_active: true });
    setCouponModalOpen(true);
  }

  function openEditCoupon(coupon: any) {
    setEditingCoupon(coupon);
    const bt = coupon.discount_percentage ? 'pct' : coupon.discount_amount ? 'amt' : coupon.benefit_label?.includes('2x1') ? '2x1' : 'label';
    setCouponForm({
      title: coupon.title || '',
      description: coupon.description || '',
      benefitType: bt,
      discount_percentage: coupon.discount_percentage?.toString() || '',
      discount_amount: coupon.discount_amount?.toString() || '',
      benefit_label: coupon.benefit_label || '',
      valid_until: coupon.valid_until ? coupon.valid_until.split('T')[0] : '',
      is_active: coupon.is_active !== false,
    });
    setCouponModalOpen(true);
  }

  function closeCouponModal() {
    setCouponModalOpen(false);
    setEditingCoupon(null);
  }

  function handleSaveCoupon() {
    if (!couponForm.title) { toast.error('El título es obligatorio'); return; }
    const payload: any = { title: couponForm.title, description: couponForm.description, is_active: couponForm.is_active, place_id: id };
    if (couponForm.valid_until) payload.valid_until = new Date(couponForm.valid_until).toISOString();
    switch (couponForm.benefitType) {
      case 'pct':
        payload.discount_percentage = parseFloat(couponForm.discount_percentage) || null;
        payload.discount_amount = null;
        payload.benefit_label = null;
        if (!payload.discount_percentage) { toast.error('Ingresa el porcentaje de descuento'); return; }
        break;
      case 'amt':
        payload.discount_amount = parseFloat(couponForm.discount_amount) || null;
        payload.discount_percentage = null;
        payload.benefit_label = null;
        if (!payload.discount_amount) { toast.error('Ingresa el monto de descuento'); return; }
        break;
      case '2x1':
        payload.discount_percentage = null;
        payload.discount_amount = null;
        payload.benefit_label = '2x1';
        break;
      case 'label':
        payload.discount_percentage = null;
        payload.discount_amount = null;
        payload.benefit_label = couponForm.benefit_label;
        if (!payload.benefit_label) { toast.error('Ingresa el beneficio personalizado'); return; }
        break;
    }
    if (editingCoupon) {
      updateCoupon.mutate({ id: editingCoupon.id, ...payload });
    } else {
      createCoupon.mutate(payload);
    }
  }

  function handleDeleteCoupon(cid: string) {
    if (confirm('¿Eliminar este cupón permanentemente?')) {
      deleteCoupon.mutate(cid);
    }
  }

  async function handleValidate() {
    if (!validationCode.trim()) { toast.error('Ingresa un código'); return; }
    setValidating(true);
    setValidationResult(null);
    try {
      const result = await couponsService.validateCode(validationCode.trim().toUpperCase(), id!);
      setValidationResult(result);
      if (result?.success) {
        toast.success('Cupón validado exitosamente');
        setValidationCode('');
        queryClient.invalidateQueries({ queryKey: ['place-redemptions', id] });
      } else {
        toast.error(result?.message || 'Cupón inválido');
      }
    } catch (e: any) {
      toast.error(e.message || 'Error al validar');
    }
    setValidating(false);
  }

  function handleSaveSettings() {
    if (!settingsForm) return;
    updatePlace.mutate(settingsForm);
  }

  const benefitDisplay = (c: any) => {
    if (c.discount_percentage) return <Badge variant="outline" className="text-xs">{c.discount_percentage}% OFF</Badge>;
    if (c.discount_amount) return <Badge variant="outline" className="text-xs">${c.discount_amount} OFF</Badge>;
    if (c.benefit_label) return <Badge variant="outline" className="text-xs">{c.benefit_label}</Badge>;
    return null;
  };

  const todayStr = new Date().toDateString();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/lugares')}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{place.name}</h1>
              {place.suspended && <Badge variant="destructive">Suspendido</Badge>}
              {place.featured && <Badge className="bg-yellow-500">Destacado</Badge>}
            </div>
            <p className="text-sm text-gray-500">Panel del dueño — {categoryLabels[place.category] || place.category}</p>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full sm:w-auto flex-wrap h-auto">
          <TabsTrigger value="dashboard"><BarChart3 className="w-4 h-4 mr-2" />Dashboard</TabsTrigger>
          <TabsTrigger value="coupons"><Tag className="w-4 h-4 mr-2" />Cupones</TabsTrigger>
          <TabsTrigger value="validate"><QrCode className="w-4 h-4 mr-2" />Validar</TabsTrigger>
          <TabsTrigger value="history"><Clock className="w-4 h-4 mr-2" />Historial</TabsTrigger>
          <TabsTrigger value="settings"><Store className="w-4 h-4 mr-2" />Ajustes</TabsTrigger>
        </TabsList>

        {/* ===== DASHBOARD TAB ===== */}
        <TabsContent value="dashboard" className="space-y-6">
          {activeCoupons.length === 0 && (
            <Card className="border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-800">
              <CardContent className="flex items-center gap-3 p-4">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <div className="text-sm text-amber-800 dark:text-amber-200">
                  No hay cupones activos. El local no se mostrará con ofertas en la app.
                  <Button variant="link" className="text-amber-700 px-1 h-auto" onClick={() => { setActiveTab('coupons'); openCreateCoupon(); }}>
                    Crear cupón
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <Tag className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{coupons?.length || 0}</p>
                  <p className="text-xs text-gray-500">Total Cupones</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{activeCoupons.length}</p>
                  <p className="text-xs text-gray-500">Activos</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-violet-600">{todayRedemptions.length}</p>
                  <p className="text-xs text-gray-500">Canjes Hoy</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-amber-600">{redemptions?.length || 0}</p>
                  <p className="text-xs text-gray-500">Total Canjes</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Información del Local</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm">
                {place.address && <div className="flex items-center gap-2"><MapPin className="w-4 h-4 text-gray-400" />{place.address}</div>}
                {place.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" />{place.phone}</div>}
                {place.whatsapp && <div className="flex items-center gap-2"><Globe className="w-4 h-4 text-green-500" />{place.whatsapp}</div>}
                {place.rating > 0 && <div className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" />{place.rating.toFixed(1)} / 5</div>}
                {place.description && <p className="text-gray-500 mt-2">{place.description}</p>}
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Acciones Rápidas</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full justify-start" variant="outline" onClick={() => { setActiveTab('coupons'); openCreateCoupon(); }}>
                  <Plus className="w-4 h-4 mr-2" /> Crear Cupón
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('validate')}>
                  <QrCode className="w-4 h-4 mr-2" /> Validar Cupón
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => setActiveTab('settings')}>
                  <Edit className="w-4 h-4 mr-2" /> Editar Información
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ===== CUPONES TAB ===== */}
        <TabsContent value="coupons" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">{coupons?.length || 0} cupones</p>
            <Button onClick={openCreateCoupon}><Plus className="w-4 h-4 mr-2" />Crear Cupón</Button>
          </div>

          {loadingCoupons ? (
            <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
          ) : !coupons?.length ? (
            <Card>
              <CardContent className="flex flex-col items-center py-12 text-gray-400">
                <Tag className="w-12 h-12 mb-3" />
                <p>No hay cupones creados</p>
                <Button variant="link" onClick={openCreateCoupon}>Crear el primero</Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {coupons.map(coupon => (
                <Card key={coupon.id} className={coupon.is_active === false ? 'opacity-60' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <Tag className="w-4 h-4 text-blue-500 shrink-0" />
                          <h3 className="font-medium text-sm truncate">{coupon.title}</h3>
                        </div>
                        {coupon.description && <p className="text-xs text-gray-500 mt-1">{coupon.description}</p>}
                        <div className="flex items-center gap-2 mt-2 flex-wrap">
                          {benefitDisplay(coupon)}
                          {coupon.is_active !== false ? (
                            <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 text-xs">Activo</Badge>
                          ) : (
                            <Badge variant="secondary" className="text-xs">Inactivo</Badge>
                          )}
                          {coupon.valid_until && new Date(coupon.valid_until) < new Date() && (
                            <Badge variant="destructive" className="text-xs">Vencido</Badge>
                          )}
                        </div>
                        {coupon.valid_until && (
                          <p className="text-xs text-gray-400 mt-1">Vence: {formatDate(coupon.valid_until)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditCoupon(coupon)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500" onClick={() => handleDeleteCoupon(coupon.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* ===== VALIDAR TAB ===== */}
        <TabsContent value="validate" className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Validar Cupón</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="max-w-md mx-auto space-y-4">
                <Label>Ingresa el código del cupón</Label>
                <Input
                  placeholder="CÓDIGO"
                  value={validationCode}
                  onChange={(e) => { setValidationCode(e.target.value.toUpperCase()); setValidationResult(null); }}
                  className="text-center text-lg tracking-[0.3em] font-mono uppercase"
                  maxLength={10}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleValidate(); }}
                />
                <Button className="w-full" onClick={handleValidate} disabled={validating || !validationCode.trim()}>
                  {validating ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <CheckCircle className="w-4 h-4 mr-2" />}
                  Validar Cupón
                </Button>
              </div>

              {validationResult && (
                <Card className={validationResult.success ? 'border-green-200 bg-green-50 dark:bg-green-950/20' : 'border-red-200 bg-red-50 dark:bg-red-950/20'}>
                  <CardContent className="p-4">
                    {validationResult.success ? (
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-700 dark:text-green-300">Cupón Validado</p>
                          <p className="text-sm mt-1"><strong>{validationResult.coupon_title}</strong></p>
                          <p className="text-sm text-gray-600">Cliente: {validationResult.user_name}</p>
                          <p className="text-xs text-gray-400 mt-1">{validationResult.redeemed_at ? formatDateTime(validationResult.redeemed_at) : ''}</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-start gap-3">
                        <XCircle className="w-6 h-6 text-red-600 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-700 dark:text-red-300">Cupón Inválido</p>
                          <p className="text-sm text-gray-600 mt-1">{validationResult.message || 'El código no es válido o ya fue usado'}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* ===== HISTORIAL TAB ===== */}
        <TabsContent value="history" className="space-y-4">
          <p className="text-sm text-gray-500">{redemptions?.length || 0} canjes registrados</p>

          {loadingRedemptions ? (
            <div className="flex items-center justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>
          ) : !redemptions?.length ? (
            <Card>
              <CardContent className="flex flex-col items-center py-12 text-gray-400">
                <Clock className="w-12 h-12 mb-3" />
                <p>No hay canjes registrados</p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <div className="divide-y divide-gray-100 dark:divide-gray-800">
                {redemptions.map(r => (
                  <div key={r.id} className="flex items-center gap-3 p-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{r.coupons?.title || 'Cupón'}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">{r.code}</code>
                        <span>{profileMap.get(r.user_id) || 'Usuario'}</span>
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0">{r.redeemed_at ? formatDateTime(r.redeemed_at) : ''}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        {/* ===== AJUSTES TAB ===== */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader><CardTitle className="text-base">Información del Local</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Nombre</Label>
                  <Input defaultValue={place.name} onChange={e => setSettingsForm(s => ({ ...(s || place), name: e.target.value }))} />
                </div>
                <div>
                  <Label>Descripción</Label>
                  <Textarea defaultValue={place.description || ''} onChange={e => setSettingsForm(s => ({ ...(s || place), description: e.target.value }))} rows={3} />
                </div>
                <div>
                  <Label>Dirección</Label>
                  <Input defaultValue={place.address || ''} onChange={e => setSettingsForm(s => ({ ...(s || place), address: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Teléfono</Label>
                    <Input defaultValue={place.phone || ''} onChange={e => setSettingsForm(s => ({ ...(s || place), phone: e.target.value }))} />
                  </div>
                  <div>
                    <Label>WhatsApp</Label>
                    <Input defaultValue={place.whatsapp || ''} onChange={e => setSettingsForm(s => ({ ...(s || place), whatsapp: e.target.value }))} />
                  </div>
                </div>
                <Button onClick={handleSaveSettings} disabled={!settingsForm}>
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="text-base">Redes Sociales</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Instagram</Label>
                  <Input defaultValue={place.instagram || ''} placeholder="https://instagram.com/..." onChange={e => setSettingsForm(s => ({ ...(s || place), instagram: e.target.value }))} />
                </div>
                <div>
                  <Label>Facebook</Label>
                  <Input defaultValue={place.facebook || ''} placeholder="https://facebook.com/..." onChange={e => setSettingsForm(s => ({ ...(s || place), facebook: e.target.value }))} />
                </div>
                <Button onClick={handleSaveSettings} disabled={!settingsForm}>
                  <Save className="w-4 h-4 mr-2" /> Guardar Cambios
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* ===== CREATE/EDIT COUPON MODAL ===== */}
      <Dialog open={couponModalOpen} onOpenChange={setCouponModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editingCoupon ? 'Editar Cupón' : 'Crear Cupón'}</DialogTitle>
            <DialogDescription>
              {editingCoupon ? 'Modifica los datos del cupón' : 'Completa los datos para crear un nuevo cupón'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>Título *</Label>
              <Input value={couponForm.title} onChange={e => setCouponForm(f => ({ ...f, title: e.target.value }))} placeholder="Ej: 20% Off en baño" />
            </div>
            <div>
              <Label>Descripción</Label>
              <Textarea value={couponForm.description} onChange={e => setCouponForm(f => ({ ...f, description: e.target.value }))} placeholder="Opcional" rows={2} />
            </div>
            <div>
              <Label>Tipo de Beneficio</Label>
              <Select value={couponForm.benefitType} onValueChange={v => setCouponForm(f => ({ ...f, benefitType: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pct"><Percent className="w-4 h-4 inline mr-2" />% Descuento</SelectItem>
                  <SelectItem value="amt"><DollarSign className="w-4 h-4 inline mr-2" />$ Descuento</SelectItem>
                  <SelectItem value="2x1"><Gift className="w-4 h-4 inline mr-2" />2x1</SelectItem>
                  <SelectItem value="label"><FileText className="w-4 h-4 inline mr-2" />Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {couponForm.benefitType === 'pct' && (
              <div>
                <Label>Porcentaje de descuento *</Label>
                <Input type="number" min="1" max="100" value={couponForm.discount_percentage} onChange={e => setCouponForm(f => ({ ...f, discount_percentage: e.target.value }))} placeholder="20" />
              </div>
            )}
            {couponForm.benefitType === 'amt' && (
              <div>
                <Label>Monto de descuento *</Label>
                <Input type="number" min="0" step="0.01" value={couponForm.discount_amount} onChange={e => setCouponForm(f => ({ ...f, discount_amount: e.target.value }))} placeholder="500" />
              </div>
            )}
            {couponForm.benefitType === 'label' && (
              <div>
                <Label>Beneficio personalizado *</Label>
                <Input value={couponForm.benefit_label} onChange={e => setCouponForm(f => ({ ...f, benefit_label: e.target.value }))} placeholder="Ej: Descuento en segunda compra" />
              </div>
            )}
            <div>
              <Label>Vencimiento</Label>
              <Input type="date" value={couponForm.valid_until} onChange={e => setCouponForm(f => ({ ...f, valid_until: e.target.value }))} />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={couponForm.is_active} onCheckedChange={v => setCouponForm(f => ({ ...f, is_active: v }))} />
              <Label>Cupón activo</Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeCouponModal}>Cancelar</Button>
            <Button onClick={handleSaveCoupon} disabled={createCoupon.isPending || updateCoupon.isPending}>
              {editingCoupon ? 'Guardar Cambios' : 'Crear Cupón'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
