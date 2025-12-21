#!/usr/bin/env node
import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { readFileSync } from 'node:fs';
import { marked } from 'marked';
import { createTerminalRenderer, darkTheme, lightTheme } from './renderer.mjs';

const options = parseArgs({
  args: process.argv.slice(2),
  strict: false,
  options: {
    theme: {
      type: 'string',
      short: 't',
      default: 'dark',
      description: 'Color theme for rendering (dark or light)'
    }
  }
});

if (options.positionals.length !== 1) {
  console.error('Usage: catmd <path-to-markdown-file>');
  process.exit(1);
}

const path = resolve(options.positionals[0]);
const cwd = dirname(path);
const theme = options.values.theme === 'dark' ? darkTheme({ cwd }) : lightTheme({ cwd });

marked.use(createTerminalRenderer(theme));
console.log(await marked.parse(readFileSync(path, 'utf-8')));
