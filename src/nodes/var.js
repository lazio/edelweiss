import MTNode from './mtn'

/**
 * Construct **<var>** node with specific options.
 */
export default class Var extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('var', options)
  }
}
