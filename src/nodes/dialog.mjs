// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<dialog>** node with specific options.
 */
export default class Dialog extends ENode {
  constructor(open?: boolean = false, options?: ENodeOptions) {
    super('dialog', options)
    this._attributes.open = open
  }
}
