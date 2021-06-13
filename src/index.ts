import { CliRendererOptions } from './types';
import { MarkedExtension } from './deps';
import { CliRenderer } from './renderer';
import { DARK, LIGHT } from './defaults';
import { asPlain } from './utils';

export * from './types';

// the default mode is dark
// this extension expose renderer only
export default function (opts?: CliRendererOptions): MarkedExtension {
  if (opts) {
    // if options provided, merged with defaults
    // to make sure all options exists
    opts = opts.mode === 'light' ? { ...LIGHT, ...opts } : { ...DARK, ...opts };
  }
  return { renderer: asPlain(new CliRenderer(opts || DARK)) };
}
