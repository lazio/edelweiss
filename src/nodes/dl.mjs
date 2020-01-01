// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<dl>** node with specific options.
 * The node encloses a list of groups of terms (specified using the **<dt>** node) and descriptions (provided by **<dd>** nodes).
 */
export default class Dl extends ENode {
  constructor(options?: ENodeOptions) {
    super('dl', options)
  }
}
