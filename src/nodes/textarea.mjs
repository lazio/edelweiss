// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<textarea>** node with specific options.
 */
export default class TextArea extends ENode {
  constructor(options?: ENodeOptions) {
    super('textarea', options)
  }
}
