// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<article>** node with specific options.
 */
export default class Article extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('article', options)
  }
}
