// @flow

import type { Attributes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<param>** node with specific options.
 * This node can't have children.
 */
export default class Param extends ENode {
  constructor(attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('param', {
      attributes,
      listeners
    })
  }
}
