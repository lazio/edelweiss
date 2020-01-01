// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<legend>** node with specific options.
 * May be only first node of the **<fieldset>** node and represents a caption for the content of its parent.
 */
export default class Legend extends ENode {
  constructor(options?: ENodeOptions) {
    super('legend', options)
  }
}
