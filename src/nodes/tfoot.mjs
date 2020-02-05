// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<tfoot>** node with specific options.
 */
export default class TFoot extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('tfoot', {
      children,
      attributes,
      listeners
    })
  }
}
