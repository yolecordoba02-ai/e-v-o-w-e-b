import fs from 'fs';
import path from 'path';
import { Client } from 'pg';

const migrationsDir = path.join(process.cwd(), 'supabase', 'migrations');

export async function applyMigrations(): Promise<string[]> {
  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error('DATABASE_URL is not configured');
  }

  const client = new Client({ connectionString: databaseUrl });
  await client.connect();

  await client.query(`
    CREATE TABLE IF NOT EXISTS _migrations (
      id SERIAL PRIMARY KEY,
      filename VARCHAR(255) UNIQUE NOT NULL,
      applied_at TIMESTAMPTZ DEFAULT NOW()
    );
  `);

  const migrations = fs.readdirSync(migrationsDir).filter((file) => file.endsWith('.sql')).sort();
  const applied: string[] = [];

  for (const fileName of migrations) {
    const result = await client.query('SELECT filename FROM _migrations WHERE filename = $1', [fileName]);
    if (result.rowCount > 0) {
      continue;
    }

    const contents = fs.readFileSync(path.join(migrationsDir, fileName), 'utf8');
    await client.query(contents);
    await client.query('INSERT INTO _migrations(filename) VALUES ($1)', [fileName]);
    applied.push(fileName);
  }

  await client.end();
  return applied;
}
