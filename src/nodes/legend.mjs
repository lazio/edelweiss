// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<legend>** node with specific options.
 * May be only first node of the **<fieldset>** node and represents a caption for the content of its parent.
 */
export default class Legend extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('legend', options)
  }
}
