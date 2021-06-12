import { CliRendererOptions } from './types';
import { MarkedExtension } from './deps';
import { CliRenderer } from './renderer';
import { DARK, LIGHT } from './defaults';

export * from './types';

export default function (
  opts: Partial<CliRendererOptions> = {}
): MarkedExtension {
  // default mode is dark
  const dark = !(opts.mode && opts.mode === 'light');
  // merge with default
  const options = { ...(dark ? DARK : LIGHT), ...opts };
  // this extension expose renderer
  return { renderer: new CliRenderer(options) };
}
