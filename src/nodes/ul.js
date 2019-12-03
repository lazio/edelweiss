import MTNode from './mtn'

/**
 * Construct **<ul>** node with specific options.
 * Children must be **<li>** nodes.
 */
export default class Ul extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('ul', options)
  }
}
