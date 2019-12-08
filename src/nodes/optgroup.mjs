// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<optgroup>** node with specific options.
 */
export default class OptGroup extends MTNode {
  constructor(label: string, disabled: ?boolean = false, options?: MTNodeOptions) {
    super('optgroup', options)
    this._attributes.label = label
    if (disabled) {
      this._attributes.disabled = disabled
    }
  }
}
