// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<pre>** node with specific options.
 */
export default class Pre extends ENode {
  constructor(options?: ENodeOptions) {
    super('pre', options)
  }
}
