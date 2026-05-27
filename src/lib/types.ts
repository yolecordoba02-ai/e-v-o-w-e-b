export type Era = 'web10' | 'web20' | 'general';

export type PostStatus = 'draft' | 'published';

export interface User {
  id: string;
  name: string;
  email: string;
  password_hash?: string;
  role: 'admin';
  is_active: boolean;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  era: Era;
  year: number;
  excerpt: string;
  content: string;
  cover_image_url?: string;
  status: PostStatus;
  created_by?: string | null;
  published_at?: string | null;
  created_at: string;
  updated_at: string;
}

export interface PostWithStats extends Post {
  commentCount: number;
  reactionCount: number;
}

export interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  is_featured: boolean;
  created_at: string;
}

export interface Reaction {
  id: string;
  post_id: string;
  device_id: string;
  created_at: string;
}

export interface AuditEntry {
  id: string;
  user_id: string;
  action: string;
  entity_id?: string;
  entity_type?: string;
  created_at: string;
}

export interface SeedUser {
  name: string;
  email: string;
  password_hash: string;
  role: 'admin';
}

export interface SeedPost {
  slug: string;
  title: string;
  era: Era;
  year: number;
  excerpt: string;
  content: string;
  status: PostStatus;
}

export interface SeedData {
  config: { version: string; system_name: string };
  users: SeedUser[];
  posts: SeedPost[];
}
