import {chalk, highlight, Renderer, Slugger, Table, wrap} from './deps';
import {CellFlags, CliRendererOptions, HeadingLevel, InfoString} from './types';
import {asArray, asObject, fromArray, fromNestedArray, textify} from './utils';

const EMPTY = '';
const SEP = ' ';
const EOL = '\n';
const LIST_CHAR = '྿';
const NOT_EMPTY = flag => !!flag;

export class CliRenderer extends Renderer {
    constructor(public readonly opts: CliRendererOptions) {
        super();
    }

    code(code: string, infostring: InfoString, escaped: boolean): string {
        const {lineLength, codeStyle, codeInfoStyle} = this.opts;
        const mapper = line => SEP + codeStyle((SEP + line).padEnd(lineLength - 2, SEP));
        let rendered = ['', ...code.split(EOL), ''].map(mapper).join(EOL);
        if (infostring) {
            rendered = highlight(rendered, {language: infostring});
        }
        const info = infostring ? EOL + SEP + codeInfoStyle(SEP + infostring + SEP) : EMPTY;
        return rendered + info + EOL;
    }

    blockquote(quote: string) {
        const {quotePadding, quoteChar, quoteStyle} = this.opts;
        const mapper = line => quoteStyle(SEP.repeat(quotePadding) + quoteChar + SEP + line);
        return quote.trimRight().split(EOL).map(mapper).join(EOL) + EOL;
    }

    html(html: string): string {
        return chalk.redBright('HTML need to be implemented') + EOL;
    }

    heading(text: string, level: HeadingLevel, raw: string, slugger: Slugger): string {
        const {headingLevels} = this.opts;
        return EOL + chalk.hex(headingLevels[level - 1])(text) + EOL;
    }

    hr(): string {
        const {lineLength, hrStyle, hrChar} = this.opts;
        return EOL + SEP + hrStyle(hrChar.repeat(lineLength - 2)) + SEP + EOL;
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

    checkbox(checked: boolean): string {
        const {cbStyle, cbUncheckedChar, cbCheckedChar} = this.opts;
        return cbStyle(checked ? cbCheckedChar : cbUncheckedChar) + SEP;
    }

    paragraph(text: string): string {
        return EOL + text + EOL
    }

    table(header: string, body: string): string {
        const {lineLength, tableWordWrap: wordWrap} = this.opts;

        const headers = fromArray(header);
        const rows = fromNestedArray(body);

        const head =  headers.map(h => h.content);

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
        const {lineLength: width, indent} = this.opts;
        return wrap(textify(text), {width, indent});
    }
}
