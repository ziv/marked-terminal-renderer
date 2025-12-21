# Marked Terminal Renderer

## Text

Handle Markdown formatting in terminal applications with support for **bold
text**, _italic text_, ~~strikethrough~~ and
[hyperlinks](https://github.com/ziv/marked-terminal-renderer). (in supported
terminals).

Including symbols replacement for common pattern like (c) (C) (r) (R) (tm) (TM)
(p) (P) +-.

Supports emojis using `:emoji_name:` syntax. :smile: :heart: :+1: :tada:
:rocket: :100: :fire: :clap: :sparkles:

Long text will properly wrap around to the next line maintaining correct
indentation.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla venenatis lorem
mi, sit amet rhoncus nibh scelerisque eu. Phasellus blandit fringilla egestas.
Pellentesque a turpis ut odio cursus cursus. Vestibulum mollis ac nunc a
blandit. Cras tortor nulla, interdum ultrices sodales sed, imperdiet id libero.
Etiam a quam dolor. Aliquam malesuada, lacus sit amet pellentesque imperdiet,
lectus odio ultricies lectus, eget viverra odio orci ut tellus. Nulla elementum
sapien ac mi finibus, sed euismod dolor maximus.

## Blockquotes

> To be or not to be, that is the question. Lorem ipsum dolor sit amet,
> consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
> adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
>
> To be or not to be, that is the question. Lorem ipsum dolor sit amet,
> consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur
> adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
>
>> Blockquotes can also be nested...

## Lists

### Unordered list:

- First item
- Second item
- Third item
- Another item

### Ordered list:

1. ordered item A
2. ordered item B
3. ordered item C

### Ordered with different start:

22. Item 22
23. Next item (23)
24. Next item (24)

### Task list:

- [x] Task 1
- [ ] Task 2
- [ ] Task 3

### Nested list and long items wrapping:

1. Parent 1
   - Subitem 1a
   - Subitem 1b
2. Parent 2
   1. Subitem 2a
   2. Subitem 2b
      - Subitem 2b1
      - Another item Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet,
        consectetur adipiscing elit.
      - Subitem 2b2
      - Subitem 2b3

## Code

Inline `code` is marked and blocks of code are highlighted accordingly.

```typescript
export function inc(counter: number): number {
  return counter++;
}
```

## Image

If your terminal supports it, images can be displayed as well.

![Markdown logo](./logo.png)

## Tables

There are two algorithms that try to fit the content within the terminal width.
If the table is too wide, it will be wrapped accordingly.

| Letter | Number |
| ------ | ------ |
| A      | 1      |
| B      | 2      |

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

# Heading 1

## Heading 2

### Heading 3

#### Heading 4

##### Heading 5

###### Heading 6
