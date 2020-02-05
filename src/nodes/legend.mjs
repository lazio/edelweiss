// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<legend>** node with specific options.
 * May be only first node of the **<fieldset>** node and represents a caption for the content of its parent.
 */
export default class Legend extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('legend', {
      children,
      attributes,
      listeners
    })
  }
}
