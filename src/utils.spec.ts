import { asPlain, pipe } from './utils';
import { CliRenderer } from './renderer';
import { DARK } from './defaults';

describe('utils', () => {
  describe('pipe', () => {
    it('should return function', () => {
      expect(pipe(() => true)).toBeInstanceOf(Function);
    });

    it('should compose functions', () => {
      const a = x => x + 1;
      const b = x => x * 2;
      const test = pipe(a, b);
      expect(test(1)).toBe(4);
    });
  });

  describe('asPlain', () => {
    it('should convert class to plain object', () => {
      const plain = asPlain(new CliRenderer(DARK));
      expect(typeof plain).toBe('object');
      expect(plain).not.toBeInstanceOf(CliRenderer);
      expect(plain).toBeInstanceOf(Object);
    });
  });
});
