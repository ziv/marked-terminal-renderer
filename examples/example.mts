import { marked } from "marked";
import { readFileSync } from "node:fs";
import { createTerminalRenderer, darkTheme } from "../renderer.mjs";

marked.use(createTerminalRenderer(darkTheme()));

const output = await marked.parse(
  readFileSync("./examples/short-example.md", "utf-8"),
);

console.log(output);
