// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<progress>** node with specific options.
 */
export default class Progress extends ENode {
  constructor(value: number, max: ?number, options?: ENodeOptions) {
    super('progress', options)
    this._attributes.value = value
    this._attributes.max = max || 1
  }
}
