// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<dfn>** node with specific options.
 */
export default class Dfn extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('dfn', {
      children,
      attributes,
      listeners
    })
  }
}
