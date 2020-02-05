// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<title>** node with specific options.
 */
export default class Title extends ENode {
  /**
   * @throws {Error} if *options.children* isn't type of string.
   */
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('title', {
      children,
      attributes,
      listeners
    })
    if (children && typeof children !== 'string') {
      throw new TypeError(`Children of the <title> node must be string, but got ${typeof children}`)
    }
  }
}
