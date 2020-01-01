// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<map>** node with specific options.
 */
export default class Map extends ENode {
  constructor(name: string, options?: ENodeOptions) {
    super('map', options)
    this._attributes.name = name
  }
}
