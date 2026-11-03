import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Story = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  cover_image_url: string | null;
  published: boolean;
  created_at: string;
};

export type Book = {
  id: string;
  title: string;
  author: string;
  description: string;
  price_cents: number;
  cover_image_url: string | null;
  download_url: string | null;
  buy_url: string | null;
  published: boolean;
  created_at: string;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
};
