import MTNode from './mtn'

/**
 * Construct **<a>** node with specific options.
 */
export default class A extends MTNode {
  /**
   * @param {string} href link that must be opened.
   * @param {MTNodeOptions} [options]
   */
  constructor(href, options) {
    super('a', options)
    this._attributes.href = href
  }
}
