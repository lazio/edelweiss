import MTNode from './mtn'

/**
 * Construct **<blockquote>** node with specific options.
 */
export default class Blockquote extends MTNode {
  /**
   * @param {string|null} [cite] a URL for the source of the quotation.
   * @param {MTNodeOptions} [options]
   */
  constructor(cite, options) {
    super('blockquote', options)
    if (cite) {
      this._attributes.cite = cite
    }
  }
}
