// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<bdi>** node with specific options.
 */
export default class Bdi extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('bdi', {
      children,
      attributes,
      listeners
    })
  }
}
