import MTNode from './mtn'

/**
 * Construct **<aside>** node with specific options.
 */
export default class Aside extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('aside', options)
  }
}
