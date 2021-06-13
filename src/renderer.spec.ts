import { CliRenderer } from './renderer';
import { DARK } from './defaults';

describe('renderer', () => {
  it('should create a cli renderer', () => {
    expect(new CliRenderer(DARK)).toBeTruthy();
  });
});
