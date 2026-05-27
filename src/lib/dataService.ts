import { supabase } from './supabase';
import { readSeedData } from './seedReader';
import { appendAuditLog } from './blobAudit';
import { uploadPostCover as uploadCoverToBlob } from './blobImages';
import type { AuditEntry, Comment, Post, PostWithStats, Reaction, SeedData, User } from './types';

function isSeedMode(): boolean {
  return !process.env.SUPABASE_SERVICE_ROLE_KEY || !process.env.DATABASE_URL;
}

function parseDate(value: unknown): string {
  return typeof value === 'string' ? value : new Date().toISOString();
}

function seedPosts(): Post[] {
  const seed = readSeedData();
  const now = new Date().toISOString();
  return seed.posts.map((post, index) => ({
    id: `seed-post-${index}`,
    slug: post.slug,
    title: post.title,
    era: post.era,
    year: post.year,
    excerpt: post.excerpt,
    content: post.content,
    cover_image_url: undefined,
    status: post.status,
    created_by: null,
    published_at: now,
    created_at: now,
    updated_at: now
  }));
}

function seedUsers(): User[] {
  const seed = readSeedData();
  return seed.users.map((user, index) => ({
    id: `seed-user-${index}`,
    name: user.name,
    email: user.email,
    password_hash: user.password_hash,
    role: 'admin',
    is_active: true
  }));
}

export async function getSystemMode(): Promise<'seed' | 'live'> {
  return isSeedMode() ? 'seed' : 'live';
}

export async function recordAudit(entry: Omit<AuditEntry, 'id' | 'created_at'>): Promise<void> {
  const now = new Date().toISOString();
  const body = JSON.stringify({ ...entry, created_at: now });
  const filePath = `audit/${now.slice(0, 7)}.json`;
  await appendAuditLog(filePath, body);
}

export async function readAuditMonth(yyyymm: string): Promise<AuditEntry[]> {
  return [];
}

export async function getUserByEmail(email: string): Promise<User | null> {
  if (isSeedMode()) {
    return seedUsers().find((user) => user.email === email) ?? null;
  }

  const { data, error } = await supabase.from('users').select('*').eq('email', email).single();
  if (error) return null;
  return data as User;
}

export async function getUserById(id: string): Promise<User | null> {
  if (isSeedMode()) {
    return seedUsers().find((user) => user.id === id) ?? null;
  }

  const { data, error } = await supabase.from('users').select('*').eq('id', id).single();
  if (error) return null;
  return data as User;
}

export async function getPublishedPosts(filters?: { era?: 'web10' | 'web20' | 'general' }): Promise<Post[]> {
  if (isSeedMode()) {
    return seedPosts().filter((post) => post.status === 'published' && (!filters?.era || post.era === filters.era));
  }

  let query = supabase.from('posts').select('*').eq('status', 'published');
  if (filters?.era) {
    query = query.eq('era', filters.era);
  }
  const { data, error } = await query.order('year', { ascending: true });
  if (error || !data) return [];
  return data as Post[];
}

export async function getTimelinePosts(): Promise<Post[]> {
  return getPublishedPosts();
}

export async function getPostBySlug(slug: string): Promise<PostWithStats | null> {
  if (isSeedMode()) {
    const post = seedPosts().find((item) => item.slug === slug && item.status === 'published');
    if (!post) return null;
    return { ...post, commentCount: 0, reactionCount: 0 };
  }

  const { data, error } = await supabase.from('posts').select('*').eq('slug', slug).eq('status', 'published').single();
  if (error || !data) return null;

  const comments = await supabase.from('comments').select('id', { count: 'exact' }).eq('post_id', data.id);
  const reactions = await supabase.from('reactions').select('id', { count: 'exact' }).eq('post_id', data.id);

  return {
    ...(data as Post),
    commentCount: comments.count ?? 0,
    reactionCount: reactions.count ?? 0
  };
}

export async function getAllPosts(): Promise<Post[]> {
  if (isSeedMode()) {
    return seedPosts();
  }
  const { data, error } = await supabase.from('posts').select('*').order('year', { ascending: true });
  if (error || !data) return [];
  return data as Post[];
}

