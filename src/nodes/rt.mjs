// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<rt>** node with specific options.
 * The **<rt>** node must always be contained within a **<ruby>** node.
 */
export default class Rt extends ENode {
  constructor(options?: ENodeOptions) {
    super('rt', options)
  }
}
