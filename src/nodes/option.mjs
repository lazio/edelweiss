// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<option>** node with specific options.
 */
export default class Option extends ENode {
  constructor(options?: ENodeOptions) {
    super('option', options)
  }
}
