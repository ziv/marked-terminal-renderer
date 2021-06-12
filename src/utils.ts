import {emojify, IOptions, wrap} from './deps';

// helpers
export const pipe = (...functions) => args => functions.reduce((arg, fn) => fn(arg), args);

const comma = item => `${item},`;
const strip = item => item.substring(0, item.length - 1);
const parse = <T>(text: string, def: T): T => {
    try {
        return JSON.parse(text) as T
    } catch (e) {
        // todo add debug output to stderr
        return def;
    }
};

// table utils
export const asObject = item => comma(JSON.stringify(item));
export const asArray = item => comma(`[${strip(item)}]`);
export const fromArray = items => parse<any[]>(strip(items), []);
export const fromNestedArray = items => parse<any[]>(`[${strip(items)}]`, []);

// text utils
const textReplacers: [string | RegExp, string][] = [
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
const replacer = (text: string) => textReplacers.reduce((text: string, [target, dest]) => text.replace(target, dest), text);
export const wrapper = (opts: IOptions) => (text: string): string => wrap(text, opts);

// compositions
export const textify = (...functions) => pipe(replacer, emojify, ...functions);
