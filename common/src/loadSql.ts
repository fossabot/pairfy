import { readFileSync } from 'fs';
import path from 'path';

/**
 * Carga un archivo SQL desde el directorio /sql
 */
export function loadSql(filename: string): string {
  const fullPath = path.join(__dirname, '../sql', filename);
  return readFileSync(fullPath, 'utf-8');
}
