import * as marked from 'marked';
import terminalRenderer from '../src';
import {MarkedOptions} from 'marked';

describe('marked-terminal-renderer', () => {
    it.skip('use is not working', () => {
        marked.use(terminalRenderer());
        expect(marked('example')).toBe('\nexample\n');
    });

    it('simple test', () => {
        expect(marked('example', terminalRenderer() as MarkedOptions)).toBe('\nexample\n');
    });
});
