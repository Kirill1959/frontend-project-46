#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')

  // Аргументы без отдельных описаний в help
  .argument('<filepath1>')
  .argument('<filepath2>')

  // Опция с квадратными скобками и дефолтом
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')

  .action((filepath1, filepath2, options) => {
    try {
      const diff = genDiff(filepath1, filepath2, options.format);
      console.log(diff);
    } catch (err) {
      console.error(err.message);
      process.exit(1);
    }
  });

program.parse();