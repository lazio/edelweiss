// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<title>** node with specific options.
 */
export default class Title extends MTNode {
  /**
   * @throws {Error} if *options.children* isn't type of string.
   */
  constructor(options?: MTNodeOptions) {
    super('title', options)
    if (options && options.children && typeof options.children !== 'string') {
      throw new TypeError(`Children of the <title> node must be string, but got ${typeof options.children}`)
    }
  }
}
