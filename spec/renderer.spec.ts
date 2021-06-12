import {CliRenderer} from '../src/renderer';
import {DARK} from '../src/defaults';

describe('renderer', () => {
    it('should create a cli renderer', () => {
        expect(new CliRenderer(DARK)).toBeTruthy();
    });
});
