// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<code>** node with specific options.
 */
export default class Code extends ENode {
  constructor(options?: ENodeOptions) {
    super('code', options)
  }
}
