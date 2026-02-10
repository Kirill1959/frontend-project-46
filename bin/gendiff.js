#!/usr/bin/env node

import { Command } from 'commander';
import gendiff from '../src/gendiff.js';

const program = new Command();

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, options) => {
    const result = gendiff(filepath1, filepath2, options.format);
    console.log(result);
  });

program.parse(process.argv);
