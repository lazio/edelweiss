// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<address>** node with specific options.
 */
export default class Address extends ENode {
  constructor(options?: ENodeOptions) {
    super('address', options)
  }
}
