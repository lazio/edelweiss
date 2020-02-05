// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<noscript>** node with specific options.
 */
export default class NoScript extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('noscript', {
      children,
      attributes,
      listeners
    })
  }
}
