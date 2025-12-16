# marked-terminal-renderer

Modern, full featured terminal renderer extension for [marked](https://github.com/markedjs/marked).

### Usage

Installation using `npm` or any other package manager:

```shell
npm i marked-terminal-renderer
```

Basic usage example, note the use of `await` since the renderer is asynchronous:

```javascript
import { marked } from 'marked';
import { createTerminalRenderer, DarkTheme } from 'marked-terminal-renderer';

marked.use(createTerminalRenderer(DarkTheme));
console.log(await marked.parse('# Hello World\nThis is **bold text** and this is a [link](https://example.com). :smile:'));
```

### 3rd Party Libraries

Shout out to the following libraries that make this renderer possible ❤️:

| Feature | Library                                                          |
|---------|------------------------------------------------------------------|
| Tables  | [cli-table3](https://github.com/cli-table/cli-table3)            |
| Colors  | [chalk](https://github.com/chalk/chalk)                          |
| Images  | [terminal-image](https://github.com/sindresorhus/terminal-image) |
| Links   | [terminal-link](https://github.com/sindresorhus/terminal-link)   |
| Emojis  | [node-emoji](https://github.com/omnidan/node-emoji)              |
