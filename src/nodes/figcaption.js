import MTNode from './mtn'

/**
 * Construct **<figcaption>** node with specific options.
 */
export default class Figcaption extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('figcaption', options)
  }
}
