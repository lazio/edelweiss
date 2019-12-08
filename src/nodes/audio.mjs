// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<audio>** node with specific options.
 */
export default class Audio extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('audio', options)
  }
}
