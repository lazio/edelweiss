// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<progress>** node with specific options.
 */
export default class Progress extends MTNode {
  constructor(value: number, max: ?number, options?: MTNodeOptions) {
    super('progress', options)
    this._attributes.value = value
    this._attributes.max = max || 1
  }
}
