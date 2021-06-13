// Typescript example
import terminalRenderer from '../lib';
import * as marked from 'marked';
import { readFileSync } from 'fs';

marked.use(terminalRenderer());

const src = readFileSync(__dirname + 'example.md').toString();

console.log(marked(src));