export async function createPost(userId: string, data: Partial<Post>): Promise<Post> {
  if (isSeedMode()) {
    throw new Error('Cannot create post in seed mode');
  }
  const payload = {
    ...data,
    created_by: userId,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  const { data: inserted, error } = await supabase.from('posts').insert(payload).single();
  if (error || !inserted) {
    throw error ?? new Error('Failed to create post');
  }
  return inserted as Post;
}

export async function updatePost(id: string, userId: string, data: Partial<Post>): Promise<Post> {
  if (isSeedMode()) {
    throw new Error('Cannot update post in seed mode');
  }
  const payload = {
    ...data,
    updated_at: new Date().toISOString()
  };
  const { data: updated, error } = await supabase.from('posts').update(payload).eq('id', id).single();
  if (error || !updated) {
    throw error ?? new Error('Failed to update post');
  }
  return updated as Post;
}

export async function deletePost(id: string, userId: string): Promise<void> {
  if (isSeedMode()) {
    throw new Error('Cannot delete post in seed mode');
  }
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  if (isSeedMode()) {
    return [];
  }
  const { data, error } = await supabase.from('comments').select('id, post_id, author_name, content, is_featured, created_at').eq('post_id', postId).order('is_featured', { ascending: false }).order('created_at', { ascending: false });
  if (error || !data) return [];
  return data as Comment[];
}

export async function createComment(data: { postId: string; authorName: string; authorEmail: string; content: string }): Promise<Comment> {
  if (isSeedMode()) {
    throw new Error('Cannot create comment in seed mode');
  }
  const payload = {
    post_id: data.postId,
    author_name: data.authorName,
    author_email: data.authorEmail,
    content: data.content,
    is_featured: false,
    created_at: new Date().toISOString()
  };
  const { data: inserted, error } = await supabase.from('comments').insert(payload).single();
  if (error || !inserted) {
    throw error ?? new Error('Failed to create comment');
  }
  return inserted as Comment;
}

export async function deleteComment(id: string, userId: string): Promise<void> {
  if (isSeedMode()) {
    throw new Error('Cannot delete comment in seed mode');
  }
  const { error } = await supabase.from('comments').delete().eq('id', id);
  if (error) {
    throw error;
  }
}

export async function toggleFeaturedComment(id: string, userId: string): Promise<Comment> {
  if (isSeedMode()) {
    throw new Error('Cannot toggle featured comment in seed mode');
  }
  const existing = await supabase.from('comments').select('is_featured').eq('id', id).single();
  if (existing.error || !existing.data) {
    throw existing.error ?? new Error('Comment not found');
  }
  const nextValue = !existing.data.is_featured;
  const { data: updated, error } = await supabase.from('comments').update({ is_featured: nextValue }).eq('id', id).single();
  if (error || !updated) {
    throw error ?? new Error('Failed to update comment');
  }
  return updated as Comment;
}

export async function reactToPost(postId: string, deviceId: string): Promise<{ liked: boolean; total: number }> {
  if (isSeedMode()) {
    return { liked: false, total: 0 };
  }
  const existing = await supabase.from('reactions').select('id').eq('post_id', postId).eq('device_id', deviceId).single();
  if (existing.error) {
    throw existing.error;
  }

  if (existing.data) {
    await supabase.from('reactions').delete().eq('id', existing.data.id);
    const count = await getReactionsByPost(postId);
    return { liked: false, total: count.total };
  }

  await supabase.from('reactions').insert({ post_id: postId, device_id: deviceId });
  const count = await getReactionsByPost(postId);
  return { liked: true, total: count.total };
}

export async function getReactionsByPost(postId: string): Promise<{ total: number; reactedByDevice: boolean }> {
  if (isSeedMode()) {
    return { total: 0, reactedByDevice: false };
  }
  const { data, count, error } = await supabase.from('reactions').select('id', { count: 'exact' }).eq('post_id', postId);
  if (error) {
    throw error;
  }
  return { total: count ?? 0, reactedByDevice: false };
}

export async function uploadPostCover(postId: string, buffer: Buffer, mimeType: string): Promise<string> {
  return uploadCoverToBlob(postId, buffer, mimeType);
}
