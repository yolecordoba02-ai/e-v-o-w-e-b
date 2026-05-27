import { NextResponse } from 'next/server';
import { getPublishedPosts } from '@/lib/dataService';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const era = url.searchParams.get('era') as 'web10' | 'web20' | 'general' | null;
  const posts = await getPublishedPosts(era ? { era } : undefined);
  return NextResponse.json({ posts });
}
