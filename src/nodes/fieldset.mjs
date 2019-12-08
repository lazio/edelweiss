// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<fieldset>** node with specific options.
 */
export default class Fieldset extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('fieldset', options)
  }
}
