import MTNode from './mtn'

/**
 * Construct **<figure>** node with specific options.
 */
export default class Figure extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('figure', options)
  }
}
