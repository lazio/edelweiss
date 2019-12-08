// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<noscript>** node with specific options.
 */
export default class NoScript extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('noscript', options)
  }
}
