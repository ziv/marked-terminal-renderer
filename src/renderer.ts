import {chalk, highlight, Renderer, Slugger, Table, wrap} from './deps';
import {CellFlags, CliRendererOptions, HeadingLevel, InfoString} from './types';
import {asArray, asObject, fromArray, fromNestedArray, pipe, textify, wrapper} from './utils';

const EMPTY = '';
const SEP = ' ';
const EOL = '\n';
const LIST_CHAR = '྿';
const NOT_EMPTY = flag => !!flag;
const $ = chalk.greenBright('$');

const block = text => EOL + text + EOL;
const mapLines = (text: string, mapper: (s) => string) => text.split(EOL).map(mapper).join(EOL) + EOL;

export class CliRenderer extends Renderer {
    constructor(public readonly opts: CliRendererOptions) {
        super();
    }

    // INLINE

    checkbox(checked: boolean): string {
        const {cbStyle, cbUncheckedChar, cbCheckedChar} = this.opts;
        return cbStyle(checked ? cbCheckedChar : cbUncheckedChar) + SEP;
    }

    strong(text: string): string {
        return this.opts.strongStyle(text);
    }

    em(text: string): string {
        return this.opts.emStyle(text);
    }

    codespan(code: string): string {
        return this.em(this.opts.codeStyle(code));
    }

    br(): string {
        return EOL;
    }

    del(text: string): string {
        return this.opts.delStyle(text);
    }

    link(href: string | null, title: string | null, text: string): string {
        // todo need to be refactor
        const {linkStyle} = this.opts;
        // if (supportsHyperlinks.stout || true) {
        //     return hyperLinker(linkStyle(text), href);
        // }
        return href === text ? linkStyle(href) : `${text}(${linkStyle(href)})`;
    }

    image(href: string | null, title: string | null, text: string): string {
        // no image support in terminal
        return '🌆';
    }

    text(text: string): string {
        return textify()(text);
        // return textify(this.wrapper)(text);
    }

    // BLOCK

    code(code: string, infostring: InfoString, escaped: boolean): string {
        const {lineLength, codeStyle, codeInfoStyle} = this.opts;
        const mapper = line => SEP + codeStyle((SEP + line).padEnd(lineLength - 2, SEP));
        let rendered = mapLines(block(code.trim()), mapper);
        return infostring
            ? highlight(rendered, {language: infostring}) + SEP + codeInfoStyle(SEP + infostring + SEP) + EOL
            : rendered;
    }

    blockquote(quote: string) {
        const {quotePadding, quoteChar, quoteStyle} = this.opts;
        const mapper = line => quoteStyle(SEP.repeat(quotePadding) + quoteChar + SEP + line);
        return block(mapLines(quote.trim(), mapper));
    }

    heading(text: string, level: HeadingLevel, raw: string, slugger: Slugger): string {
        const {headingLevels} = this.opts;
        const style = chalk.hex(headingLevels[level - 1]);
        return pipe(style, this.wrapper, block)(text);
    }

    hr(): string {
        const {lineLength, hrStyle, hrChar} = this.opts;
        return block(SEP + hrStyle(hrChar.repeat(lineLength - 2)) + SEP);
    }

    paragraph(text: string): string {
        return block(this.wrapper(text));
    }

    // COMPOUND

    html(html: string): string {
        return block(chalk.redBright('HTML need to be implemented'));
    }

    list(body: string, ordered: boolean, start: number): string {
        // todo consider use data as table
        const {listChar, listStyle} = this.opts;
        const mapper = ordered
            ? line => SEP + line.replace(LIST_CHAR, listStyle(start++))
            : line => SEP + line.replace(LIST_CHAR, listStyle(listChar));
        return EOL + body.split(EOL).filter(NOT_EMPTY).map(mapper).join(EOL) + EOL;
    }

    listitem(text: string): string {
        const mapper = (line, index) => index === 0 ? `${LIST_CHAR} ${line}` : `  ${line}`;
        return text.split(EOL).filter(NOT_EMPTY).map(mapper).join(EOL).trim() + EOL;
    }

    table(header: string, body: string): string {
        const {lineLength, tableWordWrap: wordWrap} = this.opts;

        const headers = fromArray(header);
        const rows = fromNestedArray(body);

        const head = headers.map(h => h.content);

        let table = new Table({head, wordWrap});
        table.push(...rows.map(row => row.map(r => r.content)));
        const output = table.toString();
        const length = output.search(EOL);
        if (length < lineLength) {
            return output + EOL;
        }
        const width = Math.ceil(lineLength / headers.length);
        table = new Table({head, wordWrap, colWidths: headers.map(() => width)});
        table.push(...rows.map(row => row.map(r => r.content)));
        return table.toString() + EOL;
    }

    tablerow(content: string): string {
        return asArray(content);
    }

    tablecell(content: string, flags: CellFlags): string {
        return asObject({content, flags});
    }

    // helpers

    get wrapper() {
        const {lineLength: width, indent} = this.opts;
        return wrapper({width, indent});
    }
}
