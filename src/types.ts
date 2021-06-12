import {Chalk} from 'chalk';

export interface CliRendererOptions {
    // terminal
    lineLength: number;
    indent: string;
    mode?: 'dark' | 'light';

    // text
    strongStyle: Chalk;
    emStyle: Chalk;
    delStyle: Chalk;

    // heading
    headingLevels: string[];

    // code
    codeStyle: Chalk;
    codeInfoStyle: Chalk;

    // block-quote
    quotePadding: number;
    quoteChar: string;
    quoteStyle: Chalk;

    // hr
    hrChar: string;
    hrStyle: Chalk;

    // lists
    listStyle: Chalk;
    listChar: string;

    // checkbox
    cbCheckedChar: string;
    cbUncheckedChar: string;
    cbStyle: Chalk;

    // link
    linkStyle: Chalk;

    // table
    // todo complete options
    tableWordWrap: boolean;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
export type InfoString = string | undefined;
export type CellFlags = { header: boolean; align: 'center' | 'left' | 'right' | null };
