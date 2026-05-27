import { NextResponse } from 'next/server';
import { getPostBySlug } from '@/lib/dataService';

interface Params {
  slug: string;
}

export async function GET(_: Request, { params }: { params: Params }) {
  const post = await getPostBySlug(params.slug);
  if (!post) {
    return NextResponse.json({ message: 'Post no encontrado' }, { status: 404 });
  }
  return NextResponse.json({ post });
}
