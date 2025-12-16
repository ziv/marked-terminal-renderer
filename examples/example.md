# Marked Terminal Renderer

## Text

Handle Markdown formatting in terminal applications with support
for **bold text**, _italic text_, ~~strikethrough~~ and [hyperlinks](https://github.com/ziv/marked-terminal-renderer).
(in supported terminals).

Including symbols replacement for common pattern like (c) (C) (r) (R) (tm) (TM) (p) (P) +-.

Supports emojis using `:emoji_name:` syntax. :smile: :heart: :+1: :tada: :rocket: :100: :fire: :clap: :sparkles:

Long text will properly wrap around to the next line maintaining correct indentation.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis lorem mi, sit amet rhoncus nibh scelerisque eu.
Phasellus blandit fringilla egestas. Pellentesque a turpis ut odio cursus cursus. Vestibulum mollis ac nunc a blandit.
Cras tortor nulla, interdum ultrices sodales sed, imperdiet id libero. Etiam a quam dolor. Aliquam malesuada, lacus sit
amet pellentesque imperdiet, lectus odio ultricies lectus, eget viverra odio orci ut tellus. Nulla elementum sapien ac
mi finibus, sed euismod dolor maximus. Fusce convallis luctus dui vel rhoncus. Proin eget tellus at odio egestas
pharetra. Nullam mi nisi, bibendum non luctus at, convallis in nisi.

## Lists

### Unordered list:

- First item
- Second item
- Third item
- Item with too long text that should properly wrap around to the next line and maintain correct indentation. Item with too long text that should properly wrap around to the next line and maintain correct indentation.
- Another item

### Ordered list:

1. ordered item A
2. ordered item B
3. ordered item C

### Starting from:

22. Item 22
23. Next item (23)
24. Next item (24)

### Task list:

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

### Nested list:

1. Parent 1
    - Subitem 1a
    - Subitem 1b
2. Parent 2
    1. Subitem 2a
    2. Subitem 2b
        - Subitem 2b1
        - Subitem 2b2
        - Subitem 2b3