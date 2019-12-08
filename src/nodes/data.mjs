// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<data>** node with specific options.
 */
export default class Data extends MTNode {
  constructor(value: string, options?: MTNodeOptions) {
    super('data', options)
    this._attributes.value = value
  }
}
