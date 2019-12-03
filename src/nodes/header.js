import MTNode from './mtn'

/**
 * Construct **<header>** node with specific options.
 */
export default class Header extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('header', options)
  }
}
