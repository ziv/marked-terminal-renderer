import * as marked from 'marked';
import terminalRenderer from '../src';
import {readFileSync} from 'fs';
import {resolve} from 'path';

const src = readFileSync(resolve(__dirname, 'example.md')).toString();
marked.setOptions(terminalRenderer() as any);
console.log(marked(src));

