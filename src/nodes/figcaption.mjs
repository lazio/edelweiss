// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<figcaption>** node with specific options.
 */
export default class Figcaption extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('figcaption', options)
  }
}
