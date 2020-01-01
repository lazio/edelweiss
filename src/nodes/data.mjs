// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<data>** node with specific options.
 */
export default class Data extends ENode {
  constructor(value: string, options?: ENodeOptions) {
    super('data', options)
    this._attributes.value = value
  }
}
