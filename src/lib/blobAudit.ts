import { BlobClient } from '@vercel/blob';

function getBlobToken(): string {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (!token) {
    throw new Error('Missing BLOB_READ_WRITE_TOKEN');
  }
  return token;
}

function getClient() {
  return new BlobClient(getBlobToken());
}

export async function appendAuditLog(path: string, body: string): Promise<void> {
  const client = getClient();
  let existing = '';

  try {
    const blob = await client.get(path);
    if (blob) {
      existing = await blob.text();
    }
  } catch {
    existing = '';
  }

  const next = existing ? `${existing}\n${body}` : body;
  await client.upload(path, Buffer.from(next, 'utf-8'), {
    contentType: 'application/json'
  });
}
