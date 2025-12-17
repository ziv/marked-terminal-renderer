import {
  MarkedExtension,
  Renderer,
  RendererObject,
  Token,
  Tokens
} from 'marked';
import { resolve } from 'node:path';
import type { ChalkInstance } from 'chalk';
import chalk from 'chalk';
import terminalLink from 'terminal-link';
import got from 'got';
import boxen from 'boxen';
import Table from 'cli-table3';
import terminalImage from 'terminal-image';
import ansiRegex from 'ansi-regex';
import { highlight } from 'cli-highlight';
import { emojify } from 'node-emoji';

const SEP = ' '; // separator
const EOL = '\n'; // end of line
const LI = '྿'; // list character (meta char to avoid collision)
const ANSI = ansiRegex();

const REPLACEMENTS: [string | RegExp, string][] = [
  [/\(c\)/g, '©'],
  [/\(C\)/g, '©'],
  [/\(tm\)/g, '™'],
  [/\(TM\)/g, '™'],
  [/\(r\)/g, '®'],
  [/\(R\)/g, '®'],
  [/\(p\)/g, '℗'],
  [/\(P\)/g, '℗'],
  [/\+-/g, '±'],
  [/&quot;/g, '"'],
  [/&#39;/g, '\'']
];

/**
 * Get the length of a string without ANSI codes.
 * @param str
 */
function strLen(str: string): number {
  return str.replace(ANSI, '').length;
}

/**
 * Add two new lines to create a section break.
 * @param text
 */
function section(text: string) {
  return text + EOL + EOL;
}

/**
 * Replace common text patterns with symbols.
 * @param text
 */
function symbols(text: string): string {
  return REPLACEMENTS.reduce(
    (acc, [search, replace]) => acc.replace(search, replace),
    emojify(text)
  );
}

/**
 * Pad each line of the given text with spaces.
 * @param text
 * @param padding
 */
function padLines(text: string, padding = 2): string {
  return text.split(EOL).join(EOL + ' '.repeat(padding));
}

/**
 * Hard wrap strip all newlines and re-wrap text to the given width word by word.
 * This is a destructive operation and should be used with care.
 * @param text
 * @param width
 */
function hardWrap(text: string, width: number) {
  let current = '';
  const lines: string[] = [];
  for (const next of text.replace(/\n/g, ' ').split(' ')) {
    if (strLen(current) + strLen(next) >= width) {
      lines.push(current);
      current = next;
    } else if (current === '') {
      current = next;
    } else {
      current += ' ' + next;
    }
  }
  lines.push(current);
  return lines.join('\n');
}

/**
 * Trim empty lines if any from the given text.
 * @param text
 */
function trimEmptyLines(text: string): string {
  const lines = text.split(EOL);
  while (lines[0]?.trim() === '') {
    lines.shift();
  }
  while (lines[lines.length - 1]?.trim() === '') {
    lines.pop();
  }
  return lines.join(EOL);
}

export type TerminalRendererOptions = {
  // terminal
  lineLength: number;

  // resources
  cwd: string;

  // text
  strongStyle: ChalkInstance;
  emStyle: ChalkInstance;
  delStyle: ChalkInstance;

  // heading
  headingLevels: ChalkInstance[];

  // code
  codeStyle: ChalkInstance;

  // block-quote
  quotePadding: number;
  quoteChar: string;
  quoteStyle: ChalkInstance;

  // hr
  hrChar: string;
  hrStyle: ChalkInstance;

  // lists
  listStyle: ChalkInstance;
  listChar: string;

  // checkbox
  cbCheckedChar: string;
  cbUncheckedChar: string;
  cbStyle: ChalkInstance;

  // link
  linkStyle: ChalkInstance;

  // table
  // todo complete options
  tableWordWrap: boolean;
};

const BaseOptions: Partial<TerminalRendererOptions> = {
  lineLength: 80,
  cwd: '.',
  quotePadding: 1,
  quoteChar: '│',
  hrChar: '─',
  listChar: '•',
  cbCheckedChar: '☑',
  cbUncheckedChar: '☐',
  tableWordWrap: true,
  strongStyle: chalk.bold,
  emStyle: chalk.italic,
  delStyle: chalk.strikethrough
};

export const DarkTheme = {
  ...BaseOptions,
  headingLevels: [
    chalk.bold.greenBright.underline,
    chalk.bold.green,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright
  ],
  codeStyle: chalk.bgBlackBright,
  hrStyle: chalk.dim,
  quoteStyle: chalk.dim,
  listStyle: chalk.cyan,
  cbStyle: chalk.cyan,
  linkStyle: chalk.blueBright
} as TerminalRendererOptions;

// todo replace colors
export const LightTheme = {
  ...BaseOptions,
  headingLevels: [
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright,
    chalk.bold.yellowBright
  ],
  codeStyle: chalk.bgWhite,
  hrStyle: chalk.dim,
  quoteStyle: chalk.dim,
  listStyle: chalk.redBright,
  cbStyle: chalk.redBright,
  linkStyle: chalk.blueBright
} as TerminalRendererOptions;


/**
 * Creates a dark theme with the given options overriding defaults
 * @param options
 */
export function darkTheme(options: Partial<TerminalRendererOptions> = {}): TerminalRendererOptions {
  return { ...DarkTheme, ...options };
}

/**
 * Creates a light theme with the given options overriding defaults
 * @param options
 */
export function lightTheme(options: Partial<TerminalRendererOptions> = {}): TerminalRendererOptions {
  return { ...LightTheme, ...options };
}

/**
 * Creates a terminal renderer extension for marked
 * @param opts
 */
export function createTerminalRenderer(
  opts: TerminalRendererOptions
): MarkedExtension {
  // hold current list depth for proper padding
  let currentListDepth = 0;

  // walk through tokens to modify them before rendering
  // process images here
  const walkTokens = async (token: Token) => {
    if (token.type === 'image') {
      // todo add error handling
      // todo add sizing support, probably via title attribute
      const options = { height: 5 }; // temporary hack limit height to 5 rows
      if (token.href.startsWith('http')) {
        const body = await got(token.href).buffer();
        token.text = await terminalImage.buffer(body, options);
      } else {
        const path = resolve(opts.cwd, token.href);
        token.text = await terminalImage.file(path, options);
      }
    }
  };

  // helper to render inline tokens
  function inline(r: Renderer, token: Token) {
    if ('tokens' in token && Array.isArray(token.tokens)) {
      return r.parser.parseInline(token.tokens);
    }
    if ('text' in token && typeof token.text === 'string') {
      return token.text;
    }
    return chalk.redBright('<ERROR INLINE>');
  }

  // helper to render block tokens
  function block(r: Renderer, token: Token) {
    if ('tokens' in token && Array.isArray(token.tokens)) {
      return r.parser.parse(token.tokens);
    }
    if ('text' in token && typeof token.text === 'string') {
      return token.text;
    }
    return chalk.redBright('<ERROR BLOCK>');
  }

  const renderer: RendererObject = {
    // inline elements

    space(_: Tokens.Space): string {
      return '';
    },

    checkbox(token: Tokens.Checkbox): string {
      return opts.cbStyle(
        token.checked ? opts.cbCheckedChar : opts.cbUncheckedChar
      ) + SEP;
    },

    strong(token: Tokens.Strong): string {
      return opts.strongStyle(inline(this, token));
    },

    em(token: Tokens.Em): string {
      return opts.emStyle(inline(this, token));
    },

    codespan(token: Tokens.Codespan): string {
      return opts.codeStyle(token.text);
    },

    br(_: Tokens.Br): string {
      return EOL;
    },

    del(token: Tokens.Del): string {
      return opts.delStyle(inline(this, token));
    },

    link(token: Tokens.Link): string {
      return terminalLink(inline(this, token), token.href);
    },

    image(token: Tokens.Image): string {
      // see walkTokens for image processing
      return token.text;
    },

    text(token: Tokens.Text | Tokens.Escape): string {
      const output = symbols(
        (token.type === 'text') ? inline(this, token) : token.text
      );
      if (currentListDepth === 0) {
        return output;
      }
      // text inside a list, need to wrap accordingly
      if (strLen(output) <= opts.lineLength) {
        return output;
      }
      // need to wrap text
      const lines = hardWrap(output, opts.lineLength - (currentListDepth * 2))
        .split(EOL);
      // first line as is, rest need to be indented
      const wrapped = [lines[0]];
      for (let i = 1; i < lines.length; ++i) {
        wrapped.push(SEP + SEP + lines[i]);
      }
      return wrapped.join(EOL);
    },

    // block elements

    code(token: Tokens.Code): string {
      const language = token.lang ?? '';
      const output = highlight(token.text, { language });

      return section(boxen(output, {
        title: language,
        titleAlignment: 'left',
        width: opts.lineLength,
        padding: 1,
        borderColor: 'gray'
      }));
    },

    blockquote(token: Tokens.Blockquote): string {
      return section(
        opts.quoteStyle(
          trimEmptyLines(block(this, token)).split(EOL).map((line) =>
            opts.quoteChar + SEP + line
          ).join(EOL)
        )
      );
    },

    def(_: Tokens.Def): string {
      // todo implement me
      return '';
    },

    heading(token: Tokens.Heading): string {
      const levelStyle = opts.headingLevels[token.depth - 1];
      return section(levelStyle(inline(this, token)));
    },

    hr(_: Tokens.Hr): string {
      return section(opts.hrStyle(opts.hrChar.repeat(opts.lineLength)));
    },

    paragraph(token: Tokens.Paragraph): string {
      return section(hardWrap(inline(this, token), opts.lineLength));
    },

    // compound elements

    html(_: Tokens.HTML | Tokens.Tag): string {
      console.warn(
        chalk.yellowBright(
          '[TerminalRenderer] HTML token encountered, which is not supported in terminal renderer. Content will be skipped.'
        )
      );
      return '';
    },

    list(token: Tokens.List): string {
      currentListDepth++;

      const items = token.items.map((i) => this.listitem(i));

      let output = '';
      if (token.ordered) {
        // ordered list need a counter
        let start = token.start || 1;
        const lines = items
          .map((line) => line.replace(LI, opts.listStyle(start++ + '.')))
          .join(EOL);
        output = padLines(EOL + lines);
      } else {
        // unordered list/checkboxes
        const lines = items
          .map((line) => line.replace(LI, opts.listStyle(opts.listChar)))
          .join(EOL);
        output = padLines(EOL + lines);
      }
      currentListDepth--;
      return section(
        (currentListDepth === 0) ? trimEmptyLines(output) : output
      );
    },

    listitem(token: Tokens.ListItem): string {
      return trimEmptyLines(LI + SEP + block(this, token));
    },

    table({ header, rows }: Tokens.Table): string {
      const { lineLength, tableWordWrap: wordWrap } = opts;

      const head = header.map((cell) => cell.text);
      const bodyRows = rows.map((row) => row.map((cell) => cell.text));

      // create table with no columns restrictions
      let table = new Table({ head, wordWrap });
      table.push(...bodyRows);
      const output = table.toString();
      const length = output.search(EOL);
      if (length <= lineLength) {
        return section(output);
      }

      // re-create table with normalized columns
      const width = Math.ceil(lineLength / head.length);
      table = new Table({ head, wordWrap, colWidths: head.map(() => width) });
      table.push(...bodyRows);
      return section(table.toString());
    }
  };

  return { renderer, walkTokens, async: true };
}
