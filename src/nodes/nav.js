import MTNode from './mtn'

/**
 * Construct **<nav>** node with specific options.
 */
export default class Nav extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('nav', options)
  }
}
