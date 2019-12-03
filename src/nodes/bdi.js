import MTNode from './mtn'

/**
 * Construct **<bdi>** node with specific options.
 */
export default class Bdi extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('bdi', options)
  }
}
