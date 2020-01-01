// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<kbd>** node with specific options.
 */
export default class Kbd extends ENode {
  constructor(options?: ENodeOptions) {
    super('kbd', options)
  }
}
