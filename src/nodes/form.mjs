// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

export type FormMethod = 'post' | 'get' | 'dialog'

/**
 * Construct **<form>** node with specific options.
 */
export default class Form extends MTNode {
  constructor(action: ?string, method: ?FormMethod, options?: MTNodeOptions) {
    super('form', options)
    if (action) {
      this._attributes.action = action
    }
    if (method) {
      this._attributes.method = method
    }
  }
}
