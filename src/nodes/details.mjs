// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<details>** node with specific options.
 */
export default class Details extends ENode {
  constructor(open?: boolean = false, options?: ENodeOptions) {
    super('details', options)
    this._attributes.open = open
  }
}
