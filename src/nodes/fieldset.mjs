// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<fieldset>** node with specific options.
 */
export default class Fieldset extends ENode {
  constructor(options?: ENodeOptions) {
    super('fieldset', options)
  }
}
