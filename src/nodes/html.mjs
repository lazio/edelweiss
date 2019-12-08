// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<html>** node with specific options.
 */
export default class Html extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('html', options)
  }
}
