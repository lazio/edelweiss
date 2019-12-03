import MTNode from './mtn'

/**
 * Construct **<picture>** node with specific options.
 */
export default class Picture extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('picture', options)
  }
}
