import { chalk } from './deps';
import { CliRendererOptions } from './types';

export const COMMON: Partial<CliRendererOptions> = {
  lineLength: 80,
  indent: '',
  quotePadding: 1,
  quoteChar: '│',
  hrChar: '─',
  listChar: '•',
  cbCheckedChar: '☑',
  cbUncheckedChar: '☐',
  tableWordWrap: true,
  headingStyle: chalk.bold,
  strongStyle: chalk.bold,
  emStyle: chalk.italic,
  delStyle: chalk.strikethrough
};

export const DARK = {
  ...COMMON,
  mode: 'dark',
  headingLevels: [
    '#00FF00',
    '#00DD00',
    '#00BB00',
    '#009900',
    '#007700',
    '#005500'
  ],
  codeStyle: chalk.bgBlackBright,
  codeInfoStyle: chalk.bgGray.yellowBright,
  hrStyle: chalk.dim,
  quoteStyle: chalk.dim,
  listStyle: chalk.cyan,
  cbStyle: chalk.cyan,
  linkStyle: chalk.blueBright
} as CliRendererOptions;

// todo replace colors
export const LIGHT = {
  ...COMMON,
  mode: 'dark',
  headingLevels: [
    '#ff0000',
    '#dd0000',
    '#bb0000',
    '#990000',
    '#770000',
    '#550000'
  ],
  codeStyle: chalk.bgWhite,
  codeInfoStyle: chalk.bgWhite.black,
  hrStyle: chalk.dim,
  quoteStyle: chalk.dim,
  listStyle: chalk.redBright,
  cbStyle: chalk.redBright,
  linkStyle: chalk.blueBright
} as CliRendererOptions;
