// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<html>** node with specific options.
 */
export default class Html extends ENode {
  constructor(options?: ENodeOptions) {
    super('html', options)
  }
}
