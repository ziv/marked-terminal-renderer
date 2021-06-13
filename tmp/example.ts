import * as marked from 'marked';
import terminalRenderer, { CliRendererOptions } from '../src';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { DARK, LIGHT } from '../src/defaults';

const themes: CliRendererOptions[] = [DARK, LIGHT]; // add more themes in this array

const theme = process.argv.length > 1 ? Number(process.argv[2]) : 0;

const src = readFileSync(resolve(__dirname, 'example.md')).toString();
const extension = terminalRenderer(themes[theme]);

marked.use(extension);

console.log(marked(src));
