// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<details>** node with specific options.
 */
export default class Details extends MTNode {
  constructor(open?: boolean = false, options?: MTNodeOptions) {
    super('details', options)
    this._attributes.open = open
  }
}
