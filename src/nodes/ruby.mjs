// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<ruby>** node with specific options.
 */
export default class Ruby extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('ruby', {
      children,
      attributes,
      listeners
    })
  }
}
