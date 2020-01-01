// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<meter>** node with specific options.
 */
export default class Meter extends ENode {
  constructor(options?: ENodeOptions) {
    super('meter', options)
  }
}
