// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<button>** node with specific options.
 */
export default class Button extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('button', options)
  }
}
