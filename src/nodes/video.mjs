// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<video>** node with specific options.
 */
export default class Video extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('video', options)
  }
}
