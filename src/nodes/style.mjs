// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<style>** node with specific options.
 * In order to define styles, give stringified styles to *options.children* property.
 */
export default class Style extends ENode {
  constructor(options?: ENodeOptions) {
    super('style', options)
  }
}
