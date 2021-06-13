import { CliRendererOptions } from './types';
import { MarkedExtension } from './deps';
import { CliRenderer } from './renderer';
import { DARK, LIGHT } from './defaults';
import { asPlain } from './utils';

export * from './types';

// the default mode is dark
// this extension expose renderer only
export default function (opts?: Partial<CliRendererOptions>): MarkedExtension {
  // if options provided, merged with defaults
  // to make sure all options exists
  const options: CliRendererOptions = opts
    ? opts.mode === 'light'
      ? { ...LIGHT, ...opts }
      : { ...DARK, ...opts }
    : DARK;
  return { renderer: asPlain(new CliRenderer(options)) };
}
