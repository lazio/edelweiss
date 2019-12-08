// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<style>** node with specific options.
 * In order to define styles, give stringified styles to *options.children* property.
 */
export default class Style extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('style', options)
  }
}
