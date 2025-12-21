import { beforeEach, test } from "node:test";
import assert from "node:assert";
import { marked } from "marked";
import { createTerminalRenderer, DarkTheme } from "./renderer.mjs";
import ansiRegex from "ansi-regex";
import chalk from "chalk";

// Force chalk to output colors in test environment
chalk.level = 1;

function stripAnsi(str: string): string {
  return str.replace(ansiRegex(), "");
}

beforeEach(() => {
  marked.use(createTerminalRenderer(DarkTheme));
});

// Helper to check if string contains ANSI codes
function hasAnsi(str: string): boolean {
  return ansiRegex().test(str);
}

test("simple text (paragraph)", async () => {
  const result = await marked.parse("Hello, **world**!");
  const stripped = stripAnsi(result);
  assert.equal(stripped, "Hello, world!\n\n");
});

// Inline text styles tests
test("bold text (strong)", async () => {
  const result = await marked.parse("**bold text**");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(stripAnsi(result).includes("bold text"));
});

test("italic text (em)", async () => {
  const result = await marked.parse("*italic text*");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(stripAnsi(result).includes("italic text"));
});

test("strikethrough text (del)", async () => {
  const result = await marked.parse("~~strikethrough~~");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(stripAnsi(result).includes("strikethrough"));
});

test("mixed inline styles", async () => {
  const result = await marked.parse(
    "**bold** and *italic* and ~~strikethrough~~",
  );
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("bold"));
  assert.ok(stripped.includes("italic"));
  assert.ok(stripped.includes("strikethrough"));
});

// Code tests
test("inline code (codespan)", async () => {
  const result = await marked.parse("This is `inline code` example");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(stripAnsi(result).includes("inline code"));
});

test("code block", async () => {
  const markdown = "```javascript\nconst x = 42;\n```";
  const result = await marked.parse(markdown);
  assert.ok(hasAnsi(result), "Should contain ANSI codes");
  assert.ok(stripAnsi(result).includes("const x = 42"));
});

test("code block with language", async () => {
  const markdown = '```python\ndef hello():\n    print("world")\n```';
  const result = await marked.parse(markdown);
  assert.ok(stripAnsi(result).includes("def hello()"));
  assert.ok(stripAnsi(result).includes('print("world")'));
});

// Headings tests
test("heading level 1", async () => {
  const result = await marked.parse("# Heading 1");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(stripAnsi(result).includes("Heading 1"));
});

test("heading level 2", async () => {
  const result = await marked.parse("## Heading 2");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(stripAnsi(result).includes("Heading 2"));
});

test("heading level 3", async () => {
  const result = await marked.parse("### Heading 3");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(stripAnsi(result).includes("Heading 3"));
});

test("all heading levels", async () => {
  const markdown = "# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("H1"));
  assert.ok(stripped.includes("H2"));
  assert.ok(stripped.includes("H3"));
  assert.ok(stripped.includes("H4"));
  assert.ok(stripped.includes("H5"));
  assert.ok(stripped.includes("H6"));
});

// Lists tests
test("unordered list", async () => {
  const markdown = "- Item 1\n- Item 2\n- Item 3";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Item 1"));
  assert.ok(stripped.includes("Item 2"));
  assert.ok(stripped.includes("Item 3"));
});

test("ordered list", async () => {
  const markdown = "1. First\n2. Second\n3. Third";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("First"));
  assert.ok(stripped.includes("Second"));
  assert.ok(stripped.includes("Third"));
  assert.ok(hasAnsi(result), "Should contain ANSI codes for list styling");
});

test("nested list", async () => {
  const markdown = "- Parent 1\n  - Child 1\n  - Child 2\n- Parent 2";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Parent 1"));
  assert.ok(stripped.includes("Child 1"));
  assert.ok(stripped.includes("Child 2"));
  assert.ok(stripped.includes("Parent 2"));
});

// Checkbox tests
test("checkboxes", async () => {
  const markdown = "- [x] Completed task\n- [ ] Incomplete task";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Completed task"));
  assert.ok(stripped.includes("Incomplete task"));
  assert.ok(hasAnsi(result), "Should contain ANSI codes for checkbox styling");
});

// Links tests
test("link", async () => {
  const result = await marked.parse("[Click here](https://example.com)");
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Click here"));
});

test("link with title", async () => {
  const result = await marked.parse(
    '[GitHub](https://github.com "GitHub Homepage")',
  );
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("GitHub"));
});

// Blockquote tests
test("blockquote", async () => {
  const result = await marked.parse("> This is a quote");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(stripAnsi(result).includes("This is a quote"));
});

test("multi-line blockquote", async () => {
  const markdown = "> Line 1\n> Line 2\n> Line 3";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Line 1"));
  assert.ok(stripped.includes("Line 2"));
  assert.ok(stripped.includes("Line 3"));
});

// Horizontal rule tests
test("horizontal rule", async () => {
  const result = await marked.parse("---");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(result.length > 0, "Should produce output");
});

test("horizontal rule with asterisks", async () => {
  const result = await marked.parse("***");
  assert.ok(hasAnsi(result), "Should contain ANSI codes for styling");
  assert.ok(result.length > 0, "Should produce output");
});

// Table tests
test("simple table", async () => {
  const markdown =
    "| Header 1 | Header 2 |\n|----------|----------|\n| Cell 1   | Cell 2   |";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Header 1"));
  assert.ok(stripped.includes("Header 2"));
  assert.ok(stripped.includes("Cell 1"));
  assert.ok(stripped.includes("Cell 2"));
});

test("table with multiple rows", async () => {
  const markdown =
    "| Name | Age |\n|------|-----|\n| Alice | 30 |\n| Bob | 25 |\n| Carol | 35 |";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Name"));
  assert.ok(stripped.includes("Age"));
  assert.ok(stripped.includes("Alice"));
  assert.ok(stripped.includes("Bob"));
  assert.ok(stripped.includes("Carol"));
});

// Line breaks and text wrapping tests
test("line break", async () => {
  const markdown = "Line 1  \nLine 2";
  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Line 1"));
  assert.ok(stripped.includes("Line 2"));
});

test("paragraph text wrapping", async () => {
  const longText =
    "This is a very long line of text that should be wrapped to fit within the terminal width limit that has been configured for the renderer instance.";
  const result = await marked.parse(longText);
  assert.ok(result.length > 0);
  assert.ok(stripAnsi(result).includes("This is a very long line"));
});

// Symbol replacement tests
test("symbol replacements", async () => {
  const result = await marked.parse(
    "Copyright (c) Trademark (tm) Registered (r)",
  );
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("©") || stripped.includes("(c)"));
  assert.ok(stripped.includes("™") || stripped.includes("(tm)"));
  assert.ok(stripped.includes("®") || stripped.includes("(r)"));
});

// Mixed content test
test("complex markdown with mixed elements", async () => {
  const markdown = `# Main Title

This is a paragraph with **bold** and *italic* text.

## Section 1

- Item 1
- Item 2
  - Nested item

> A blockquote with some wisdom

\`\`\`javascript
const x = 42;
\`\`\`

[A link](https://example.com)`;

  const result = await marked.parse(markdown);
  const stripped = stripAnsi(result);
  assert.ok(stripped.includes("Main Title"));
  assert.ok(stripped.includes("bold"));
  assert.ok(stripped.includes("italic"));
  assert.ok(stripped.includes("Section 1"));
  assert.ok(stripped.includes("Item 1"));
  assert.ok(stripped.includes("Nested item"));
  assert.ok(stripped.includes("A blockquote"));
  assert.ok(stripped.includes("const x = 42"));
  assert.ok(stripped.includes("A link"));
});
