// @flow

import type { MTNodeOptions } from './mtn.mjs'
import type { InputType } from '../typedefs.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<input>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Input extends MTNode {
  constructor(type: InputType, options?: MTNodeOptions) {
    super('input', options)
    this._attributes.type = type
    this._children = undefined
  }
}
