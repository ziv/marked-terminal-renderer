#!/usr/bin/env node
import { resolve } from 'node:path';
import { readFileSync } from 'node:fs';
import { marked } from 'marked';
import { createTerminalRenderer, DarkTheme } from './renderer.mjs';

const args = process.argv.slice(2);

if (args.length !== 1) {
  console.log('Usage: catmd <path-to-markdown-file>');
}

const path = resolve(args[0]);

marked.use(createTerminalRenderer(DarkTheme));
console.log(await marked.parse(readFileSync(path, 'utf-8')));
