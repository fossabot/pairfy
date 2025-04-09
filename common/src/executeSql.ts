import fs from 'fs';
import path from 'path';

export function loadSqlFile(filename: string): string {
  const fullPath = path.join(__dirname, '../sql', filename);
  return fs.readFileSync(fullPath, 'utf-8');
}
