// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<section>** node with specific options.
 */
export default class Section extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('section', options)
  }
}
