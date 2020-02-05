// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<colgroup>** node with specific options.
 */
export default class Colgroup extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('colgroup', {
      children,
      attributes,
      listeners
    })
  }
}
