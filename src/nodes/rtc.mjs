// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<rtc>** node with specific options.
 */
export default class Rtc extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('rtc', {
      children,
      attributes,
      listeners
    })
  }
}
