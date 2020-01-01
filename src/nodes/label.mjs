// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<label>** node with specific options.
 */
export default class Label extends ENode {
  constructor(options?: ENodeOptions) {
    super('label', options)
  }
}
