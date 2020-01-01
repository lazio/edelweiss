// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<abbr>** node with specific options.
 */
export default class Abbr extends ENode {
  constructor(title?: string, options?: ENodeOptions) {
    super('abbr', options)
    if (title) {
      this._attributes.title = title
    }
  }
}
