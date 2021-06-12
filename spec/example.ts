import * as marked from 'marked';
import terminalRenderer from '../src';
import {readFileSync} from 'fs';
import {resolve} from 'path';
import {MarkedOptions} from 'marked';

const src = readFileSync(resolve(__dirname, 'example.md')).toString();
const extension = terminalRenderer();

// not working
// marked.use(extension);

// working
marked.setOptions(extension as MarkedOptions);

console.log(marked(src));

// also working
// console.log(marked(src, extension as MarkedOptions));

