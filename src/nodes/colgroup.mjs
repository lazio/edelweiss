// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<colgroup>** node with specific options.
 */
export default class Colgroup extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('colgroup', options)
  }
}
