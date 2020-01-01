// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<script>** node with specific options.
 */
export default class Script extends ENode {
  constructor(src: ?string, options?: ENodeOptions) {
    super('script', options)
    if (src) {
      this._attributes.src = src
    }
  }
}
