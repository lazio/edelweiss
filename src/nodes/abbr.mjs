// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<abbr>** node with specific options.
 */
export default class Abbr extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('abbr', {
      children,
      attributes,
      listeners
    })
  }
}
