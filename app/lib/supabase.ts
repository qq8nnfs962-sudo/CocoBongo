import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Database types
export interface Reservation {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  table_type: 'standard' | 'vip' | 'ultra_vip';
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  performer: string;
  image_url: string;
  tickets_available: number;
  vip_available: number;
  ticket_price: number;
  vip_price: number;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  video_url?: string;
  type: 'photo' | 'video';
  created_at: string;
}

export interface User {
  id: string;
  email: string;
  password_hash: string;
  is_admin: boolean;
  created_at: string;
}

// Supabase functions
export const supabaseHelpers = {
  reservations: {
    async create(reservation: Omit<Reservation, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('reservations')
        .insert([reservation])
        .select();
      return { data: data?.[0], error };
    },

    async getAll() {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .order('date', { ascending: false });
      return { data, error };
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    },

    async update(id: string, updates: Partial<Reservation>) {
      const { data, error } = await supabase
        .from('reservations')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', id);
      return { error };
    },

    async checkAvailability(date: string, tableType: string) {
      const { data, error } = await supabase
        .from('reservations')
        .select('*')
        .eq('date', date)
        .eq('table_type', tableType)
        .eq('status', 'confirmed');
      return { data: data?.length ?? 0, error };
    },
  },

  events: {
    async create(event: Omit<Event, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('events')
        .insert([event])
        .select();
      return { data: data?.[0], error };
    },

    async getAll() {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });
      return { data, error };
    },

    async getById(id: string) {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();
      return { data, error };
    },

    async update(id: string, updates: Partial<Event>) {
      const { data, error } = await supabase
        .from('events')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      return { data, error };
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('events')
        .delete()
        .eq('id', id);
      return { error };
    },
  },

  gallery: {
    async create(item: Omit<GalleryItem, 'id' | 'created_at'>) {
      const { data, error } = await supabase
        .from('gallery')
        .insert([item])
        .select();
      return { data: data?.[0], error };
    },

    async getAll() {
      const { data, error } = await supabase
        .from('gallery')
        .select('*')
        .order('created_at', { ascending: false });
      return { data, error };
    },

    async delete(id: string) {
      const { error } = await supabase
        .from('gallery')
        .delete()
        .eq('id', id);
      return { error };
    },
  },
};
