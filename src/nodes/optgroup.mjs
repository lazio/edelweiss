// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<optgroup>** node with specific options.
 */
export default class OptGroup extends ENode {
  constructor(label: string, disabled: ?boolean = false, options?: ENodeOptions) {
    super('optgroup', options)
    this._attributes.label = label
    if (disabled) {
      this._attributes.disabled = disabled
    }
  }
}
