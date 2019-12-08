// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<cite>** node with specific options.
 */
export default class Cite extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('cite', options)
  }
}
