// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<iframe>** node with specific options.
 */
export default class IFrame extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('iframe', {
      children,
      attributes,
      listeners
    })
  }
}
