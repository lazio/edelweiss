// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<bdo>** node with specific options.
 */
export default class Bdo extends ENode {
  constructor(options?: ENodeOptions) {
    super('bdo', options)
  }
}
