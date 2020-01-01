// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<slot>** node with specific options.
 */
export default class Slot extends ENode {
  constructor(name: string, options?: ENodeOptions) {
    super('slot', options)
    this._attributes.name = name
  }
}
