// @flow

import type { Attributes } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<wbr>** node with specific options.
 * This node can't have children.
 */
export default class Wbr extends ENode {
  constructor(attributes?: Attributes) {
    super('wbr', {
      attributes,
    })
  }
}
