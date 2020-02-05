// @flow

import type { Attributes, Nodes, ENodeEventListenersObject } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<style>** node with specific options.
 * In order to define styles, give stringified styles to *options.children* property.
 */
export default class Style extends ENode {
  constructor(children?: Nodes, attributes?: Attributes, listeners?: ENodeEventListenersObject) {
    super('style', {
      children,
      attributes,
      listeners
    })
  }
}
