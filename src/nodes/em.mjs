// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<em>** node with specific options.
 */
export default class Em extends ENode {
  constructor(options?: ENodeOptions) {
    super('em', options)
  }
}
