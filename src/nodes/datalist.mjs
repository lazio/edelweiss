// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<datalist>** node with specific options.
 */
export default class Datalist extends MTNode {
  constructor(id: string, options?: MTNodeOptions) {
    super('datalist', options)
    this._attributes.id = id
  }
}
