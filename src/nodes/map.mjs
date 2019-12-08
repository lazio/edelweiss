// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<map>** node with specific options.
 */
export default class Map extends MTNode {
  constructor(name: string, options?: MTNodeOptions) {
    super('map', options)
    this._attributes.name = name
  }
}
