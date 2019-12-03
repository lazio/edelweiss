import MTNode from './mtn'

/**
 * Construct **<abbr>** node with specific options.
 */
export default class Abbr extends MTNode {
  /**
   * @param {string} [title] description of **<abbr>**.
   * @param {MTNodeOptions} [options]
   */
  constructor(title, options) {
    super('abbr', options)
    if (title) {
      this._attributes.title = title
    }
  }
}
