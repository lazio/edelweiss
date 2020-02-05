// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<optgroup>** node with specific options.
 */
export default class OptGroup extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('optgroup', {
      children,
      attributes,
      listeners
    })
  }
}
