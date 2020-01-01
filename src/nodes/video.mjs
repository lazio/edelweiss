// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<video>** node with specific options.
 */
export default class Video extends ENode {
  constructor(options?: ENodeOptions) {
    super('video', options)
  }
}
