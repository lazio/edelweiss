// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<iframe>** node with specific options.
 */
export default class IFrame extends ENode {
  constructor(options?: ENodeOptions) {
    super('iframe', options)
  }
}
