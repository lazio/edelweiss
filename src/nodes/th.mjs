// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<th>** node with specific options.
 */
export default class Th extends ENode {
  constructor(options?: ENodeOptions) {
    super('th', options)
  }
}
