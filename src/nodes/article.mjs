// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<article>** node with specific options.
 */
export default class Article extends ENode {
  constructor(options?: ENodeOptions) {
    super('article', options)
  }
}
