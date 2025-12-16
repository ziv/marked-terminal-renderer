# marked-terminal-renderer

Modern, full featured terminal renderer extension for
[marked](https://github.com/markedjs/marked).

Most Markdown syntax is supported and rendered with supported terminal:

- 🌼 Headings (H1 to H6)
- 🌼 Bold, Italic, Strikethrough
- 🌼 Blockquotes (with nesting support)
- 🌼 Inline code and code blocks (with syntax highlighting)
- 🌼 Links (with clickable support in supported terminals)
- 🌼 Images
- 🌼 Tables
- 🌼 Lists (ordered, unordered, nested, task lists)
- 🌼 Emojis

## Example output rendered in `iTerm2`

![example](./examples/example.png)

### Usage

Installation using `npm` or any other package manager:

```shell
npm i marked-terminal-renderer
```

Basic usage example, note the use of `await` since the renderer is asynchronous:

```javascript
import { marked } from "marked";
import { createTerminalRenderer, DarkTheme } from "marked-terminal-renderer";

marked.use(createTerminalRenderer(DarkTheme));
console.log(
  await marked.parse(
    "# Hello World\nThis is **bold text** and this is a [link](https://example.com). :smile:",
  ),
);
```

### TODOs

- [ ] should support different highlight based on themes (dark/light)
- [ ] support auto numbered nested lists (1., 1.1., 1.1.1., etc)
- [ ] fix any wrapping issues with nested elements (like lists inside
  blockquotes)

### 3rd Party Libraries

Shout out to the following libraries that make this renderer possible ❤️:

| Feature | Library                                                          |
|---------|------------------------------------------------------------------|
| Tables  | [cli-table3](https://github.com/cli-table/cli-table3)            |
| Colors  | [chalk](https://github.com/chalk/chalk)                          |
| Images  | [terminal-image](https://github.com/sindresorhus/terminal-image) |
| Links   | [terminal-link](https://github.com/sindresorhus/terminal-link)   |
| Emojis  | [node-emoji](https://github.com/omnidan/node-emoji)              |
