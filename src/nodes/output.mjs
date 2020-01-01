// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<output>** node with specific options.
 */
export default class Output extends ENode {
  constructor(options?: ENodeOptions) {
    super('output', options)
  }
}
