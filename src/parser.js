import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export function readFile(filepath) {
  const full = path.resolve(filepath);
  return fs.readFileSync(full, 'utf-8');
}

export function getFormat(filepath) {
  const ext = path.extname(filepath).toLowerCase();

  if (ext === '.json') return 'json';
  if (ext === '.yml' || ext === '.yaml') return 'yaml';

  throw new Error(`Неизвестное расширение файла: ${ext}`);
}

export function parse(content, format) {
  if (format === 'json') {
    return JSON.parse(content);
  }

  if (format === 'yaml') {
    return yaml.load(content);
  }

  throw new Error(`Неизвестный формат: ${format}`);
}
