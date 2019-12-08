// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<dfn>** node with specific options.
 */
export default class Dfn extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('dfn', options)
  }
}
