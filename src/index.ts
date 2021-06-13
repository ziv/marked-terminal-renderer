import { CliRendererOptions } from './types';
import { MarkedExtension } from './deps';
import { CliRenderer } from './renderer';
import { DARK, LIGHT } from './defaults';
import { asPlain } from './utils';

export * from './types';

// the default mode is dark
// this extension expose renderer
export default function (opts?: CliRendererOptions): MarkedExtension {
  return { renderer: asPlain(new CliRenderer(opts || DARK)) };
}
