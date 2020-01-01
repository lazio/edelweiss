// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<ruby>** node with specific options.
 */
export default class Ruby extends ENode {
  constructor(options?: ENodeOptions) {
    super('ruby', options)
  }
}
