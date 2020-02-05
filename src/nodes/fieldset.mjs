// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<fieldset>** node with specific options.
 */
export default class Fieldset extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('fieldset', {
      children,
      attributes,
      listeners
    })
  }
}
