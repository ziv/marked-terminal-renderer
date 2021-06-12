# marked-terminal-renderer
[marked](https://github.com/markedjs/marked) terminal renderer.

## Features
* Colors - thanks to [chalk](https://github.com/chalk/chalk)
* Tables - thanks to [cli-table3](https://github.com/cli-table/cli-table3)
* Wrapping - thanks to [word-wrap](https://github.com/jonschlinkert/word-wrap)
* Code Highlighting - thanks to [cli-highlight](https://github.com/felixfbecker/cli-highlight)
* Emoji - thanks to [node-emoji](https://github.com/omnidan/node-emoji)

# Usage
```typescript
import * as marked from 'marked';
import terminalRenderer from 'marked-terminal-renderer';
const src = `
# h1 Heading

* list item
* list item
  1. ordered item
  1. ordered
`;

// this method is not working, an issue opened
// const opts = {};
// marked.use(terminalRenderer(opts));

console.log(marked(src, terminalRenderer()))
```

