#!/usr/bin/env node

import { Command } from 'commander';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')

  // Аргументы — обязательные, с угловыми скобками
  .argument('<filepath1>')
  .argument('<filepath2>')

  // Опция с необязательным значением
  .option('-f, --format [type]', 'output format')

  // Отключаем автоматическое добавление описаний аргументов в help
  .helpOption('-h, --help', 'display help for command')
  .showHelpAfterError()           // опционально — удобно для отладки
  .parse();