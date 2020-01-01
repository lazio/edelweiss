// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<img>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Img extends ENode {
  constructor(src: string, alt: string, options?: ENodeOptions) {
    super('img', options)
    this._attributes.src = src
    this._attributes.alt = alt
    this._children = undefined
  }
}
