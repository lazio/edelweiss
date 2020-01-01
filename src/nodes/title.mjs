// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<title>** node with specific options.
 */
export default class Title extends ENode {
  /**
   * @throws {Error} if *options.children* isn't type of string.
   */
  constructor(options?: ENodeOptions) {
    super('title', options)
    if (options && options.children && typeof options.children !== 'string') {
      throw new TypeError(`Children of the <title> node must be string, but got ${typeof options.children}`)
    }
  }
}
