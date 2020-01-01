// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<param>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Param extends ENode {
  constructor(name: string, value: string, options?: ENodeOptions) {
    super('param', options)
    this._attributes.name = name
    this._attributes.value = value
    this._children = undefined
  }
}
