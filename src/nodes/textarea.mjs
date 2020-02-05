// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<textarea>** node with specific options.
 */
export default class TextArea extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('textarea', {
      children,
      attributes,
      listeners
    })
  }
}
