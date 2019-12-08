// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<textarea>** node with specific options.
 */
export default class TextArea extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('textarea', options)
  }
}
