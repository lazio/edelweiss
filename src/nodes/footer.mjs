// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<footer>** node with specific options.
 */
export default class Footer extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('footer', options)
  }
}
