// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<dt>** node with specific options.
 */
export default class Dt extends ENode {
  constructor(options?: ENodeOptions) {
    super('dt', options)
  }
}
