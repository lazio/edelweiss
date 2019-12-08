// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<img>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Img extends MTNode {
  constructor(src: string, alt: string, options?: MTNodeOptions) {
    super('img', options)
    this._attributes.src = src
    this._attributes.alt = alt
    this._children = undefined
  }
}
