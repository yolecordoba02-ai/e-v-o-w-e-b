import fs from 'fs';
import path from 'path';
import type { SeedData } from './types';

const dataPath = path.join(process.cwd(), 'data', 'seed.json');

export function readSeedData(): SeedData {
  if (!fs.existsSync(dataPath)) {
    throw new Error('Seed file not found: ' + dataPath);
  }
  return JSON.parse(fs.readFileSync(dataPath, 'utf8')) as SeedData;
}
