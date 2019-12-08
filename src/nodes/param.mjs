// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<param>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Param extends MTNode {
  constructor(name: string, value: string, options?: MTNodeOptions) {
    super('param', options)
    this._attributes.name = name
    this._attributes.value = value
    this._children = undefined
  }
}
