// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<caption>** node with specific options.
 * May be only child of **<table>** node.
 */
export default class Caption extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('caption', {
      children,
      attributes,
      listeners
    })
  }
}
