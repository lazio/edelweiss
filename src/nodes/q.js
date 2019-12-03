import MTNode from './mtn'

/**
 * Construct **<q>** node with specific options.
 */
export default class Q extends MTNode {
  /**
   * @param {string} cite URL that designates a source document or message for the information quoted. This attribute is intended to point to information explaining the context or the reference for the quote.
   * @param {MTNodeOptions} [options]
   */
  constructor(cite, options) {
    super('q', options)
    this._attributes.cite = cite
  }
}
