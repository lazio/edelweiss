// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<button>** node with specific options.
 */
export default class Button extends ENode {
  constructor(options?: ENodeOptions) {
    super('button', options)
  }
}
