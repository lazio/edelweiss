// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<script>** node with specific options.
 */
export default class Script extends MTNode {
  constructor(src: ?string, options?: MTNodeOptions) {
    super('script', options)
    if (src) {
      this._attributes.src = src
    }
  }
}
