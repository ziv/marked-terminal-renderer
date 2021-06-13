import * as marked from 'marked';
import terminalRenderer from '../src';

describe('marked-terminal-renderer', () => {
  marked.use(terminalRenderer());

  it('simple sanity', () => {
    expect(marked('example')).toBe('\nexample\n');
  });
});
