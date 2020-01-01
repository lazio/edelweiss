// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<summary>** node with specific options.
 */
export default class Summary extends ENode {
  constructor(options?: ENodeOptions) {
    super('summary', options)
  }
}
