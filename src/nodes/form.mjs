// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

export type FormMethod = 'post' | 'get' | 'dialog'

/**
 * Construct **<form>** node with specific options.
 */
export default class Form extends ENode {
  constructor(action: ?string, method: ?FormMethod, options?: ENodeOptions) {
    super('form', options)
    if (action) {
      this._attributes.action = action
    }
    if (method) {
      this._attributes.method = method
    }
  }
}
