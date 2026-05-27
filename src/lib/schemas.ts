import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

export const commentSchema = z.object({
  postId: z.string().uuid(),
  authorName: z.string().min(1).max(100),
  authorEmail: z.string().email(),
  content: z.string().min(1).max(2000)
});

export const reactionSchema = z.object({
  postId: z.string().uuid(),
  deviceId: z.string().min(1)
});
