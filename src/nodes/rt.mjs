// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<rt>** node with specific options.
 * The **<rt>** node must always be contained within a **<ruby>** node.
 */
export default class Rt extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('rt', options)
  }
}
