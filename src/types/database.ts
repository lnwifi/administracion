export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          is_admin: boolean | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          is_admin?: boolean | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          is_admin?: boolean | null
          user_id?: string
        }
        Relationships: []
      }
      anuncios: {
        Row: {
          categoria: string
          descripcion: string
          destacado: boolean
          fecha_creacion: string | null
          fecha_destacado: string | null
          fecha_expiracion_destacado: string | null
          id: string
          imagen_url: string | null
          titulo: string
          usuario_id: string | null
        }
        Insert: {
          categoria: string
          descripcion: string
          destacado?: boolean
          fecha_creacion?: string | null
          fecha_destacado?: string | null
          fecha_expiracion_destacado?: string | null
          id?: string
          imagen_url?: string | null
          titulo: string
          usuario_id?: string | null
        }
        Update: {
          categoria?: string
          descripcion?: string
          destacado?: boolean
          fecha_creacion?: string | null
          fecha_destacado?: string | null
          fecha_expiracion_destacado?: string | null
          id?: string
          imagen_url?: string | null
          titulo?: string
          usuario_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "anuncios_usuario_id_fkey"
            columns: ["usuario_id"]
            isOneToOne: false
            referencedRelation: "profiles_backup"
            referencedColumns: ["id"]
          },
        ]
      }
      app_config: {
        Row: {
          config_key: string
          config_value: Json
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          updated_at: string | null
        }
        Insert: {
          config_key: string
          config_value: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          updated_at?: string | null
        }
        Update: {
          config_key?: string
          config_value?: Json
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      app_popup_views: {
        Row: {
          id: string
          popup_id: string
          user_id: string
          viewed_at: string | null
        }
        Insert: {
          id?: string
          popup_id: string
          user_id: string
          viewed_at?: string | null
        }
        Update: {
          id?: string
          popup_id?: string
          user_id?: string
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "app_popup_views_popup_id_fkey"
            columns: ["popup_id"]
            isOneToOne: false
            referencedRelation: "app_popups"
            referencedColumns: ["id"]
          },
        ]
      }
      app_popups: {
        Row: {
          button_action: string | null
          button_text: string | null
          created_at: string | null
          end_date: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          message: string
          popup_type: string | null
          priority: number | null
          show_once_per_user: boolean | null
          start_date: string | null
          target_audience: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          button_action?: string | null
          button_text?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          message: string
          popup_type?: string | null
          priority?: number | null
          show_once_per_user?: boolean | null
          start_date?: string | null
          target_audience?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          button_action?: string | null
          button_text?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          message?: string
          popup_type?: string | null
          priority?: number | null
          show_once_per_user?: boolean | null
          start_date?: string | null
          target_audience?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      app_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          key: string
          updated_at: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          key: string
          updated_at?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          key?: string
          updated_at?: string | null
          value?: string | null
        }
        Relationships: []
      }
      avisos_cleanup_logs: {
        Row: {
          created_at: string | null
          deleted_avisos: number | null
          deleted_images: number | null
          error_message: string | null
          executed_at: string | null
          execution_time_ms: number | null
          failed_images: number | null
          id: string
        }
        Insert: {
          created_at?: string | null
          deleted_avisos?: number | null
          deleted_images?: number | null
          error_message?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          failed_images?: number | null
          id?: string
        }
        Update: {
          created_at?: string | null
          deleted_avisos?: number | null
          deleted_images?: number | null
          error_message?: string | null
          executed_at?: string | null
          execution_time_ms?: number | null
          failed_images?: number | null
          id?: string
        }
        Relationships: []
      }
      banners: {
        Row: {
          created_at: string
          description: string
          end_date: string
          id: string
          image_url: string
          is_active: boolean
          link_url: string
          priority: number
          start_date: string
          target_section: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          end_date: string
          id?: string
          image_url: string
          is_active?: boolean
          link_url: string
          priority?: number
          start_date: string
          target_section: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          end_date?: string
          id?: string
          image_url?: string
          is_active?: boolean
          link_url?: string
          priority?: number
          start_date?: string
          target_section?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      brand_commissions: {
        Row: {
          brand_name: string
          commission_percentage: number
          created_at: string | null
          id: string
          is_active: boolean | null
          notes: string | null
          updated_at: string | null
        }
        Insert: {
          brand_name: string
          commission_percentage?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Update: {
          brand_name?: string
          commission_percentage?: number
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          notes?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      campaign_donation_stats: {
        Row: {
          campaign_id: string
          campaign_name: string
          created_at: string | null
          end_date: string | null
          goal_amount: number | null
          id: string
          is_active: boolean | null
          metadata: Json | null
          refuge_id: string | null
          start_date: string | null
          total_amount: number | null
          total_donations: number | null
          updated_at: string | null
        }
        Insert: {
          campaign_id: string
          campaign_name: string
          created_at?: string | null
          end_date?: string | null
          goal_amount?: number | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          refuge_id?: string | null
          start_date?: string | null
          total_amount?: number | null
          total_donations?: number | null
          updated_at?: string | null
        }
        Update: {
          campaign_id?: string
          campaign_name?: string
          created_at?: string | null
          end_date?: string | null
          goal_amount?: number | null
          id?: string
          is_active?: boolean | null
          metadata?: Json | null
          refuge_id?: string | null
          start_date?: string | null
          total_amount?: number | null
          total_donations?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaign_donation_stats_refuge_id_fkey"
            columns: ["refuge_id"]
            isOneToOne: false
            referencedRelation: "refuge_donations_summary"
            referencedColumns: ["refuge_id"]
          },
          {
            foreignKeyName: "campaign_donation_stats_refuge_id_fkey"
            columns: ["refuge_id"]
            isOneToOne: false
            referencedRelation: "refugios"
            referencedColumns: ["id"]
          },
        ]
      }
      categorias_productos: {
        Row: {
          activo: boolean
          descripcion: string | null
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          id: string
          image_url: string | null
          nombre: string
        }
        Insert: {
          activo?: boolean
          descripcion?: string | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: string
          image_url?: string | null
          nombre: string
        }
        Update: {
          activo?: boolean
          descripcion?: string | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: string
          image_url?: string | null
          nombre?: string
        }
        Relationships: []
      }
      chat_messages: {
        Row: {
          created_at: string
          id: string
          match_id: string
          message: string
          read: boolean
          sender_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          match_id: string
          message: string
          read?: boolean
          sender_id: string
        }
        Update: {
          created_at?: string
          id?: string
          match_id?: string
          message?: string
          read?: boolean
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_messages_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "pet_matches"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_notification_queue: {
        Row: {
          created_at: string | null
          id: string
          match_id: string
          message_id: string
          message_text: string
          processed: boolean | null
          recipient_user_id: string
          sender_user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          match_id: string
          message_id: string
          message_text: string
          processed?: boolean | null
          recipient_user_id: string
          sender_user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          match_id?: string
          message_id?: string
          message_text?: string
          processed?: boolean | null
          recipient_user_id?: string
          sender_user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_notification_queue_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "pet_matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "chat_notification_queue_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "chat_messages"
            referencedColumns: ["id"]
          },
        ]
      }
      clientes_tienda: {
        Row: {
          apellido: string | null
          direcciones_envio: Json[] | null
          email: string | null
          fecha_creacion: string | null
          id: string
          nombre: string | null
          telefono: string | null
          user_id: string | null
        }
        Insert: {
          apellido?: string | null
          direcciones_envio?: Json[] | null
          email?: string | null
          fecha_creacion?: string | null
          id?: string
          nombre?: string | null
          telefono?: string | null
          user_id?: string | null
        }
        Update: {
          apellido?: string | null
          direcciones_envio?: Json[] | null
          email?: string | null
          fecha_creacion?: string | null
          id?: string
          nombre?: string | null
          telefono?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      coupon_audit_log: {
        Row: {
          action: string | null
          code: string | null
          coupon_id: string | null
          created_at: string | null
          id: string
          place_id: string | null
          redeemed_at: string | null
          user_id: string | null
        }
        Insert: {
          action?: string | null
          code?: string | null
          coupon_id?: string | null
          created_at?: string | null
          id?: string
          place_id?: string | null
          redeemed_at?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string | null
          code?: string | null
          coupon_id?: string | null
          created_at?: string | null
          id?: string
          place_id?: string | null
          redeemed_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      coupons: {
        Row: {
          code: string | null
          created_at: string | null
          description: string | null
          discount_amount: number | null
          discount_percentage: number | null
          id: string
          is_active: boolean | null
          max_uses: number | null
          max_uses_per_user: number | null
          membership_required: boolean | null
          min_purchase: number | null
          partner_name: string | null
          place_id: string | null
          title: string
          updated_at: string | null
          used_count: number | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          max_uses_per_user?: number | null
          membership_required?: boolean | null
          min_purchase?: number | null
          partner_name?: string | null
          place_id?: string | null
          title: string
          updated_at?: string | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount_amount?: number | null
          discount_percentage?: number | null
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          max_uses_per_user?: number | null
          membership_required?: boolean | null
          min_purchase?: number | null
          partner_name?: string | null
          place_id?: string | null
          title?: string
          updated_at?: string | null
          used_count?: number | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "coupons_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      cron_job_logs: {
        Row: {
          details: Json | null
          executed_at: string | null
          id: number
          job_name: string
          status: string | null
        }
        Insert: {
          details?: Json | null
          executed_at?: string | null
          id?: number
          job_name: string
          status?: string | null
        }
        Update: {
          details?: Json | null
          executed_at?: string | null
          id?: number
          job_name?: string
          status?: string | null
        }
        Relationships: []
      }
      cupones_tienda: {
        Row: {
          activo: boolean | null
          categorias_aplicables: string[] | null
          codigo: string
          compra_minima: number | null
          descripcion: string | null
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          fecha_expiracion: string | null
          id: string
          productos_aplicables: string[] | null
          tipo_descuento: string
          uso_maximo: number | null
          uso_maximo_por_usuario: number | null
          usos_actuales: number | null
          valor_descuento: number
        }
        Insert: {
          activo?: boolean | null
          categorias_aplicables?: string[] | null
          codigo: string
          compra_minima?: number | null
          descripcion?: string | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          fecha_expiracion?: string | null
          id?: string
          productos_aplicables?: string[] | null
          tipo_descuento: string
          uso_maximo?: number | null
          uso_maximo_por_usuario?: number | null
          usos_actuales?: number | null
          valor_descuento: number
        }
        Update: {
          activo?: boolean | null
          categorias_aplicables?: string[] | null
          codigo?: string
          compra_minima?: number | null
          descripcion?: string | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          fecha_expiracion?: string | null
          id?: string
          productos_aplicables?: string[] | null
          tipo_descuento?: string
          uso_maximo?: number | null
          uso_maximo_por_usuario?: number | null
          usos_actuales?: number | null
          valor_descuento?: number
        }
        Relationships: []
      }
      daily_login_rewards: {
        Row: {
          claimed_at: string | null
          created_at: string | null
          id: string
          points_awarded: number
          reward_date: string
          user_id: string
        }
        Insert: {
          claimed_at?: string | null
          created_at?: string | null
          id?: string
          points_awarded?: number
          reward_date?: string
          user_id: string
        }
        Update: {
          claimed_at?: string | null
          created_at?: string | null
          id?: string
          points_awarded?: number
          reward_date?: string
          user_id?: string
        }
        Relationships: []
      }
      delivery_attempts: {
        Row: {
          attempt_number: number
          attempted_at: string | null
          created_at: string | null
          id: string
          notes: string | null
          pedido_id: string | null
          photo_evidence: string | null
          repartidor_id: string | null
          scheduled_date: string
          signature: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          attempt_number: number
          attempted_at?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          pedido_id?: string | null
          photo_evidence?: string | null
          repartidor_id?: string | null
          scheduled_date: string
          signature?: string | null
          status: string
          updated_at?: string | null
        }
        Update: {
          attempt_number?: number
          attempted_at?: string | null
          created_at?: string | null
          id?: string
          notes?: string | null
          pedido_id?: string | null
          photo_evidence?: string | null
          repartidor_id?: string | null
          scheduled_date?: string
          signature?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_delivery_attempts_pedido"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_delivery_attempts_repartidor"
            columns: ["repartidor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      donations: {
        Row: {
          amount: number
          campaign_id: string | null
          created_at: string | null
          donation_type: string | null
          id: string
          is_anonymous: boolean | null
          message: string | null
          metadata: Json | null
          payment_id: string | null
          refuge_id: string | null
          status: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          campaign_id?: string | null
          created_at?: string | null
          donation_type?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          metadata?: Json | null
          payment_id?: string | null
          refuge_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          campaign_id?: string | null
          created_at?: string | null
          donation_type?: string | null
          id?: string
          is_anonymous?: boolean | null
          message?: string | null
          metadata?: Json | null
          payment_id?: string | null
          refuge_id?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "donations_refuge_id_fkey"
            columns: ["refuge_id"]
            isOneToOne: false
            referencedRelation: "refuge_donations_summary"
            referencedColumns: ["refuge_id"]
          },
          {
            foreignKeyName: "donations_refuge_id_fkey"
            columns: ["refuge_id"]
            isOneToOne: false
            referencedRelation: "refugios"
            referencedColumns: ["id"]
          },
        ]
      }
      environment_configs: {
        Row: {
          cloudinary_api_key: string | null
          cloudinary_cloud_name: string | null
          cloudinary_upload_preset: string | null
          created_at: string | null
          environment: string
          firebase_api_key: string | null
          firebase_project_id: string | null
          google_client_id: string | null
          id: string
          mercadopago_access_token: string
          mercadopago_environment: string
          mercadopago_public_key: string
          supabase_anon_key: string
          supabase_url: string
          updated_at: string | null
        }
        Insert: {
          cloudinary_api_key?: string | null
          cloudinary_cloud_name?: string | null
          cloudinary_upload_preset?: string | null
          created_at?: string | null
          environment: string
          firebase_api_key?: string | null
          firebase_project_id?: string | null
          google_client_id?: string | null
          id?: string
          mercadopago_access_token: string
          mercadopago_environment?: string
          mercadopago_public_key: string
          supabase_anon_key: string
          supabase_url: string
          updated_at?: string | null
        }
        Update: {
          cloudinary_api_key?: string | null
          cloudinary_cloud_name?: string | null
          cloudinary_upload_preset?: string | null
          created_at?: string | null
          environment?: string
          firebase_api_key?: string | null
          firebase_project_id?: string | null
          google_client_id?: string | null
          id?: string
          mercadopago_access_token?: string
          mercadopago_environment?: string
          mercadopago_public_key?: string
          supabase_anon_key?: string
          supabase_url?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      events: {
        Row: {
          created_at: string
          current_participants: number
          description: string | null
          end_time: string
          event_date: string
          event_type: string
          id: string
          image_url: string | null
          is_active: boolean
          is_featured: boolean
          location: string | null
          max_participants: number | null
          organizer_id: string | null
          organizer_name: string | null
          start_time: string
          title: string
        }
        Insert: {
          created_at?: string
          current_participants?: number
          description?: string | null
          end_time: string
          event_date: string
          event_type: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          location?: string | null
          max_participants?: number | null
          organizer_id?: string | null
          organizer_name?: string | null
          start_time: string
          title: string
        }
        Update: {
          created_at?: string
          current_participants?: number
          description?: string | null
          end_time?: string
          event_date?: string
          event_type?: string
          id?: string
          image_url?: string | null
          is_active?: boolean
          is_featured?: boolean
          location?: string | null
          max_participants?: number | null
          organizer_id?: string | null
          organizer_name?: string | null
          start_time?: string
          title?: string
        }
        Relationships: []
      }
      membership_types: {
        Row: {
          created_at: string | null
          description: string | null
          has_ads: boolean
          has_coupons: boolean
          has_store_discount: boolean
          id: string
          max_interests_per_pet: number
          max_pets: number
          max_photos_per_pet: number
          name: string
          price: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          has_ads?: boolean
          has_coupons?: boolean
          has_store_discount?: boolean
          id?: string
          max_interests_per_pet: number
          max_pets: number
          max_photos_per_pet: number
          name: string
          price?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          has_ads?: boolean
          has_coupons?: boolean
          has_store_discount?: boolean
          id?: string
          max_interests_per_pet?: number
          max_pets?: number
          max_photos_per_pet?: number
          name?: string
          price?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      memberships: {
        Row: {
          created_at: string | null
          has_ads: boolean
          has_coupons: boolean
          has_store_discounts: boolean
          id: string
          max_interests_per_pet: number
          max_pets: number
          max_photos_per_pet: number
          name: string
          price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          has_ads?: boolean
          has_coupons?: boolean
          has_store_discounts?: boolean
          id?: string
          max_interests_per_pet: number
          max_pets: number
          max_photos_per_pet: number
          name: string
          price?: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          has_ads?: boolean
          has_coupons?: boolean
          has_store_discounts?: boolean
          id?: string
          max_interests_per_pet?: number
          max_pets?: number
          max_photos_per_pet?: number
          name?: string
          price?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_history: {
        Row: {
          created_at: string | null
          created_by: string | null
          fail_count: number | null
          id: string
          message: string
          metadata: Json | null
          recipient_count: number | null
          sent_at: string | null
          status: string | null
          success_count: number | null
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          fail_count?: number | null
          id?: string
          message: string
          metadata?: Json | null
          recipient_count?: number | null
          sent_at?: string | null
          status?: string | null
          success_count?: number | null
          title: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          fail_count?: number | null
          id?: string
          message?: string
          metadata?: Json | null
          recipient_count?: number | null
          sent_at?: string | null
          status?: string | null
          success_count?: number | null
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notification_templates: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          message: string
          name: string
          title: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message: string
          name: string
          title: string
          type?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          message?: string
          name?: string
          title?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      notifications: {
        Row: {
          click_count: number | null
          created_at: string | null
          id: string
          message: string
          metadata: Json | null
          open_count: number | null
          read: boolean | null
          recipient_count: number | null
          title: string
          type: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          click_count?: number | null
          created_at?: string | null
          id?: string
          message: string
          metadata?: Json | null
          open_count?: number | null
          read?: boolean | null
          recipient_count?: number | null
          title: string
          type: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          click_count?: number | null
          created_at?: string | null
          id?: string
          message?: string
          metadata?: Json | null
          open_count?: number | null
          read?: boolean | null
          recipient_count?: number | null
          title?: string
          type?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      pagos: {
        Row: {
          aviso_id: string | null
          estado: string
          fecha: string | null
          id: string
          mercadopago_id: string | null
          monto: number
          raw_response: Json | null
          tipo: string
          user_id: string | null
        }
        Insert: {
          aviso_id?: string | null
          estado: string
          fecha?: string | null
          id?: string
          mercadopago_id?: string | null
          monto: number
          raw_response?: Json | null
          tipo: string
          user_id?: string | null
        }
        Update: {
          aviso_id?: string | null
          estado?: string
          fecha?: string | null
          id?: string
          mercadopago_id?: string | null
          monto?: number
          raw_response?: Json | null
          tipo?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pagos_aviso_id_fkey"
            columns: ["aviso_id"]
            isOneToOne: false
            referencedRelation: "red_de_ayuda"
            referencedColumns: ["id"]
          },
        ]
      }
      password_reset_codes: {
        Row: {
          code: string
          created_at: string | null
          email: string
          expires_at: string
          id: number
          used: boolean | null
        }
        Insert: {
          code: string
          created_at?: string | null
          email: string
          expires_at: string
          id?: number
          used?: boolean | null
        }
        Update: {
          code?: string
          created_at?: string | null
          email?: string
          expires_at?: string
          id?: number
          used?: boolean | null
        }
        Relationships: []
      }
      pedidos: {
        Row: {
          cliente_id: string | null
          costo_envio: number | null
          delivery_attempt: number | null
          delivery_completed_at: string | null
          delivery_notes: string | null
          delivery_status: string | null
          descuento: number | null
          direccion_envio: Json | null
          estado: string
          estado_pago: string | null
          estimated_delivery: string | null
          fecha_actualizacion: string | null
          fecha_pago: string | null
          fecha_pedido: string | null
          first_delivery_date: string | null
          id: string
          id_transaccion_pago: string | null
          latitude: number | null
          longitude: number | null
          metodo_pago: string | null
          notas_admin: string | null
          notas_cliente: string | null
          petgestion_order_number: string | null
          petgestion_payment_status: string | null
          petgestion_sale_id: string | null
          procesado_split: boolean | null
          repartidor_id: string | null
          second_delivery_date: string | null
          split_commission_percent: number | null
          split_enabled: boolean | null
          split_processed_at: string | null
          split_shipping_cost: number | null
          split_supplier_amount: number | null
          split_your_commission: number | null
          subtotal: number
          total: number
        }
        Insert: {
          cliente_id?: string | null
          costo_envio?: number | null
          delivery_attempt?: number | null
          delivery_completed_at?: string | null
          delivery_notes?: string | null
          delivery_status?: string | null
          descuento?: number | null
          direccion_envio?: Json | null
          estado?: string
          estado_pago?: string | null
          estimated_delivery?: string | null
          fecha_actualizacion?: string | null
          fecha_pago?: string | null
          fecha_pedido?: string | null
          first_delivery_date?: string | null
          id?: string
          id_transaccion_pago?: string | null
          latitude?: number | null
          longitude?: number | null
          metodo_pago?: string | null
          notas_admin?: string | null
          notas_cliente?: string | null
          petgestion_order_number?: string | null
          petgestion_payment_status?: string | null
          petgestion_sale_id?: string | null
          procesado_split?: boolean | null
          repartidor_id?: string | null
          second_delivery_date?: string | null
          split_commission_percent?: number | null
          split_enabled?: boolean | null
          split_processed_at?: string | null
          split_shipping_cost?: number | null
          split_supplier_amount?: number | null
          split_your_commission?: number | null
          subtotal: number
          total: number
        }
        Update: {
          cliente_id?: string | null
          costo_envio?: number | null
          delivery_attempt?: number | null
          delivery_completed_at?: string | null
          delivery_notes?: string | null
          delivery_status?: string | null
          descuento?: number | null
          direccion_envio?: Json | null
          estado?: string
          estado_pago?: string | null
          estimated_delivery?: string | null
          fecha_actualizacion?: string | null
          fecha_pago?: string | null
          fecha_pedido?: string | null
          first_delivery_date?: string | null
          id?: string
          id_transaccion_pago?: string | null
          latitude?: number | null
          longitude?: number | null
          metodo_pago?: string | null
          notas_admin?: string | null
          notas_cliente?: string | null
          petgestion_order_number?: string | null
          petgestion_payment_status?: string | null
          petgestion_sale_id?: string | null
          procesado_split?: boolean | null
          repartidor_id?: string | null
          second_delivery_date?: string | null
          split_commission_percent?: number | null
          split_enabled?: boolean | null
          split_processed_at?: string | null
          split_shipping_cost?: number | null
          split_supplier_amount?: number | null
          split_your_commission?: number | null
          subtotal?: number
          total?: number
        }
        Relationships: [
          {
            foreignKeyName: "fk_pedidos_repartidor"
            columns: ["repartidor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
          {
            foreignKeyName: "pedidos_cliente_id_fkey"
            columns: ["cliente_id"]
            isOneToOne: false
            referencedRelation: "clientes_tienda"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_repartidor_id_fkey"
            columns: ["repartidor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      pedidos_items: {
        Row: {
          cantidad: number
          id: string
          nombre_producto: string | null
          pedido_id: string
          precio_unitario: number
          producto_id: string
          sku_producto: string | null
          subtotal_item: number
        }
        Insert: {
          cantidad: number
          id?: string
          nombre_producto?: string | null
          pedido_id: string
          precio_unitario: number
          producto_id: string
          sku_producto?: string | null
          subtotal_item: number
        }
        Update: {
          cantidad?: number
          id?: string
          nombre_producto?: string | null
          pedido_id?: string
          precio_unitario?: number
          producto_id?: string
          sku_producto?: string | null
          subtotal_item?: number
        }
        Relationships: [
          {
            foreignKeyName: "pedidos_items_pedido_id_fkey"
            columns: ["pedido_id"]
            isOneToOne: false
            referencedRelation: "pedidos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_items_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pedidos_items_producto_id_fkey"
            columns: ["producto_id"]
            isOneToOne: false
            referencedRelation: "trending_products"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_appointments: {
        Row: {
          appointment_date: string
          appointment_type: string
          clinic_address: string | null
          clinic_name: string | null
          clinic_phone: string | null
          cost: number | null
          created_at: string
          diagnosis: string | null
          id: string
          next_appointment: string | null
          notes: string | null
          pet_id: string
          reason: string | null
          reminder_enabled: boolean | null
          status: string | null
          treatment: string | null
          updated_at: string
          veterinarian_name: string | null
        }
        Insert: {
          appointment_date: string
          appointment_type: string
          clinic_address?: string | null
          clinic_name?: string | null
          clinic_phone?: string | null
          cost?: number | null
          created_at?: string
          diagnosis?: string | null
          id?: string
          next_appointment?: string | null
          notes?: string | null
          pet_id: string
          reason?: string | null
          reminder_enabled?: boolean | null
          status?: string | null
          treatment?: string | null
          updated_at?: string
          veterinarian_name?: string | null
        }
        Update: {
          appointment_date?: string
          appointment_type?: string
          clinic_address?: string | null
          clinic_name?: string | null
          clinic_phone?: string | null
          cost?: number | null
          created_at?: string
          diagnosis?: string | null
          id?: string
          next_appointment?: string | null
          notes?: string | null
          pet_id?: string
          reason?: string | null
          reminder_enabled?: boolean | null
          status?: string | null
          treatment?: string | null
          updated_at?: string
          veterinarian_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_appointments_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_appointments_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_health_info: {
        Row: {
          allergies: string[] | null
          birth_date: string | null
          created_at: string
          emergency_contact_name: string | null
          emergency_contact_phone: string | null
          id: string
          insurance_info: string | null
          microchip_number: string | null
          pet_id: string
          special_conditions: string | null
          updated_at: string
          veterinarian_address: string | null
          veterinarian_name: string | null
          veterinarian_phone: string | null
        }
        Insert: {
          allergies?: string[] | null
          birth_date?: string | null
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          insurance_info?: string | null
          microchip_number?: string | null
          pet_id: string
          special_conditions?: string | null
          updated_at?: string
          veterinarian_address?: string | null
          veterinarian_name?: string | null
          veterinarian_phone?: string | null
        }
        Update: {
          allergies?: string[] | null
          birth_date?: string | null
          created_at?: string
          emergency_contact_name?: string | null
          emergency_contact_phone?: string | null
          id?: string
          insurance_info?: string | null
          microchip_number?: string | null
          pet_id?: string
          special_conditions?: string | null
          updated_at?: string
          veterinarian_address?: string | null
          veterinarian_name?: string | null
          veterinarian_phone?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_health_info_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_health_info_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_interests: {
        Row: {
          created_at: string | null
          id: string
          interest: string
          pet_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          interest: string
          pet_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          interest?: string
          pet_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_interests_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_interests_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_matches: {
        Row: {
          created_at: string
          id: string
          match_status: string
          pet_id_1: string
          pet_id_2: string
          status_1: string
          status_2: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          match_status?: string
          pet_id_1: string
          pet_id_2: string
          status_1?: string
          status_2?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          match_status?: string
          pet_id_1?: string
          pet_id_2?: string
          status_1?: string
          status_2?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pet_matches_pet_id_1_fkey"
            columns: ["pet_id_1"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_matches_pet_id_1_fkey"
            columns: ["pet_id_1"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pet_matches_pet_id_2_fkey"
            columns: ["pet_id_2"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_matches_pet_id_2_fkey"
            columns: ["pet_id_2"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_medications: {
        Row: {
          created_at: string
          dosage: string
          end_date: string | null
          frequency: string
          id: string
          instructions: string | null
          is_active: boolean | null
          medication_name: string
          pet_id: string
          prescribed_by: string | null
          purpose: string | null
          reminder_enabled: boolean | null
          side_effects: string | null
          start_date: string
          updated_at: string
          veterinarian_name: string | null
        }
        Insert: {
          created_at?: string
          dosage: string
          end_date?: string | null
          frequency: string
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          medication_name: string
          pet_id: string
          prescribed_by?: string | null
          purpose?: string | null
          reminder_enabled?: boolean | null
          side_effects?: string | null
          start_date: string
          updated_at?: string
          veterinarian_name?: string | null
        }
        Update: {
          created_at?: string
          dosage?: string
          end_date?: string | null
          frequency?: string
          id?: string
          instructions?: string | null
          is_active?: boolean | null
          medication_name?: string
          pet_id?: string
          prescribed_by?: string | null
          purpose?: string | null
          reminder_enabled?: boolean | null
          side_effects?: string | null
          start_date?: string
          updated_at?: string
          veterinarian_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_medications_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_medications_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_photos: {
        Row: {
          created_at: string | null
          id: string
          image_url: string
          is_primary: boolean | null
          pet_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          image_url: string
          is_primary?: boolean | null
          pet_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          image_url?: string
          is_primary?: boolean | null
          pet_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_photos_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_photos_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_profile_views: {
        Row: {
          id: string
          metadata: Json | null
          pet_id: string
          viewed_at: string | null
          viewer_id: string | null
        }
        Insert: {
          id?: string
          metadata?: Json | null
          pet_id: string
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Update: {
          id?: string
          metadata?: Json | null
          pet_id?: string
          viewed_at?: string | null
          viewer_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_profile_views_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_profile_views_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_reminders: {
        Row: {
          completed: boolean | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          is_recurring: boolean | null
          pet_id: string
          recurrence_interval: string | null
          reminder_date: string
          reminder_type: string
          title: string
          updated_at: string
        }
        Insert: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          pet_id: string
          recurrence_interval?: string | null
          reminder_date: string
          reminder_type: string
          title: string
          updated_at?: string
        }
        Update: {
          completed?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          is_recurring?: boolean | null
          pet_id?: string
          recurrence_interval?: string | null
          reminder_date?: string
          reminder_type?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "pet_reminders_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_reminders_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_treatments: {
        Row: {
          clinic_name: string | null
          cost: number | null
          created_at: string
          description: string | null
          end_date: string | null
          follow_up_date: string | null
          id: string
          notes: string | null
          pet_id: string
          start_date: string
          status: string | null
          treatment_name: string
          treatment_type: string
          updated_at: string
          veterinarian_name: string | null
        }
        Insert: {
          clinic_name?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          pet_id: string
          start_date: string
          status?: string | null
          treatment_name: string
          treatment_type: string
          updated_at?: string
          veterinarian_name?: string | null
        }
        Update: {
          clinic_name?: string | null
          cost?: number | null
          created_at?: string
          description?: string | null
          end_date?: string | null
          follow_up_date?: string | null
          id?: string
          notes?: string | null
          pet_id?: string
          start_date?: string
          status?: string | null
          treatment_name?: string
          treatment_type?: string
          updated_at?: string
          veterinarian_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_treatments_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_treatments_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_vaccines: {
        Row: {
          batch_number: string | null
          created_at: string
          date_administered: string
          id: string
          next_due_date: string | null
          notes: string | null
          pet_id: string
          reminder_enabled: boolean | null
          updated_at: string
          vaccine_name: string
          vaccine_type: string | null
          veterinarian_name: string | null
        }
        Insert: {
          batch_number?: string | null
          created_at?: string
          date_administered: string
          id?: string
          next_due_date?: string | null
          notes?: string | null
          pet_id: string
          reminder_enabled?: boolean | null
          updated_at?: string
          vaccine_name: string
          vaccine_type?: string | null
          veterinarian_name?: string | null
        }
        Update: {
          batch_number?: string | null
          created_at?: string
          date_administered?: string
          id?: string
          next_due_date?: string | null
          notes?: string | null
          pet_id?: string
          reminder_enabled?: boolean | null
          updated_at?: string
          vaccine_name?: string
          vaccine_type?: string | null
          veterinarian_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "pet_vaccines_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_vaccines_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      pet_weight_records: {
        Row: {
          body_condition_score: number | null
          created_at: string
          id: string
          measurement_date: string
          notes: string | null
          pet_id: string
          veterinarian_name: string | null
          weight_kg: number
        }
        Insert: {
          body_condition_score?: number | null
          created_at?: string
          id?: string
          measurement_date: string
          notes?: string | null
          pet_id: string
          veterinarian_name?: string | null
          weight_kg: number
        }
        Update: {
          body_condition_score?: number | null
          created_at?: string
          id?: string
          measurement_date?: string
          notes?: string | null
          pet_id?: string
          veterinarian_name?: string | null
          weight_kg?: number
        }
        Relationships: [
          {
            foreignKeyName: "pet_weight_records_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "pet_weight_records_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      petgestion_sync_config: {
        Row: {
          created_at: string | null
          default_branch_id: string | null
          default_branch_name: string | null
          id: string
          is_active: boolean | null
          last_sync_at: string | null
          mercadopago_access_token: string | null
          mercadopago_public_key: string | null
          payment_config_active: boolean | null
          petgestion_api_key: string
          petgestion_url: string
          split_enabled: boolean | null
          supplier_mercadopago_access_token: string | null
          supplier_mercadopago_client_id: string | null
          supplier_mercadopago_client_secret: string | null
          sync_interval_minutes: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          default_branch_id?: string | null
          default_branch_name?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          mercadopago_access_token?: string | null
          mercadopago_public_key?: string | null
          payment_config_active?: boolean | null
          petgestion_api_key: string
          petgestion_url: string
          split_enabled?: boolean | null
          supplier_mercadopago_access_token?: string | null
          supplier_mercadopago_client_id?: string | null
          supplier_mercadopago_client_secret?: string | null
          sync_interval_minutes?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          default_branch_id?: string | null
          default_branch_name?: string | null
          id?: string
          is_active?: boolean | null
          last_sync_at?: string | null
          mercadopago_access_token?: string | null
          mercadopago_public_key?: string | null
          payment_config_active?: boolean | null
          petgestion_api_key?: string
          petgestion_url?: string
          split_enabled?: boolean | null
          supplier_mercadopago_access_token?: string | null
          supplier_mercadopago_client_id?: string | null
          supplier_mercadopago_client_secret?: string | null
          sync_interval_minutes?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      petoaliados_requests: {
        Row: {
          accepts_credit_card: boolean | null
          address: string
          business_name: string
          category: string
          created_at: string | null
          description: string | null
          email: string | null
          facebook: string | null
          has_parking: boolean | null
          id: string
          instagram: string | null
          pet_friendly: boolean | null
          phone: string
          schedule: Json | null
          source: string | null
          status: string | null
          updated_at: string | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          accepts_credit_card?: boolean | null
          address: string
          business_name: string
          category: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          facebook?: string | null
          has_parking?: boolean | null
          id?: string
          instagram?: string | null
          pet_friendly?: boolean | null
          phone: string
          schedule?: Json | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          accepts_credit_card?: boolean | null
          address?: string
          business_name?: string
          category?: string
          created_at?: string | null
          description?: string | null
          email?: string | null
          facebook?: string | null
          has_parking?: boolean | null
          id?: string
          instagram?: string | null
          pet_friendly?: boolean | null
          phone?: string
          schedule?: Json | null
          source?: string | null
          status?: string | null
          updated_at?: string | null
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      pets: {
        Row: {
          age: string | null
          breed: string | null
          contact_info: string | null
          created_at: string
          deactivated_by_downgrade: boolean | null
          description: string | null
          featured: boolean | null
          featured_until: string | null
          id: string
          image_url: string | null
          images: string[] | null
          interest: string[] | null
          is_active: boolean | null
          name: string
          owner_id: string
          show_in_petomatch: boolean | null
          species: string
          suspended_by_admin: boolean | null
          suspension_reason: string | null
          updated_at: string
        }
        Insert: {
          age?: string | null
          breed?: string | null
          contact_info?: string | null
          created_at?: string
          deactivated_by_downgrade?: boolean | null
          description?: string | null
          featured?: boolean | null
          featured_until?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          interest?: string[] | null
          is_active?: boolean | null
          name: string
          owner_id: string
          show_in_petomatch?: boolean | null
          species: string
          suspended_by_admin?: boolean | null
          suspension_reason?: string | null
          updated_at?: string
        }
        Update: {
          age?: string | null
          breed?: string | null
          contact_info?: string | null
          created_at?: string
          deactivated_by_downgrade?: boolean | null
          description?: string | null
          featured?: boolean | null
          featured_until?: string | null
          id?: string
          image_url?: string | null
          images?: string[] | null
          interest?: string[] | null
          is_active?: boolean | null
          name?: string
          owner_id?: string
          show_in_petomatch?: boolean | null
          species?: string
          suspended_by_admin?: boolean | null
          suspension_reason?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      pickup_locations: {
        Row: {
          address: string
          city: string | null
          cost: number
          created_at: string
          id: string
          instructions: string | null
          is_active: boolean
          name: string
          operating_hours: string | null
          phone: string | null
          postal_code: string | null
          province: string | null
          sort_order: number
        }
        Insert: {
          address: string
          city?: string | null
          cost?: number
          created_at?: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          name: string
          operating_hours?: string | null
          phone?: string | null
          postal_code?: string | null
          province?: string | null
          sort_order?: number
        }
        Update: {
          address?: string
          city?: string | null
          cost?: number
          created_at?: string
          id?: string
          instructions?: string | null
          is_active?: boolean
          name?: string
          operating_hours?: string | null
          phone?: string | null
          postal_code?: string | null
          province?: string | null
          sort_order?: number
        }
        Relationships: []
      }
      place_visits: {
        Row: {
          created_at: string | null
          id: string
          ip_address: unknown
          place_id: string
          session_id: string | null
          user_agent: string | null
          user_id: string | null
          visited_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          place_id: string
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          visited_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          ip_address?: unknown
          place_id?: string
          session_id?: string | null
          user_agent?: string | null
          user_id?: string | null
          visited_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "place_visits_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      places: {
        Row: {
          address: string
          category: string
          created_at: string
          dashboard_access: boolean | null
          description: string | null
          descuento_members: number | null
          facebook: string | null
          featured: boolean | null
          featured_until: string | null
          hours: Json | null
          id: string
          instagram: string | null
          is_active: boolean
          lat: number | null
          latitude: number | null
          lng: number | null
          longitude: number | null
          name: string
          owner_id: string | null
          phone: string | null
          photo_url: string | null
          precio_desde: number | null
          qr_url: string | null
          rating: number | null
          servicios: Json | null
          suspended: boolean | null
          type: string | null
          updated_at: string
          visiting_home: boolean | null
          whatsapp: string | null
          whatsapp_contact: string | null
        }
        Insert: {
          address: string
          category: string
          created_at?: string
          dashboard_access?: boolean | null
          description?: string | null
          descuento_members?: number | null
          facebook?: string | null
          featured?: boolean | null
          featured_until?: string | null
          hours?: Json | null
          id?: string
          instagram?: string | null
          is_active?: boolean
          lat?: number | null
          latitude?: number | null
          lng?: number | null
          longitude?: number | null
          name: string
          owner_id?: string | null
          phone?: string | null
          photo_url?: string | null
          precio_desde?: number | null
          qr_url?: string | null
          rating?: number | null
          servicios?: Json | null
          suspended?: boolean | null
          type?: string | null
          updated_at?: string
          visiting_home?: boolean | null
          whatsapp?: string | null
          whatsapp_contact?: string | null
        }
        Update: {
          address?: string
          category?: string
          created_at?: string
          dashboard_access?: boolean | null
          description?: string | null
          descuento_members?: number | null
          facebook?: string | null
          featured?: boolean | null
          featured_until?: string | null
          hours?: Json | null
          id?: string
          instagram?: string | null
          is_active?: boolean
          lat?: number | null
          latitude?: number | null
          lng?: number | null
          longitude?: number | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          photo_url?: string | null
          precio_desde?: number | null
          qr_url?: string | null
          rating?: number | null
          servicios?: Json | null
          suspended?: boolean | null
          type?: string | null
          updated_at?: string
          visiting_home?: boolean | null
          whatsapp?: string | null
          whatsapp_contact?: string | null
        }
        Relationships: []
      }
      points_config: {
        Row: {
          action_type: string
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          multiplier: number | null
          points_per_unit: number
          updated_at: string | null
        }
        Insert: {
          action_type: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          multiplier?: number | null
          points_per_unit: number
          updated_at?: string | null
        }
        Update: {
          action_type?: string
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          multiplier?: number | null
          points_per_unit?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      points_redemptions: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          points_spent: number
          redemption_code: string | null
          reward_id: string
          status: string | null
          used_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          points_spent: number
          redemption_code?: string | null
          reward_id: string
          status?: string | null
          used_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          points_spent?: number
          redemption_code?: string | null
          reward_id?: string
          status?: string | null
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "points_redemptions_reward_id_fkey"
            columns: ["reward_id"]
            isOneToOne: false
            referencedRelation: "points_rewards"
            referencedColumns: ["id"]
          },
        ]
      }
      points_rewards: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          max_per_user: number | null
          name: string
          points_cost: number
          reward_data: Json | null
          reward_type: string
          reward_value: number | null
          stock_quantity: number | null
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_per_user?: number | null
          name: string
          points_cost: number
          reward_data?: Json | null
          reward_type: string
          reward_value?: number | null
          stock_quantity?: number | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          max_per_user?: number | null
          name?: string
          points_cost?: number
          reward_data?: Json | null
          reward_type?: string
          reward_value?: number | null
          stock_quantity?: number | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      points_transactions: {
        Row: {
          action_type: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          metadata: Json | null
          points: number
          reference_id: string | null
          reference_type: string | null
          transaction_type: string
          user_id: string
        }
        Insert: {
          action_type: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          points: number
          reference_id?: string | null
          reference_type?: string | null
          transaction_type: string
          user_id: string
        }
        Update: {
          action_type?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          metadata?: Json | null
          points?: number
          reference_id?: string | null
          reference_type?: string | null
          transaction_type?: string
          user_id?: string
        }
        Relationships: []
      }
      premium_featured_used: {
        Row: {
          applied_at: string | null
          created_at: string | null
          id: string
          month_year: string
          pet_id: string
          user_id: string
        }
        Insert: {
          applied_at?: string | null
          created_at?: string | null
          id?: string
          month_year: string
          pet_id: string
          user_id: string
        }
        Update: {
          applied_at?: string | null
          created_at?: string | null
          id?: string
          month_year?: string
          pet_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "premium_featured_used_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "premium_featured_used_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      premium_membership_id: {
        Row: {
          id: string | null
        }
        Insert: {
          id?: string | null
        }
        Update: {
          id?: string | null
        }
        Relationships: []
      }
      product_interactions: {
        Row: {
          created_at: string | null
          duration_seconds: number | null
          id: string
          interaction_type: string
          metadata: Json | null
          product_id: string
          quantity: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          interaction_type: string
          metadata?: Json | null
          product_id: string
          quantity?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          duration_seconds?: number | null
          id?: string
          interaction_type?: string
          metadata?: Json | null
          product_id?: string
          quantity?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_interactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_interactions_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "trending_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_interactions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      product_reviews: {
        Row: {
          created_at: string | null
          helpful_votes: number | null
          id: string
          product_id: string
          rating: number | null
          review_text: string | null
          updated_at: string | null
          user_id: string
          verified_purchase: boolean | null
        }
        Insert: {
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          product_id: string
          rating?: number | null
          review_text?: string | null
          updated_at?: string | null
          user_id: string
          verified_purchase?: boolean | null
        }
        Update: {
          created_at?: string | null
          helpful_votes?: number | null
          id?: string
          product_id?: string
          rating?: number | null
          review_text?: string | null
          updated_at?: string | null
          user_id?: string
          verified_purchase?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "trending_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      productos: {
        Row: {
          activo: boolean | null
          categoria_id: string | null
          created_at: string | null
          descripcion: string | null
          dimensiones: Json | null
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          id: string
          imagenes: string[] | null
          last_synced_at: string | null
          marca: string | null
          nombre: string
          peso: number | null
          precio: number
          precio_mayorista: number | null
          precio_oferta: number | null
          sku: string | null
          stock: number | null
          sync_from_petgestion: boolean | null
        }
        Insert: {
          activo?: boolean | null
          categoria_id?: string | null
          created_at?: string | null
          descripcion?: string | null
          dimensiones?: Json | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: string
          imagenes?: string[] | null
          last_synced_at?: string | null
          marca?: string | null
          nombre: string
          peso?: number | null
          precio: number
          precio_mayorista?: number | null
          precio_oferta?: number | null
          sku?: string | null
          stock?: number | null
          sync_from_petgestion?: boolean | null
        }
        Update: {
          activo?: boolean | null
          categoria_id?: string | null
          created_at?: string | null
          descripcion?: string | null
          dimensiones?: Json | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: string
          imagenes?: string[] | null
          last_synced_at?: string | null
          marca?: string | null
          nombre?: string
          peso?: number | null
          precio?: number
          precio_mayorista?: number | null
          precio_oferta?: number | null
          sku?: string | null
          stock?: number | null
          sync_from_petgestion?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "productos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_productos"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          comments_notifications: boolean | null
          created_at: string | null
          email: string | null
          email_notifications_enabled: boolean | null
          fcm_token: string | null
          follows_notifications: boolean | null
          full_name: string | null
          id: string | null
          is_active: boolean
          is_admin: boolean
          last_seen: string | null
          latitud: number | null
          likes_notifications: boolean | null
          longitud: number | null
          notificaciones_geolocalizacion: boolean | null
          notifications_enabled: boolean | null
          payer_id: string | null
          social_notifications_enabled: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          comments_notifications?: boolean | null
          created_at?: string | null
          email?: string | null
          email_notifications_enabled?: boolean | null
          fcm_token?: string | null
          follows_notifications?: boolean | null
          full_name?: string | null
          id?: string | null
          is_active?: boolean
          is_admin?: boolean
          last_seen?: string | null
          latitud?: number | null
          likes_notifications?: boolean | null
          longitud?: number | null
          notificaciones_geolocalizacion?: boolean | null
          notifications_enabled?: boolean | null
          payer_id?: string | null
          social_notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          comments_notifications?: boolean | null
          created_at?: string | null
          email?: string | null
          email_notifications_enabled?: boolean | null
          fcm_token?: string | null
          follows_notifications?: boolean | null
          full_name?: string | null
          id?: string | null
          is_active?: boolean
          is_admin?: boolean
          last_seen?: string | null
          latitud?: number | null
          likes_notifications?: boolean | null
          longitud?: number | null
          notificaciones_geolocalizacion?: boolean | null
          notifications_enabled?: boolean | null
          payer_id?: string | null
          social_notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      profiles_backup: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          email_notifications_enabled: boolean | null
          full_name: string | null
          id: string
          is_admin: boolean | null
          notifications_enabled: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          email_notifications_enabled?: boolean | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          email_notifications_enabled?: boolean | null
          full_name?: string | null
          id?: string
          is_admin?: boolean | null
          notifications_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      promotion_usage: {
        Row: {
          id: string
          order_id: string | null
          promotion_id: string | null
          used_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          order_id?: string | null
          promotion_id?: string | null
          used_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          order_id?: string | null
          promotion_id?: string | null
          used_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "promotion_usage_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      promotional_code_uses: {
        Row: {
          applied: boolean | null
          id: string
          promotional_code_id: string
          used_at: string | null
          user_id: string
        }
        Insert: {
          applied?: boolean | null
          id?: string
          promotional_code_id: string
          used_at?: string | null
          user_id: string
        }
        Update: {
          applied?: boolean | null
          id?: string
          promotional_code_id?: string
          used_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "promotional_code_uses_promotional_code_id_fkey"
            columns: ["promotional_code_id"]
            isOneToOne: false
            referencedRelation: "promotional_codes"
            referencedColumns: ["id"]
          },
        ]
      }
      promotional_codes: {
        Row: {
          benefit_days: number | null
          benefit_type: string
          benefit_value: number | null
          code: string
          created_at: string | null
          created_by: string | null
          current_uses: number | null
          description: string
          id: string
          is_active: boolean | null
          max_uses: number | null
          updated_at: string | null
          valid_from: string | null
          valid_until: string | null
        }
        Insert: {
          benefit_days?: number | null
          benefit_type: string
          benefit_value?: number | null
          code: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          description: string
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Update: {
          benefit_days?: number | null
          benefit_type?: string
          benefit_value?: number | null
          code?: string
          created_at?: string | null
          created_by?: string | null
          current_uses?: number | null
          description?: string
          id?: string
          is_active?: boolean | null
          max_uses?: number | null
          updated_at?: string | null
          valid_from?: string | null
          valid_until?: string | null
        }
        Relationships: []
      }
      promotions: {
        Row: {
          code: string | null
          created_at: string | null
          description: string | null
          discount_type: string
          discount_value: number
          end_date: string
          id: string
          image_url: string | null
          is_active: boolean | null
          min_purchase: number | null
          start_date: string
          title: string
          updated_at: string | null
          usage_limit: number | null
          used_count: number | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount_type: string
          discount_value: number
          end_date: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          min_purchase?: number | null
          start_date: string
          title: string
          updated_at?: string | null
          usage_limit?: number | null
          used_count?: number | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          description?: string | null
          discount_type?: string
          discount_value?: number
          end_date?: string
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          min_purchase?: number | null
          start_date?: string
          title?: string
          updated_at?: string | null
          usage_limit?: number | null
          used_count?: number | null
        }
        Relationships: []
      }
      ratings: {
        Row: {
          created_at: string | null
          id: string
          place_id: string | null
          rating: number
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          place_id?: string | null
          rating: number
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          place_id?: string | null
          rating?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ratings_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      red_de_ayuda: {
        Row: {
          contacto: string | null
          created_at: string | null
          descripcion: string | null
          destacado: boolean | null
          destacado_hasta: string | null
          especie: string | null
          estado: string | null
          expires_at: string | null
          fecha: string | null
          id: string
          imagen_url: string | null
          imagenes_urls: string[] | null
          latitud: number | null
          longitud: number | null
          nombre: string | null
          payment_date: string | null
          payment_id: string | null
          payment_status: string | null
          radio_busqueda: number | null
          sexo: string | null
          tipo_aviso: string
          ubicacion: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          contacto?: string | null
          created_at?: string | null
          descripcion?: string | null
          destacado?: boolean | null
          destacado_hasta?: string | null
          especie?: string | null
          estado?: string | null
          expires_at?: string | null
          fecha?: string | null
          id?: string
          imagen_url?: string | null
          imagenes_urls?: string[] | null
          latitud?: number | null
          longitud?: number | null
          nombre?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_status?: string | null
          radio_busqueda?: number | null
          sexo?: string | null
          tipo_aviso: string
          ubicacion?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          contacto?: string | null
          created_at?: string | null
          descripcion?: string | null
          destacado?: boolean | null
          destacado_hasta?: string | null
          especie?: string | null
          estado?: string | null
          expires_at?: string | null
          fecha?: string | null
          id?: string
          imagen_url?: string | null
          imagenes_urls?: string[] | null
          latitud?: number | null
          longitud?: number | null
          nombre?: string | null
          payment_date?: string | null
          payment_id?: string | null
          payment_status?: string | null
          radio_busqueda?: number | null
          sexo?: string | null
          tipo_aviso?: string
          ubicacion?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      referral_config: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          min_referred_actions: number | null
          referred_reward_days: number | null
          referred_reward_type: string
          referred_reward_value: number | null
          referrer_reward_days: number | null
          referrer_reward_type: string
          referrer_reward_value: number | null
          reward_expiry_days: number | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          min_referred_actions?: number | null
          referred_reward_days?: number | null
          referred_reward_type?: string
          referred_reward_value?: number | null
          referrer_reward_days?: number | null
          referrer_reward_type?: string
          referrer_reward_value?: number | null
          reward_expiry_days?: number | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          min_referred_actions?: number | null
          referred_reward_days?: number | null
          referred_reward_type?: string
          referred_reward_value?: number | null
          referrer_reward_days?: number | null
          referrer_reward_type?: string
          referrer_reward_value?: number | null
          reward_expiry_days?: number | null
          updated_at?: string | null
        }
        Relationships: []
      }
      referral_rewards: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_redeemed: boolean | null
          redeemed_at: string | null
          referral_id: string
          reward_days: number | null
          reward_description: string | null
          reward_type: string
          reward_value: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_redeemed?: boolean | null
          redeemed_at?: string | null
          referral_id: string
          reward_days?: number | null
          reward_description?: string | null
          reward_type: string
          reward_value?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_redeemed?: boolean | null
          redeemed_at?: string | null
          referral_id?: string
          reward_days?: number | null
          reward_description?: string | null
          reward_type?: string
          reward_value?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "referral_rewards_referral_id_fkey"
            columns: ["referral_id"]
            isOneToOne: false
            referencedRelation: "referrals"
            referencedColumns: ["id"]
          },
        ]
      }
      referrals: {
        Row: {
          completed_at: string | null
          created_at: string | null
          id: string
          referral_code: string
          referred_at: string | null
          referred_user_id: string
          referrer_user_id: string
          reward_given: boolean | null
          status: string
          updated_at: string | null
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          referral_code: string
          referred_at?: string | null
          referred_user_id: string
          referrer_user_id: string
          reward_given?: boolean | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          id?: string
          referral_code?: string
          referred_at?: string | null
          referred_user_id?: string
          referrer_user_id?: string
          reward_given?: boolean | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      refugios: {
        Row: {
          address: string | null
          bank_account: string | null
          bank_account_holder: string | null
          bank_account_type: string | null
          bank_alias: string | null
          bank_cbu: string | null
          bank_name: string | null
          causas_urgentes: Json | null
          created_at: string | null
          dashboard_access: boolean | null
          description: string | null
          donation_payments: Json | null
          email: string | null
          facebook: string | null
          id: string
          image: string | null
          instagram: string | null
          mascotas: Json | null
          name: string
          owner_id: string | null
          phone: string | null
          rating: number | null
          website: string | null
          whatsapp: string | null
        }
        Insert: {
          address?: string | null
          bank_account?: string | null
          bank_account_holder?: string | null
          bank_account_type?: string | null
          bank_alias?: string | null
          bank_cbu?: string | null
          bank_name?: string | null
          causas_urgentes?: Json | null
          created_at?: string | null
          dashboard_access?: boolean | null
          description?: string | null
          donation_payments?: Json | null
          email?: string | null
          facebook?: string | null
          id?: string
          image?: string | null
          instagram?: string | null
          mascotas?: Json | null
          name: string
          owner_id?: string | null
          phone?: string | null
          rating?: number | null
          website?: string | null
          whatsapp?: string | null
        }
        Update: {
          address?: string | null
          bank_account?: string | null
          bank_account_holder?: string | null
          bank_account_type?: string | null
          bank_alias?: string | null
          bank_cbu?: string | null
          bank_name?: string | null
          causas_urgentes?: Json | null
          created_at?: string | null
          dashboard_access?: boolean | null
          description?: string | null
          donation_payments?: Json | null
          email?: string | null
          facebook?: string | null
          id?: string
          image?: string | null
          instagram?: string | null
          mascotas?: Json | null
          name?: string
          owner_id?: string | null
          phone?: string | null
          rating?: number | null
          website?: string | null
          whatsapp?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          notes: string | null
          reason: string
          report_type: string
          reported_id: string
          reporter_id: string
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          reason: string
          report_type: string
          reported_id: string
          reporter_id: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          notes?: string | null
          reason?: string
          report_type?: string
          reported_id?: string
          reporter_id?: string
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          place_id: string | null
          rating: number | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          place_id?: string | null
          rating?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          place_id?: string | null
          rating?: number | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_places: {
        Row: {
          created_at: string | null
          id: string
          place_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          place_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          place_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "saved_places_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      shipping_config: {
        Row: {
          base_price: number
          city: string
          created_at: string | null
          depot_coordinates: Json | null
          free_distance_km: number
          free_shipping_enabled: boolean
          free_shipping_min_amount: number | null
          id: string
          is_active: boolean
          max_distance_km: number | null
          price_per_km: number
          province: string
          updated_at: string | null
        }
        Insert: {
          base_price?: number
          city: string
          created_at?: string | null
          depot_coordinates?: Json | null
          free_distance_km?: number
          free_shipping_enabled?: boolean
          free_shipping_min_amount?: number | null
          id?: string
          is_active?: boolean
          max_distance_km?: number | null
          price_per_km?: number
          province?: string
          updated_at?: string | null
        }
        Update: {
          base_price?: number
          city?: string
          created_at?: string | null
          depot_coordinates?: Json | null
          free_distance_km?: number
          free_shipping_enabled?: boolean
          free_shipping_min_amount?: number | null
          id?: string
          is_active?: boolean
          max_distance_km?: number | null
          price_per_km?: number
          province?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      social_posts: {
        Row: {
          caption: string | null
          comments_count: number | null
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          is_premium_boosted: boolean | null
          latitude: number | null
          likes_count: number | null
          location_name: string | null
          longitude: number | null
          media_types: string[]
          media_urls: string[]
          pet_id: string | null
          shares_count: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          caption?: string | null
          comments_count?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_premium_boosted?: boolean | null
          latitude?: number | null
          likes_count?: number | null
          location_name?: string | null
          longitude?: number | null
          media_types: string[]
          media_urls: string[]
          pet_id?: string | null
          shares_count?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          caption?: string | null
          comments_count?: number | null
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          is_premium_boosted?: boolean | null
          latitude?: number | null
          likes_count?: number | null
          location_name?: string | null
          longitude?: number | null
          media_types?: string[]
          media_urls?: string[]
          pet_id?: string | null
          shares_count?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_posts_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "social_posts_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "social_posts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      spatial_ref_sys: {
        Row: {
          auth_name: string | null
          auth_srid: number | null
          proj4text: string | null
          srid: number
          srtext: string | null
        }
        Insert: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid: number
          srtext?: string | null
        }
        Update: {
          auth_name?: string | null
          auth_srid?: number | null
          proj4text?: string | null
          srid?: number
          srtext?: string | null
        }
        Relationships: []
      }
      store_notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          id: string
          message: string
          order_id: string | null
          product_id: string | null
          promotion_id: string | null
          read: boolean | null
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message: string
          order_id?: string | null
          product_id?: string | null
          promotion_id?: string | null
          read?: boolean | null
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          id?: string
          message?: string
          order_id?: string | null
          product_id?: string | null
          promotion_id?: string | null
          read?: boolean | null
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "store_notifications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_notifications_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "trending_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "store_notifications_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
        ]
      }
      store_orders: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          items: Json | null
          mercadopago_id: string | null
          order_id: number
          pago_confirmado: boolean | null
          payment_status: string | null
          petgestion_order_number: string | null
          petgestion_sale_id: string | null
          raw_response: Json | null
          synced_to_petgestion: boolean | null
          total: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          items?: Json | null
          mercadopago_id?: string | null
          order_id: number
          pago_confirmado?: boolean | null
          payment_status?: string | null
          petgestion_order_number?: string | null
          petgestion_sale_id?: string | null
          raw_response?: Json | null
          synced_to_petgestion?: boolean | null
          total?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          items?: Json | null
          mercadopago_id?: string | null
          order_id?: number
          pago_confirmado?: boolean | null
          payment_status?: string | null
          petgestion_order_number?: string | null
          petgestion_sale_id?: string | null
          raw_response?: Json | null
          synced_to_petgestion?: boolean | null
          total?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      store_settings: {
        Row: {
          id: string
          is_suspended: boolean | null
          suspend_message: string | null
          suspend_reason: string | null
          suspended_at: string | null
          suspended_by: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          is_suspended?: boolean | null
          suspend_message?: string | null
          suspend_reason?: string | null
          suspended_at?: string | null
          suspended_by?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          is_suspended?: boolean | null
          suspend_message?: string | null
          suspend_reason?: string | null
          suspended_at?: string | null
          suspended_by?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      tienda_configuracion: {
        Row: {
          direccion_tienda: string | null
          email_tienda: string | null
          fecha_actualizacion: string | null
          id: number
          integraciones_pago: Json | null
          moneda: string | null
          nombre_tienda: string | null
          notificaciones_admin_pedido: boolean | null
          notificaciones_cliente_pedido: boolean | null
          politicas_devolucion: string | null
          politicas_envio: string | null
          telefono_tienda: string | null
        }
        Insert: {
          direccion_tienda?: string | null
          email_tienda?: string | null
          fecha_actualizacion?: string | null
          id?: number
          integraciones_pago?: Json | null
          moneda?: string | null
          nombre_tienda?: string | null
          notificaciones_admin_pedido?: boolean | null
          notificaciones_cliente_pedido?: boolean | null
          politicas_devolucion?: string | null
          politicas_envio?: string | null
          telefono_tienda?: string | null
        }
        Update: {
          direccion_tienda?: string | null
          email_tienda?: string | null
          fecha_actualizacion?: string | null
          id?: number
          integraciones_pago?: Json | null
          moneda?: string | null
          nombre_tienda?: string | null
          notificaciones_admin_pedido?: boolean | null
          notificaciones_cliente_pedido?: boolean | null
          politicas_devolucion?: string | null
          politicas_envio?: string | null
          telefono_tienda?: string | null
        }
        Relationships: []
      }
      user_addresses: {
        Row: {
          address_1: string
          address_2: string | null
          city: string
          country: string | null
          created_at: string | null
          es_predeterminada: boolean | null
          first_name: string | null
          id: string
          last_name: string | null
          latitude: number | null
          longitude: number | null
          nombre: string | null
          phone: string | null
          postcode: string | null
          state: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address_1: string
          address_2?: string | null
          city: string
          country?: string | null
          created_at?: string | null
          es_predeterminada?: boolean | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          latitude?: number | null
          longitude?: number | null
          nombre?: string | null
          phone?: string | null
          postcode?: string | null
          state?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address_1?: string
          address_2?: string | null
          city?: string
          country?: string | null
          created_at?: string | null
          es_predeterminada?: boolean | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          latitude?: number | null
          longitude?: number | null
          nombre?: string | null
          phone?: string | null
          postcode?: string | null
          state?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_carts: {
        Row: {
          cart: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cart?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cart?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_coupons: {
        Row: {
          code: string
          coupon_id: string
          expires_at: string
          id: string
          is_redeemed: boolean
          place_id: string | null
          redeemed_at: string | null
          user_id: string
        }
        Insert: {
          code: string
          coupon_id: string
          expires_at: string
          id?: string
          is_redeemed?: boolean
          place_id?: string | null
          redeemed_at?: string | null
          user_id: string
        }
        Update: {
          code?: string
          coupon_id?: string
          expires_at?: string
          id?: string
          is_redeemed?: boolean
          place_id?: string | null
          redeemed_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_coupons_coupon_id_fkey"
            columns: ["coupon_id"]
            isOneToOne: false
            referencedRelation: "coupons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_coupons_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "places"
            referencedColumns: ["id"]
          },
        ]
      }
      user_memberships: {
        Row: {
          cancelled_at: string | null
          created_at: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          membership_type_id: string
          mercadopago_payment_id: string | null
          mercadopago_subscription_id: string | null
          start_date: string | null
          status: string | null
          type: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          cancelled_at?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          membership_type_id: string
          mercadopago_payment_id?: string | null
          mercadopago_subscription_id?: string | null
          start_date?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          cancelled_at?: string | null
          created_at?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          membership_type_id?: string
          mercadopago_payment_id?: string | null
          mercadopago_subscription_id?: string | null
          start_date?: string | null
          status?: string | null
          type?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_memberships_membership_type_id_fkey"
            columns: ["membership_type_id"]
            isOneToOne: false
            referencedRelation: "membership_types"
            referencedColumns: ["id"]
          },
        ]
      }
      user_notification_preferences: {
        Row: {
          created_at: string | null
          id: string
          new_products: boolean | null
          order_updates: boolean | null
          price_drops: boolean | null
          promotions: boolean | null
          stock_alerts: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          new_products?: boolean | null
          order_updates?: boolean | null
          price_drops?: boolean | null
          promotions?: boolean | null
          stock_alerts?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          new_products?: boolean | null
          order_updates?: boolean | null
          price_drops?: boolean | null
          promotions?: boolean | null
          stock_alerts?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_points: {
        Row: {
          available_points: number
          created_at: string | null
          id: string
          lifetime_points: number
          total_points: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          available_points?: number
          created_at?: string | null
          id?: string
          lifetime_points?: number
          total_points?: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          available_points?: number
          created_at?: string | null
          id?: string
          lifetime_points?: number
          total_points?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_points_transactions: {
        Row: {
          created_at: string | null
          id: string
          points: number
          reason: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          points: number
          reason: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          points?: number
          reason?: string
          user_id?: string
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          avg_session_duration: number | null
          created_at: string | null
          favorite_categories: string[] | null
          id: string
          last_updated: string | null
          preferred_brands: string[] | null
          price_range_max: number | null
          price_range_min: number | null
          total_purchases: number | null
          user_id: string
        }
        Insert: {
          avg_session_duration?: number | null
          created_at?: string | null
          favorite_categories?: string[] | null
          id?: string
          last_updated?: string | null
          preferred_brands?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          total_purchases?: number | null
          user_id: string
        }
        Update: {
          avg_session_duration?: number | null
          created_at?: string | null
          favorite_categories?: string[] | null
          id?: string
          last_updated?: string | null
          preferred_brands?: string[] | null
          price_range_max?: number | null
          price_range_min?: number | null
          total_purchases?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_preferences_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_referral_codes: {
        Row: {
          created_at: string | null
          id: string
          is_active: boolean | null
          referral_code: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          referral_code: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          referral_code?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_streaks: {
        Row: {
          created_at: string | null
          current_streak: number | null
          id: string
          last_login_date: string | null
          longest_streak: number | null
          total_login_days: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_login_date?: string | null
          longest_streak?: number | null
          total_login_days?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          current_streak?: number | null
          id?: string
          last_login_date?: string | null
          longest_streak?: number | null
          total_login_days?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_subscriptions: {
        Row: {
          created_at: string | null
          id: string
          mercado_pago_preapproval_id: string | null
          next_payment_date: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          mercado_pago_preapproval_id?: string | null
          next_payment_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          mercado_pago_preapproval_id?: string | null
          next_payment_date?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_xp_history: {
        Row: {
          action: string
          created_at: string | null
          description: string | null
          id: string
          reference_id: string | null
          reference_type: string | null
          user_id: string
          xp_amount: number
        }
        Insert: {
          action: string
          created_at?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          user_id: string
          xp_amount: number
        }
        Update: {
          action?: string
          created_at?: string | null
          description?: string | null
          id?: string
          reference_id?: string | null
          reference_type?: string | null
          user_id?: string
          xp_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_xp_history_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      user_xp_summary: {
        Row: {
          created_at: string | null
          last_activity: string | null
          total_xp: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          last_activity?: string | null
          total_xp?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          last_activity?: string | null
          total_xp?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_xp_summary_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["user_id"]
          },
        ]
      }
      veterinario_consultas: {
        Row: {
          answer: string
          consulta_date: string | null
          created_at: string | null
          id: string
          pet_id: string | null
          question: string
          user_id: string
        }
        Insert: {
          answer: string
          consulta_date?: string | null
          created_at?: string | null
          id?: string
          pet_id?: string | null
          question: string
          user_id: string
        }
        Update: {
          answer?: string
          consulta_date?: string | null
          created_at?: string | null
          id?: string
          pet_id?: string | null
          question?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "veterinario_consultas_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pet_activity_stats"
            referencedColumns: ["pet_id"]
          },
          {
            foreignKeyName: "veterinario_consultas_pet_id_fkey"
            columns: ["pet_id"]
            isOneToOne: false
            referencedRelation: "pets"
            referencedColumns: ["id"]
          },
        ]
      }
      veterinario_feedback: {
        Row: {
          consulta_id: string | null
          created_at: string | null
          feedback_text: string | null
          id: string
          rating: number | null
          user_id: string
        }
        Insert: {
          consulta_id?: string | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          rating?: number | null
          user_id: string
        }
        Update: {
          consulta_id?: string | null
          created_at?: string | null
          feedback_text?: string | null
          id?: string
          rating?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "veterinario_feedback_consulta_id_fkey"
            columns: ["consulta_id"]
            isOneToOne: false
            referencedRelation: "veterinario_consultas"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlist: {
        Row: {
          created_at: string | null
          id: string
          product_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "productos"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlist_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "trending_products"
            referencedColumns: ["id"]
          },
        ]
      }
      zonas_envio: {
        Row: {
          activa: boolean | null
          codigos_postales: string[] | null
          costo_base: number
          costo_por_kg: number | null
          fecha_actualizacion: string | null
          fecha_creacion: string | null
          id: string
          nombre: string
          paises: string[] | null
          provincias_estados: string[] | null
          tiempo_estimado_entrega: string | null
        }
        Insert: {
          activa?: boolean | null
          codigos_postales?: string[] | null
          costo_base: number
          costo_por_kg?: number | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: string
          nombre: string
          paises?: string[] | null
          provincias_estados?: string[] | null
          tiempo_estimado_entrega?: string | null
        }
        Update: {
          activa?: boolean | null
          codigos_postales?: string[] | null
          costo_base?: number
          costo_por_kg?: number | null
          fecha_actualizacion?: string | null
          fecha_creacion?: string | null
          id?: string
          nombre?: string
          paises?: string[] | null
          provincias_estados?: string[] | null
          tiempo_estimado_entrega?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      chat_notification_stats: {
        Row: {
          latest_notification: string | null
          pending_last_5_min: number | null
          pending_last_hour: number | null
          total_pending: number | null
        }
        Relationships: []
      }
      delivery_stats: {
        Row: {
          date: string | null
          failed_attempts: number | null
          first_attempts: number | null
          second_attempts: number | null
          success_rate: number | null
          successful_deliveries: number | null
          total_attempts: number | null
        }
        Relationships: []
      }
      geography_columns: {
        Row: {
          coord_dimension: number | null
          f_geography_column: unknown
          f_table_catalog: unknown
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Relationships: []
      }
      geometry_columns: {
        Row: {
          coord_dimension: number | null
          f_geometry_column: unknown
          f_table_catalog: string | null
          f_table_name: unknown
          f_table_schema: unknown
          srid: number | null
          type: string | null
        }
        Insert: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Update: {
          coord_dimension?: number | null
          f_geometry_column?: unknown
          f_table_catalog?: string | null
          f_table_name?: unknown
          f_table_schema?: unknown
          srid?: number | null
          type?: string | null
        }
        Relationships: []
      }
      pet_activity_stats: {
        Row: {
          name: string | null
          owner_id: string | null
          pet_id: string | null
          total_views: number | null
          views_today: number | null
          views_week: number | null
        }
        Relationships: []
      }
      refuge_donations_summary: {
        Row: {
          pending_amount: number | null
          refuge_id: string | null
          refuge_name: string | null
          total_amount: number | null
          total_donations: number | null
        }
        Relationships: []
      }
      trending_products: {
        Row: {
          activo: boolean | null
          average_rating: number | null
          categoria_id: string | null
          created_at: string | null
          descripcion: string | null
          id: string | null
          imagenes: string[] | null
          nombre: string | null
          precio: number | null
          precio_oferta: number | null
          recency_score: number | null
          review_count: number | null
          stock: number | null
          total_cart_adds: number | null
          total_purchases: number | null
          total_views: number | null
          trending_score: number | null
        }
        Relationships: [
          {
            foreignKeyName: "productos_categoria_id_fkey"
            columns: ["categoria_id"]
            isOneToOne: false
            referencedRelation: "categorias_productos"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      _postgis_deprecate: {
        Args: { newname: string; oldname: string; version: string }
        Returns: undefined
      }
      _postgis_index_extent: {
        Args: { col: string; tbl: unknown }
        Returns: unknown
      }
      _postgis_pgsql_version: { Args: never; Returns: string }
      _postgis_scripts_pgsql_version: { Args: never; Returns: string }
      _postgis_selectivity: {
        Args: { att_name: string; geom: unknown; mode?: string; tbl: unknown }
        Returns: number
      }
      _postgis_stats: {
        Args: { ""?: string; att_name: string; tbl: unknown }
        Returns: string
      }
      _st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_crosses: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      _st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      _st_intersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      _st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      _st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      _st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_sortablehash: { Args: { geom: unknown }; Returns: number }
      _st_touches: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      _st_voronoi: {
        Args: {
          clip?: unknown
          g1: unknown
          return_polygons?: boolean
          tolerance?: number
        }
        Returns: unknown
      }
      _st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      actualizar_destacados_vencidos: { Args: never; Returns: undefined }
      add_user_points: {
        Args: { p_points: number; p_user_id: string }
        Returns: undefined
      }
      add_user_xp: {
        Args: {
          p_action: string
          p_description: string
          p_reference_id: string
          p_reference_type: string
          p_user_id: string
          p_xp_amount: number
        }
        Returns: undefined
      }
      addauth: { Args: { "": string }; Returns: boolean }
      addgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              new_dim: number
              new_srid_in: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              schema_name: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              new_dim: number
              new_srid: number
              new_type: string
              table_name: string
              use_typmod?: boolean
            }
            Returns: string
          }
      admin_award_points: {
        Args: {
          p_created_by?: string
          p_description?: string
          p_points: number
          p_user_id: string
        }
        Returns: Json
      }
      admin_update_user_membership: {
        Args: {
          p_admin_user_id?: string
          p_end_date?: string
          p_membership_type_id: string
          p_user_id: string
        }
        Returns: boolean
      }
      apply_premium_featured: {
        Args: { p_pet_id: string; p_user_id: string }
        Returns: Json
      }
      apply_promotional_code: {
        Args: { p_code: string; p_user_id: string }
        Returns: boolean
      }
      award_points: {
        Args: {
          p_action_type: string
          p_created_by?: string
          p_description?: string
          p_metadata?: Json
          p_reference_id?: string
          p_user_id: string
        }
        Returns: number
      }
      bytea_to_text: { Args: { data: string }; Returns: string }
      calculate_distance: {
        Args: { lat1: number; lat2: number; lon1: number; lon2: number }
        Returns: number
      }
      can_add_more_pets: { Args: { user_id: string }; Returns: boolean }
      can_claim_daily_reward: { Args: { p_user_id?: string }; Returns: boolean }
      can_create_premium_post: {
        Args: { user_id_param: string }
        Returns: boolean
      }
      can_user_consult: { Args: { p_user_id: string }; Returns: boolean }
      check_daily_notifications: { Args: never; Returns: undefined }
      check_dashboard_access_by_email: {
        Args: { user_email: string }
        Returns: boolean
      }
      check_notification_system: {
        Args: never
        Returns: {
          component: string
          details: string
          status: string
        }[]
      }
      check_shelter_dashboard_access_by_email: {
        Args: { user_email: string }
        Returns: boolean
      }
      check_user_dashboard_access: {
        Args: { user_id: string }
        Returns: boolean
      }
      check_user_shelter_dashboard_access: {
        Args: { user_id: string }
        Returns: boolean
      }
      claim_daily_reward: { Args: { p_user_id?: string }; Returns: Json }
      cleanup_abandoned_orders: { Args: never; Returns: undefined }
      cleanup_database: { Args: never; Returns: undefined }
      cleanup_database_comprehensive: { Args: never; Returns: Json }
      cleanup_duplicate_fcm_tokens: {
        Args: never
        Returns: {
          affected_users: string[]
          cleaned_tokens: number
        }[]
      }
      cleanup_expired_avisos: { Args: never; Returns: undefined }
      cleanup_expired_codes: { Args: never; Returns: undefined }
      cleanup_expired_coupons: { Args: never; Returns: undefined }
      cleanup_fcm_duplicates_now: {
        Args: never
        Returns: {
          cleaned_count: number
          message: string
        }[]
      }
      cleanup_http_response: { Args: never; Returns: undefined }
      complete_referral: {
        Args: { p_referred_user_id: string }
        Returns: boolean
      }
      configure_cleanup_settings: {
        Args: { service_role_key: string; supabase_url: string }
        Returns: undefined
      }
      count_daily_consultas: {
        Args: { p_date?: string; p_user_id: string }
        Returns: number
      }
      create_promotional_code: {
        Args: {
          p_benefit_days?: number
          p_benefit_type: string
          p_benefit_value?: number
          p_created_by?: string
          p_description: string
          p_max_uses?: number
          p_valid_until?: string
        }
        Returns: string
      }
      create_user_referral_code: {
        Args: { p_user_id: string }
        Returns: string
      }
      debug_completed_matches: {
        Args: { user_pet_id: string }
        Returns: {
          join_condition: boolean
          match_id: string
          match_status: string
          pet_id_1: string
          pet_id_2: string
          user_owner_id: string
          user_pet: string
        }[]
      }
      disablelongtransactions: { Args: never; Returns: string }
      dropgeometrycolumn:
        | {
            Args: {
              catalog_name: string
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | {
            Args: {
              column_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { column_name: string; table_name: string }; Returns: string }
      dropgeometrytable:
        | {
            Args: {
              catalog_name: string
              schema_name: string
              table_name: string
            }
            Returns: string
          }
        | { Args: { schema_name: string; table_name: string }; Returns: string }
        | { Args: { table_name: string }; Returns: string }
      enablelongtransactions: { Args: never; Returns: string }
      equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      generate_promotional_code: { Args: never; Returns: string }
      generate_referral_code: { Args: never; Returns: string }
      geometry: { Args: { "": string }; Returns: unknown }
      geometry_above: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_below: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_cmp: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_contained_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_contains_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_distance_box: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_distance_centroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      geometry_eq: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_ge: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_gt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_le: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_left: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_lt: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overabove: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overbelow: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overlaps_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overleft: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_overright: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_right: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_same_3d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geometry_within: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      geomfromewkt: { Args: { "": string }; Returns: unknown }
      get_active_popups_for_user: {
        Args: { p_user_id?: string }
        Returns: {
          button_action: string
          button_text: string
          id: string
          image_url: string
          message: string
          popup_type: string
          priority: number
          title: string
        }[]
      }
      get_all_profiles: {
        Args: never
        Returns: {
          avatar_url: string
          created_at: string
          email: string
          full_name: string
          has_ads: boolean
          has_coupons: boolean
          has_store_discount: boolean
          is_admin: boolean
          max_pets: number
          membership_cancelled_at: string
          membership_description: string
          membership_end_date: string
          membership_id: string
          membership_is_active: boolean
          membership_name: string
          membership_price: number
          membership_start_date: string
          membership_type_id: string
          mercadopago_subscription_id: string
          profile_id: string
          updated_at: string
          user_id: string
        }[]
      }
      get_all_profiles_with_memberships: {
        Args: never
        Returns: {
          avatar_url: string
          email: string
          email_notifications_enabled: boolean
          fcm_token: string
          full_name: string
          has_ads: boolean
          has_coupons: boolean
          has_store_discount: boolean
          is_admin: boolean
          max_pets: number
          membership_cancelled_at: string
          membership_description: string
          membership_end_date: string
          membership_id: string
          membership_is_active: boolean
          membership_name: string
          membership_price: number
          membership_start_date: string
          membership_type_id: string
          mercadopago_subscription_id: string
          notifications_enabled: boolean
          profile_created_at: string
          profile_id: string
          profile_updated_at: string
          user_id: string
        }[]
      }
      get_argentina_date: { Args: never; Returns: string }
      get_available_coupons: {
        Args: { user_id: string }
        Returns: {
          code: string
          description: string
          discount_amount: number
          discount_percentage: number
          id: string
          partner_name: string
          requires_premium: boolean
          title: string
          valid_from: string
          valid_until: string
        }[]
      }
      get_comment_replies: {
        Args: { comment_id_param: string; limit_param?: number }
        Returns: {
          comment_text: string
          created_at: string
          reply_id: string
          user_avatar_url: string
          user_id: string
          user_name: string
        }[]
      }
      get_completed_matches: {
        Args: { user_pet_id: string }
        Returns: {
          created_at: string
          id: string
          is_initiator: boolean
          match_status: string
          pet_age: string
          pet_breed: string
          pet_description: string
          pet_id_1: string
          pet_id_2: string
          pet_image_url: string
          pet_name: string
          pet_owner_id: string
          pet_species: string
          status_1: string
          status_2: string
          unread_messages: number
          updated_at: string
        }[]
      }
      get_coupon_stats: { Args: { p_place_id: string }; Returns: Json }
      get_daily_reward_info: { Args: { p_user_id?: string }; Returns: Json }
      get_deliveries_for_driver: {
        Args: { p_date?: string; p_repartidor_id: string }
        Returns: {
          address: string
          city: string
          customer_name: string
          customer_phone: string
          delivery_attempt: number
          delivery_status: string
          items_count: number
          notes: string
          order_number: string
          pedido_id: string
          total_amount: number
        }[]
      }
      get_geolocation_stats: {
        Args: never
        Returns: {
          coverage_percentage: number
          total_users: number
          users_with_location: number
          users_with_notifications_enabled: number
        }[]
      }
      get_membership_types: {
        Args: never
        Returns: {
          description: string
          has_ads: boolean
          has_coupons: boolean
          has_store_discount: boolean
          id: string
          max_interests_per_pet: number
          max_pets: number
          max_photos_per_pet: number
          name: string
          price: number
        }[]
      }
      get_nearby_users: {
        Args: { radius_meters?: number; target_lat: number; target_lon: number }
        Returns: {
          distance_meters: number
          fcm_token: string
          notifications_enabled: boolean
          user_id: string
        }[]
      }
      get_pending_matches: {
        Args: { user_pet_id: string }
        Returns: {
          created_at: string
          is_initiator: boolean
          match_id: string
          match_status: string
          pet_age: string
          pet_breed: string
          pet_description: string
          pet_id_1: string
          pet_id_2: string
          pet_image_url: string
          pet_name: string
          pet_owner_id: string
          pet_species: string
          status_1: string
          status_2: string
          updated_at: string
        }[]
      }
      get_personalized_recommendations: {
        Args: { input_user_id: string; result_limit?: number }
        Returns: {
          activo: boolean
          categoria_id: string
          descripcion: string
          id: string
          imagenes: string[]
          nombre: string
          personalization_score: number
          precio: number
          precio_oferta: number
          stock: number
        }[]
      }
      get_place_unique_visits_count: {
        Args: { p_end_date?: string; p_place_id: string; p_start_date?: string }
        Returns: number
      }
      get_place_visits_count: {
        Args: { p_end_date?: string; p_place_id: string; p_start_date?: string }
        Returns: number
      }
      get_post_comments: {
        Args: {
          limit_param?: number
          offset_param?: number
          post_id_param: string
        }
        Returns: {
          comment_id: string
          comment_text: string
          created_at: string
          parent_comment_id: string
          post_id: string
          replies_count: number
          user_avatar_url: string
          user_id: string
          user_name: string
        }[]
      }
      get_post_stats: {
        Args: { post_id_param: string }
        Returns: {
          recent_activity: number
          total_comments: number
          total_likes: number
          total_shares: number
        }[]
      }
      get_potential_matches: {
        Args: { page_limit?: number; page_offset?: number; user_pet_id: string }
        Returns: {
          age: string
          breed: string
          description: string
          featured: boolean
          featured_until: string
          id: string
          image_url: string
          images: string[]
          interest: string[]
          name: string
          owner_id: string
          species: string
        }[]
      }
      get_product_rating: {
        Args: { p_product_id: string }
        Returns: {
          average_rating: number
          review_count: number
        }[]
      }
      get_products_bought_together: {
        Args: { p_limit?: number; p_product_id: string }
        Returns: {
          id: string
          imagenes: Json
          nombre: string
          precio: number
          precio_oferta: number
          stock: number
          together_count: number
        }[]
      }
      get_products_with_categories: {
        Args: never
        Returns: {
          activo: boolean
          categoria_id: string
          categoria_nombre: string
          created_at: string
          descripcion: string
          dimensiones: Json
          fecha_actualizacion: string
          fecha_creacion: string
          id: string
          imagenes: string[]
          marca: string
          nombre: string
          peso: number
          precio: number
          precio_mayorista: number
          precio_oferta: number
          sku: string
          stock: number
        }[]
      }
      get_promotional_codes_stats: {
        Args: never
        Returns: {
          active_codes: number
          recent_uses: number
          total_codes: number
          total_uses: number
          used_codes: number
        }[]
      }
      get_similar_products: {
        Args: {
          input_product_id: string
          input_user_id: string
          result_limit?: number
        }
        Returns: {
          activo: boolean
          categoria_id: string
          descripcion: string
          id: string
          imagenes: string[]
          nombre: string
          precio: number
          precio_oferta: number
          similarity_score: number
          stock: number
        }[]
      }
      get_social_feed: {
        Args: {
          limit_param?: number
          offset_param?: number
          user_id_param?: string
        }
        Returns: {
          caption: string
          comments_count: number
          created_at: string
          expires_at: string
          is_liked_by_user: boolean
          is_premium_boosted: boolean
          likes_count: number
          location_name: string
          media_types: string[]
          media_urls: string[]
          pet_id: string
          pet_name: string
          pet_species: string
          post_id: string
          user_avatar_url: string
          user_id: string
          user_name: string
        }[]
      }
      get_suggested_users: {
        Args: { limit_param?: number; user_id_param: string }
        Returns: {
          mutual_connections: number
          pets_count: number
          posts_count: number
          suggested_user_id: string
          user_avatar_url: string
          user_name: string
        }[]
      }
      get_trending_posts: {
        Args: { hours_param?: number; limit_param?: number }
        Returns: {
          activity_score: number
          caption: string
          comments_count: number
          created_at: string
          is_premium_boosted: boolean
          likes_count: number
          location_name: string
          media_types: string[]
          media_urls: string[]
          pet_id: string
          pet_name: string
          pet_species: string
          post_id: string
          user_avatar_url: string
          user_id: string
          user_name: string
        }[]
      }
      get_user_active_benefits: {
        Args: { p_user_id: string }
        Returns: {
          benefit_data: Json
          benefit_type: string
          created_at: string
          expires_at: string
          id: string
          status: string
        }[]
      }
      get_user_favorite_categories: {
        Args: { p_user_id: string }
        Returns: {
          categoria_id: string
          category_name: string
          purchase_count: number
        }[]
      }
      get_user_frequent_products: {
        Args: { p_limit?: number; p_user_id: string }
        Returns: {
          id: string
          imagenes: Json
          last_purchase_date: string
          nombre: string
          precio: number
          precio_oferta: number
          purchase_count: number
          stock: number
        }[]
      }
      get_user_membership: {
        Args: { user_id: string }
        Returns: {
          end_date: string
          has_ads: boolean
          has_coupons: boolean
          has_store_discount: boolean
          is_active: boolean
          max_interests_per_pet: number
          max_pets: number
          max_photos_per_pet: number
          membership_description: string
          membership_name: string
          membership_type_id: string
          price: number
          start_date: string
        }[]
      }
      get_user_points: {
        Args: { p_user_id: string }
        Returns: {
          available_points: number
          lifetime_points: number
          total_points: number
        }[]
      }
      get_user_points_history: {
        Args: { p_limit?: number; p_offset?: number; p_user_id: string }
        Returns: {
          created_at: string
          id: string
          points: number
          reason: string
        }[]
      }
      get_user_referral_rewards: {
        Args: { p_user_id: string }
        Returns: {
          created_at: string
          expires_at: string
          id: string
          is_redeemed: boolean
          reward_days: number
          reward_description: string
          reward_type: string
          reward_value: number
        }[]
      }
      get_user_referral_stats: {
        Args: { p_user_id: string }
        Returns: {
          completed_referrals: number
          pending_referrals: number
          referral_code: string
          total_referrals: number
          total_rewards: number
          unused_rewards: number
        }[]
      }
      get_user_total_points: { Args: { p_user_id: string }; Returns: number }
      gettransactionid: { Args: never; Returns: unknown }
      handle_expired_cancelled_memberships: { Args: never; Returns: undefined }
      has_premium_featured_available: {
        Args: { p_user_id: string }
        Returns: Json
      }
      http: {
        Args: { request: Database["public"]["CompositeTypes"]["http_request"] }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "http_request"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_delete:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_get:
        | {
            Args: { uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_head: {
        Args: { uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_header: {
        Args: { field: string; value: string }
        Returns: Database["public"]["CompositeTypes"]["http_header"]
        SetofOptions: {
          from: "*"
          to: "http_header"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_list_curlopt: {
        Args: never
        Returns: {
          curlopt: string
          value: string
        }[]
      }
      http_patch: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_post:
        | {
            Args: { content: string; content_type: string; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
        | {
            Args: { data: Json; uri: string }
            Returns: Database["public"]["CompositeTypes"]["http_response"]
            SetofOptions: {
              from: "*"
              to: "http_response"
              isOneToOne: true
              isSetofReturn: false
            }
          }
      http_put: {
        Args: { content: string; content_type: string; uri: string }
        Returns: Database["public"]["CompositeTypes"]["http_response"]
        SetofOptions: {
          from: "*"
          to: "http_response"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      http_reset_curlopt: { Args: never; Returns: boolean }
      http_set_curlopt: {
        Args: { curlopt: string; value: string }
        Returns: boolean
      }
      is_user_admin: { Args: never; Returns: boolean }
      log_cron_execution: {
        Args: { details?: Json; job_name: string; status?: string }
        Returns: undefined
      }
      longtransactionsenabled: { Args: never; Returns: boolean }
      mark_pets_deactivated_by_downgrade: {
        Args: { p_selected_pet_id: string; p_user_id: string }
        Returns: undefined
      }
      mark_social_notifications_read: {
        Args: { post_id_param?: string; user_id_param: string }
        Returns: undefined
      }
      monitor_database_size: { Args: never; Returns: Json }
      notify_avisos_expiring_soon: { Args: never; Returns: undefined }
      notify_membership_expiring: { Args: never; Returns: undefined }
      populate_geometry_columns:
        | { Args: { tbl_oid: unknown; use_typmod?: boolean }; Returns: number }
        | { Args: { use_typmod?: boolean }; Returns: string }
      postgis_constraint_dims: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_srid: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: number
      }
      postgis_constraint_type: {
        Args: { geomcolumn: string; geomschema: string; geomtable: string }
        Returns: string
      }
      postgis_extensions_upgrade: { Args: never; Returns: string }
      postgis_full_version: { Args: never; Returns: string }
      postgis_geos_version: { Args: never; Returns: string }
      postgis_lib_build_date: { Args: never; Returns: string }
      postgis_lib_revision: { Args: never; Returns: string }
      postgis_lib_version: { Args: never; Returns: string }
      postgis_libjson_version: { Args: never; Returns: string }
      postgis_liblwgeom_version: { Args: never; Returns: string }
      postgis_libprotobuf_version: { Args: never; Returns: string }
      postgis_libxml_version: { Args: never; Returns: string }
      postgis_proj_version: { Args: never; Returns: string }
      postgis_scripts_build_date: { Args: never; Returns: string }
      postgis_scripts_installed: { Args: never; Returns: string }
      postgis_scripts_released: { Args: never; Returns: string }
      postgis_svn_version: { Args: never; Returns: string }
      postgis_type_name: {
        Args: {
          coord_dimension: number
          geomname: string
          use_new_name?: boolean
        }
        Returns: string
      }
      postgis_version: { Args: never; Returns: string }
      postgis_wagyu_version: { Args: never; Returns: string }
      process_daily_health_reminders: { Args: never; Returns: Json }
      process_points_reward_benefit: {
        Args: {
          p_redemption_code: string
          p_redemption_id: string
          p_reward_cost: number
          p_reward_id: string
          p_reward_type: string
          p_user_id: string
        }
        Returns: undefined
      }
      process_referral: {
        Args: { p_referral_code: string; p_referred_user_id: string }
        Returns: boolean
      }
      reactivate_pets_on_premium_upgrade: {
        Args: { p_user_id: string }
        Returns: undefined
      }
      record_place_visit: {
        Args: {
          p_ip_address?: unknown
          p_place_id: string
          p_session_id?: string
          p_user_agent?: string
          p_user_id?: string
        }
        Returns: boolean
      }
      redeem_coupon: {
        Args: { p_coupon_id: string; p_user_id: string }
        Returns: {
          code: string
          expires_at: string
          is_expired: boolean
          redeemed_at: string
        }[]
      }
      redeem_points_reward: {
        Args: { p_reward_id: string; p_user_id: string }
        Returns: {
          message: string
          redemption_code: string
          redemption_id: string
          success: boolean
        }[]
      }
      redeem_referral_reward: {
        Args: { p_reward_id: string; p_user_id: string }
        Returns: boolean
      }
      refresh_trending_products: { Args: never; Returns: undefined }
      register_pet_view: {
        Args: { p_pet_id: string; p_viewer_id?: string }
        Returns: string
      }
      schedule_delivery_retry: {
        Args: {
          p_notes?: string
          p_pedido_id: string
          p_repartidor_id: string
          p_status: string
        }
        Returns: boolean
      }
      send_automatic_notification: {
        Args: {
          message: string
          metadata?: Json
          notification_type?: string
          title: string
          user_id: string
        }
        Returns: undefined
      }
      set_timezone: { Args: { timezone: string }; Returns: undefined }
      st_3dclosestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3ddistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dintersects: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_3dlongestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmakebox: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_3dmaxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_3dshortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_addpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_angle:
        | { Args: { line1: unknown; line2: unknown }; Returns: number }
        | {
            Args: { pt1: unknown; pt2: unknown; pt3: unknown; pt4?: unknown }
            Returns: number
          }
      st_area:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_asencodedpolyline: {
        Args: { geom: unknown; nprecision?: number }
        Returns: string
      }
      st_asewkt: { Args: { "": string }; Returns: string }
      st_asgeojson:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | {
            Args: {
              geom_column?: string
              maxdecimaldigits?: number
              pretty_bool?: boolean
              r: Record<string, unknown>
            }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_asgml:
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
            }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
        | {
            Args: {
              geog: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown
              id?: string
              maxdecimaldigits?: number
              nprefix?: string
              options?: number
              version: number
            }
            Returns: string
          }
      st_askml:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; nprefix?: string }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_aslatlontext: {
        Args: { geom: unknown; tmpl?: string }
        Returns: string
      }
      st_asmarc21: { Args: { format?: string; geom: unknown }; Returns: string }
      st_asmvtgeom: {
        Args: {
          bounds: unknown
          buffer?: number
          clip_geom?: boolean
          extent?: number
          geom: unknown
        }
        Returns: unknown
      }
      st_assvg:
        | {
            Args: { geog: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | {
            Args: { geom: unknown; maxdecimaldigits?: number; rel?: number }
            Returns: string
          }
        | { Args: { "": string }; Returns: string }
      st_astext: { Args: { "": string }; Returns: string }
      st_astwkb:
        | {
            Args: {
              geom: unknown
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
        | {
            Args: {
              geom: unknown[]
              ids: number[]
              prec?: number
              prec_m?: number
              prec_z?: number
              with_boxes?: boolean
              with_sizes?: boolean
            }
            Returns: string
          }
      st_asx3d: {
        Args: { geom: unknown; maxdecimaldigits?: number; options?: number }
        Returns: string
      }
      st_azimuth:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: number }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_boundingdiagonal: {
        Args: { fits?: boolean; geom: unknown }
        Returns: unknown
      }
      st_buffer:
        | {
            Args: { geom: unknown; options?: string; radius: number }
            Returns: unknown
          }
        | {
            Args: { geom: unknown; quadsegs: number; radius: number }
            Returns: unknown
          }
      st_centroid: { Args: { "": string }; Returns: unknown }
      st_clipbybox2d: {
        Args: { box: unknown; geom: unknown }
        Returns: unknown
      }
      st_closestpoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_collect: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_concavehull: {
        Args: {
          param_allow_holes?: boolean
          param_geom: unknown
          param_pctconvex: number
        }
        Returns: unknown
      }
      st_contains: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_containsproperly: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_coorddim: { Args: { geometry: unknown }; Returns: number }
      st_coveredby:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_covers:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_crosses: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_curvetoline: {
        Args: { flags?: number; geom: unknown; tol?: number; toltype?: number }
        Returns: unknown
      }
      st_delaunaytriangles: {
        Args: { flags?: number; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_difference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_disjoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_distance:
        | {
            Args: { geog1: unknown; geog2: unknown; use_spheroid?: boolean }
            Returns: number
          }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
      st_distancesphere:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: number }
        | {
            Args: { geom1: unknown; geom2: unknown; radius: number }
            Returns: number
          }
      st_distancespheroid: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_dwithin: {
        Args: {
          geog1: unknown
          geog2: unknown
          tolerance: number
          use_spheroid?: boolean
        }
        Returns: boolean
      }
      st_equals: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_expand:
        | { Args: { box: unknown; dx: number; dy: number }; Returns: unknown }
        | {
            Args: { box: unknown; dx: number; dy: number; dz?: number }
            Returns: unknown
          }
        | {
            Args: {
              dm?: number
              dx: number
              dy: number
              dz?: number
              geom: unknown
            }
            Returns: unknown
          }
      st_force3d: { Args: { geom: unknown; zvalue?: number }; Returns: unknown }
      st_force3dm: {
        Args: { geom: unknown; mvalue?: number }
        Returns: unknown
      }
      st_force3dz: {
        Args: { geom: unknown; zvalue?: number }
        Returns: unknown
      }
      st_force4d: {
        Args: { geom: unknown; mvalue?: number; zvalue?: number }
        Returns: unknown
      }
      st_generatepoints:
        | { Args: { area: unknown; npoints: number }; Returns: unknown }
        | {
            Args: { area: unknown; npoints: number; seed: number }
            Returns: unknown
          }
      st_geogfromtext: { Args: { "": string }; Returns: unknown }
      st_geographyfromtext: { Args: { "": string }; Returns: unknown }
      st_geohash:
        | { Args: { geog: unknown; maxchars?: number }; Returns: string }
        | { Args: { geom: unknown; maxchars?: number }; Returns: string }
      st_geomcollfromtext: { Args: { "": string }; Returns: unknown }
      st_geometricmedian: {
        Args: {
          fail_if_not_converged?: boolean
          g: unknown
          max_iter?: number
          tolerance?: number
        }
        Returns: unknown
      }
      st_geometryfromtext: { Args: { "": string }; Returns: unknown }
      st_geomfromewkt: { Args: { "": string }; Returns: unknown }
      st_geomfromgeojson:
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": Json }; Returns: unknown }
        | { Args: { "": string }; Returns: unknown }
      st_geomfromgml: { Args: { "": string }; Returns: unknown }
      st_geomfromkml: { Args: { "": string }; Returns: unknown }
      st_geomfrommarc21: { Args: { marc21xml: string }; Returns: unknown }
      st_geomfromtext: { Args: { "": string }; Returns: unknown }
      st_gmltosql: { Args: { "": string }; Returns: unknown }
      st_hasarc: { Args: { geometry: unknown }; Returns: boolean }
      st_hausdorffdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_hexagon: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_hexagongrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_interpolatepoint: {
        Args: { line: unknown; point: unknown }
        Returns: number
      }
      st_intersection: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_intersects:
        | { Args: { geog1: unknown; geog2: unknown }; Returns: boolean }
        | { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_isvaliddetail: {
        Args: { flags?: number; geom: unknown }
        Returns: Database["public"]["CompositeTypes"]["valid_detail"]
        SetofOptions: {
          from: "*"
          to: "valid_detail"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      st_length:
        | { Args: { geog: unknown; use_spheroid?: boolean }; Returns: number }
        | { Args: { "": string }; Returns: number }
      st_letters: { Args: { font?: Json; letters: string }; Returns: unknown }
      st_linecrossingdirection: {
        Args: { line1: unknown; line2: unknown }
        Returns: number
      }
      st_linefromencodedpolyline: {
        Args: { nprecision?: number; txtin: string }
        Returns: unknown
      }
      st_linefromtext: { Args: { "": string }; Returns: unknown }
      st_linelocatepoint: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_linetocurve: { Args: { geometry: unknown }; Returns: unknown }
      st_locatealong: {
        Args: { geometry: unknown; leftrightoffset?: number; measure: number }
        Returns: unknown
      }
      st_locatebetween: {
        Args: {
          frommeasure: number
          geometry: unknown
          leftrightoffset?: number
          tomeasure: number
        }
        Returns: unknown
      }
      st_locatebetweenelevations: {
        Args: { fromelevation: number; geometry: unknown; toelevation: number }
        Returns: unknown
      }
      st_longestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makebox2d: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makeline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_makevalid: {
        Args: { geom: unknown; params: string }
        Returns: unknown
      }
      st_maxdistance: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: number
      }
      st_minimumboundingcircle: {
        Args: { inputgeom: unknown; segs_per_quarter?: number }
        Returns: unknown
      }
      st_mlinefromtext: { Args: { "": string }; Returns: unknown }
      st_mpointfromtext: { Args: { "": string }; Returns: unknown }
      st_mpolyfromtext: { Args: { "": string }; Returns: unknown }
      st_multilinestringfromtext: { Args: { "": string }; Returns: unknown }
      st_multipointfromtext: { Args: { "": string }; Returns: unknown }
      st_multipolygonfromtext: { Args: { "": string }; Returns: unknown }
      st_node: { Args: { g: unknown }; Returns: unknown }
      st_normalize: { Args: { geom: unknown }; Returns: unknown }
      st_offsetcurve: {
        Args: { distance: number; line: unknown; params?: string }
        Returns: unknown
      }
      st_orderingequals: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_overlaps: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: boolean
      }
      st_perimeter: {
        Args: { geog: unknown; use_spheroid?: boolean }
        Returns: number
      }
      st_pointfromtext: { Args: { "": string }; Returns: unknown }
      st_pointm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
        }
        Returns: unknown
      }
      st_pointz: {
        Args: {
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_pointzm: {
        Args: {
          mcoordinate: number
          srid?: number
          xcoordinate: number
          ycoordinate: number
          zcoordinate: number
        }
        Returns: unknown
      }
      st_polyfromtext: { Args: { "": string }; Returns: unknown }
      st_polygonfromtext: { Args: { "": string }; Returns: unknown }
      st_project: {
        Args: { azimuth: number; distance: number; geog: unknown }
        Returns: unknown
      }
      st_quantizecoordinates: {
        Args: {
          g: unknown
          prec_m?: number
          prec_x: number
          prec_y?: number
          prec_z?: number
        }
        Returns: unknown
      }
      st_reduceprecision: {
        Args: { geom: unknown; gridsize: number }
        Returns: unknown
      }
      st_relate: { Args: { geom1: unknown; geom2: unknown }; Returns: string }
      st_removerepeatedpoints: {
        Args: { geom: unknown; tolerance?: number }
        Returns: unknown
      }
      st_segmentize: {
        Args: { geog: unknown; max_segment_length: number }
        Returns: unknown
      }
      st_setsrid:
        | { Args: { geog: unknown; srid: number }; Returns: unknown }
        | { Args: { geom: unknown; srid: number }; Returns: unknown }
      st_sharedpaths: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_shortestline: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_simplifypolygonhull: {
        Args: { geom: unknown; is_outer?: boolean; vertex_fraction: number }
        Returns: unknown
      }
      st_split: { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
      st_square: {
        Args: { cell_i: number; cell_j: number; origin?: unknown; size: number }
        Returns: unknown
      }
      st_squaregrid: {
        Args: { bounds: unknown; size: number }
        Returns: Record<string, unknown>[]
      }
      st_srid:
        | { Args: { geog: unknown }; Returns: number }
        | { Args: { geom: unknown }; Returns: number }
      st_subdivide: {
        Args: { geom: unknown; gridsize?: number; maxvertices?: number }
        Returns: unknown[]
      }
      st_swapordinates: {
        Args: { geom: unknown; ords: unknown }
        Returns: unknown
      }
      st_symdifference: {
        Args: { geom1: unknown; geom2: unknown; gridsize?: number }
        Returns: unknown
      }
      st_symmetricdifference: {
        Args: { geom1: unknown; geom2: unknown }
        Returns: unknown
      }
      st_tileenvelope: {
        Args: {
          bounds?: unknown
          margin?: number
          x: number
          y: number
          zoom: number
        }
        Returns: unknown
      }
      st_touches: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_transform:
        | {
            Args: { from_proj: string; geom: unknown; to_proj: string }
            Returns: unknown
          }
        | {
            Args: { from_proj: string; geom: unknown; to_srid: number }
            Returns: unknown
          }
        | { Args: { geom: unknown; to_proj: string }; Returns: unknown }
      st_triangulatepolygon: { Args: { g1: unknown }; Returns: unknown }
      st_union:
        | { Args: { geom1: unknown; geom2: unknown }; Returns: unknown }
        | {
            Args: { geom1: unknown; geom2: unknown; gridsize: number }
            Returns: unknown
          }
      st_voronoilines: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_voronoipolygons: {
        Args: { extend_to?: unknown; g1: unknown; tolerance?: number }
        Returns: unknown
      }
      st_within: { Args: { geom1: unknown; geom2: unknown }; Returns: boolean }
      st_wkbtosql: { Args: { wkb: string }; Returns: unknown }
      st_wkttosql: { Args: { "": string }; Returns: unknown }
      st_wrapx: {
        Args: { geom: unknown; move: number; wrap: number }
        Returns: unknown
      }
      sync_petgestion_job: { Args: never; Returns: undefined }
      test_admin_notification: {
        Args: { p_message: string; p_title: string; p_user_id: string }
        Returns: Json
      }
      test_admin_notification_simple: {
        Args: { p_message: string; p_title: string; p_user_id: string }
        Returns: Json
      }
      test_fcm_notification: {
        Args: { p_message: string; p_title: string; p_user_id: string }
        Returns: Json
      }
      text_to_bytea: { Args: { data: string }; Returns: string }
      track_notification_click: {
        Args: { p_notification_id: string }
        Returns: undefined
      }
      track_notification_interaction: {
        Args: { p_interaction_type: string; p_notification_id: string }
        Returns: undefined
      }
      track_notification_open: {
        Args: { p_notification_id: string }
        Returns: undefined
      }
      unlockrows: { Args: { "": string }; Returns: number }
      update_campaign_stats: {
        Args: { p_amount: number; p_campaign_id: string }
        Returns: undefined
      }
      update_expired_memberships: { Args: never; Returns: undefined }
      update_refugio_rating: {
        Args: { new_rating: number; refugio_id: string }
        Returns: boolean
      }
      update_user_activity: { Args: { user_id: string }; Returns: undefined }
      update_user_location: {
        Args: { new_lat: number; new_lon: number; user_uuid: string }
        Returns: boolean
      }
      update_user_membership: {
        Args: {
          p_end_date: string
          p_membership_type_id: string
          p_user_id: string
        }
        Returns: boolean
      }
      update_user_streak_on_login: {
        Args: { p_user_id: string }
        Returns: number
      }
      updategeometrysrid: {
        Args: {
          catalogn_name: string
          column_name: string
          new_srid_in: number
          schema_name: string
          table_name: string
        }
        Returns: string
      }
      urlencode:
        | { Args: { data: Json }; Returns: string }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
        | {
            Args: { string: string }
            Returns: {
              error: true
            } & "Could not choose the best candidate function between: public.urlencode(string => bytea), public.urlencode(string => varchar). Try renaming the parameters or the function itself in the database so function overloading can be resolved"
          }
      validate_coupon_code: {
        Args: { coupon_code: string; place_id?: string }
        Returns: Json
      }
      validate_promotional_code: {
        Args: { p_code: string; p_user_id: string }
        Returns: {
          benefit_days: number
          benefit_type: string
          benefit_value: number
          is_valid: boolean
          message: string
          promotional_code_id: string
        }[]
      }
      validate_store_coupon: {
        Args: {
          p_cart_total?: number
          p_coupon_code: string
          p_user_id?: string
        }
        Returns: Json
      }
      validate_unified_coupon: {
        Args: {
          p_cart_total?: number
          p_coupon_code: string
          p_user_id: string
        }
        Returns: Json
      }
      verify_notification_system: {
        Args: never
        Returns: {
          action_needed: string
          component: string
          status: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      geometry_dump: {
        path: number[] | null
        geom: unknown
      }
      http_header: {
        field: string | null
        value: string | null
      }
      http_request: {
        method: unknown
        uri: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content_type: string | null
        content: string | null
      }
      http_response: {
        status: number | null
        content_type: string | null
        headers: Database["public"]["CompositeTypes"]["http_header"][] | null
        content: string | null
      }
      valid_detail: {
        valid: boolean | null
        reason: string | null
        location: unknown
      }
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

