# marked-terminal-renderer

[marked](https://github.com/markedjs/marked) extension with a terminal renderer.

[![CI](https://github.com/ziv/marked-terminal-renderer/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/ziv/marked-terminal-renderer/actions/workflows/main.yml)
[![CodeQL](https://github.com/ziv/marked-terminal-renderer/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/ziv/marked-terminal-renderer/actions/workflows/codeql-analysis.yml)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)


## Install
```shell
npm i marked-terminal-renderer
```

## Usage
```typescript
import * as marked from 'marked';
import terminalRenderer, { CliRendererOptions } from 'marked-terminal-renderer';
const src = `
# h1 Heading

* list item
* list item
  1. ordered item
  1. ordered
`;

const opts: CliRendererOptions = {...};
marked.use(terminalRenderer(opts));

console.log(marked(src, terminalRenderer()))
```

## Features
* Colors - thanks to [chalk](https://github.com/chalk/chalk)
* Tables - thanks to [cli-table3](https://github.com/cli-table/cli-table3)
* Wrapping - thanks to [word-wrap](https://github.com/jonschlinkert/word-wrap)
* Code Highlighting - thanks to [cli-highlight](https://github.com/felixfbecker/cli-highlight)
* Emoji - thanks to [node-emoji](https://github.com/omnidan/node-emoji)
