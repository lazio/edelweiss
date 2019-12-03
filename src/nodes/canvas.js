import MTNode from './mtn'

/**
 * Construct **<canvas>** node with specific options.
 */
export default class Canvas extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('canvas', options)
  }
}
