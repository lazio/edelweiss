// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<datalist>** node with specific options.
 */
export default class Datalist extends ENode {
  constructor(id: string, options?: ENodeOptions) {
    super('datalist', options)
    this._attributes.id = id
  }
}
