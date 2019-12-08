// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<figure>** node with specific options.
 */
export default class Figure extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('figure', options)
  }
}
