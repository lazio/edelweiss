import MTNode from './mtn'

/**
 * Construct **<article>** node with specific options.
 */
export default class Article extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('article', options)
  }
}
