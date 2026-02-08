/* eslint-disable no-underscore-dangle */

import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

test('сравнение плоских json файлов', () => {
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.json');

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(result).toBe(expected);
});

test('сравнение json и yml файлов', () => {
  const result = genDiff('__fixtures__/file1.json', '__fixtures__/file2.yml');

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(result).toBe(expected);
});

test('сравнение двух yaml файлов', () => {
  const result = genDiff('__fixtures__/file1.yml', '__fixtures__/file2.yml');

  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(result).toBe(expected);
});
