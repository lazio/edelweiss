// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<audio>** node with specific options.
 */
export default class Audio extends ENode {
  constructor(options?: ENodeOptions) {
    super('audio', options)
  }
}
