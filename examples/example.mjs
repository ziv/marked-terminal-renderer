import { marked } from "marked";
import { readFileSync } from "node:fs";
import { createTerminalRenderer, DarkTheme } from "../renderer.mjs";
marked.use(createTerminalRenderer(DarkTheme));
const output = await marked.parse(readFileSync("./examples/example.md", "utf-8"));
console.log(output);
