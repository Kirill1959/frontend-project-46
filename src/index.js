import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

// читаем файл
function readFile(filePath) {
  const fullPath = path.resolve(filePath);
  return fs.readFileSync(fullPath, 'utf-8');
}

// определяем формат
function getFormat(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.json') return 'json';
  if (ext === '.yml' || ext === '.yaml') return 'yaml';

  throw new Error(`Неизвестное расширение: ${ext}`);
}

// парсим текст в объект
function parse(text, format) {
  if (format === 'json') return JSON.parse(text);
  if (format === 'yaml') return yaml.load(text);

  throw new Error(`Неизвестный формат: ${format}`);
}

// строим diff
function makeDiff(obj1, obj2) {
  const allKeys = [];

  // ключи из первого объекта
  Object.keys(obj1).forEach((key) => {
    allKeys.push(key);
  });

  // ключи из второго объекта (без дубликатов)
  Object.keys(obj2).forEach((key) => {
    if (!allKeys.includes(key)) {
      allKeys.push(key);
    }
  });

  // сортировка
  allKeys.sort();

  const lines = [];

  allKeys.forEach((key) => {
    const val1 = obj1[key];
    const val2 = obj2[key];

    if (!(key in obj1)) {
      lines.push(`  + ${key}: ${val2}`);
      return;
    }

    if (!(key in obj2)) {
      lines.push(`  - ${key}: ${val1}`);
      return;
    }

    if (val1 === val2) {
      lines.push(`    ${key}: ${val1}`);
      return;
    }

    lines.push(`  - ${key}: ${val1}`);
    lines.push(`  + ${key}: ${val2}`);
  });

  return `{\n${lines.join('\n')}\n}`;
}

// главная функция
export default function genDiff(path1, path2, format = 'stylish') {
  const text1 = readFile(path1);
  const text2 = readFile(path2);

  const format1 = getFormat(path1);
  const format2 = getFormat(path2);

  const obj1 = parse(text1, format1);
  const obj2 = parse(text2, format2);

  if (format !== 'stylish') {
    throw new Error(`Такой формат пока не умею: ${format}`);
  }

  return makeDiff(obj1, obj2);
}
