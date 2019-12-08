// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<slot>** node with specific options.
 */
export default class Slot extends MTNode {
  constructor(name: string, options?: MTNodeOptions) {
    super('slot', options)
    this._attributes.name = name
  }
}
