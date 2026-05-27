import { BlobClient } from '@vercel/blob';

function getBlobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('Missing BLOB_READ_WRITE_TOKEN');
  }
  return token;
}

export async function uploadPostCover(postId: string, buffer: Buffer, mimeType: string): Promise<string> {
  const token = getBlobToken();
  const client = new BlobClient(token);
  const extension = mimeType.split('/').pop() ?? 'bin';
  const path = `posts/${postId}.${extension}`;
  const result = await client.upload(path, buffer, {
    contentType: mimeType,
    cacheControl: 'public, max-age=31536000'
  });
  return result.url;
}
