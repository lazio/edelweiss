// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<dialog>** node with specific options.
 */
export default class Dialog extends MTNode {
  constructor(open?: boolean = false, options?: MTNodeOptions) {
    super('dialog', options)
    this._attributes.open = open
  }
}
