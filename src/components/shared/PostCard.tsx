import type { Post } from '@/lib/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 text-white">
      <h2 className="text-2xl font-semibold">{post.title}</h2>
      <p className="mt-3 text-slate-300">{post.excerpt}</p>
      <div className="mt-4 text-sm text-slate-400">{post.year} · {post.era}</div>
    </article>
  );
}
