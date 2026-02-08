import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// Читает содержимое файла
function readFile(filepath) {
  const fullPath = path.resolve(filepath);
  return fs.readFileSync(fullPath, 'utf-8');
}

// Определяет формат по расширению
function getFormat(filepath) {
  const ext = path.extname(filepath).toLowerCase();

  if (ext === '.json') return 'json';
  if (ext === '.yml' || ext === '.yaml') return 'yaml';

  throw new Error(`Unknown file extension: ${ext}`);
}

// Парсит строку в объект
function parse(content, format) {
  if (format === 'json') return JSON.parse(content);
  if (format === 'yaml') return yaml.load(content);

  throw new Error(`Unknown format: ${format}`);
}

// Строит различия в формате stylish (для плоских объектов)
function buildDiff(obj1, obj2) {
  const allKeys = [];
  for (const key in obj1) allKeys.push(key);
  for (const key in obj2) allKeys.push(key);

  const uniqueKeys = [...new Set(allKeys)].sort();

  const lines = [];

  for (const key of uniqueKeys) {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!(key in obj1)) {
      lines.push(`  + ${key}: ${value2}`);
      continue;
    }

    if (!(key in obj2)) {
      lines.push(`  - ${key}: ${value1}`);
      continue;
    }

    if (value1 === value2) {
      lines.push(`    ${key}: ${value1}`);
      continue;
    }

    lines.push(`  - ${key}: ${value1}`);
    lines.push(`  + ${key}: ${value2}`);
  }

  return '{\n' + lines.join('\n') + '\n}';
}

// Основная функция
export default function genDiff(filepath1, filepath2, format = 'stylish') {
  const content1 = readFile(filepath1);
  const content2 = readFile(filepath2);

  const format1 = getFormat(filepath1);
  const format2 = getFormat(filepath2);

  const obj1 = parse(content1, format1);
  const obj2 = parse(content2, format2);

  if (format === 'stylish') {
    return buildDiff(obj1, obj2);
  }

  throw new Error(`Format "${format}" is not supported yet`);
}