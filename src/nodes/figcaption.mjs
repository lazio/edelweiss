// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<figcaption>** node with specific options.
 */
export default class Figcaption extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('figcaption', {
      children,
      attributes,
      listeners
    })
  }
}
