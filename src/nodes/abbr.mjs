// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<abbr>** node with specific options.
 */
export default class Abbr extends MTNode {
  constructor(title?: string, options?: MTNodeOptions) {
    super('abbr', options)
    if (title) {
      this._attributes.title = title
    }
  }
}
