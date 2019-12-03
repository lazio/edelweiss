import MTNode from './mtn'

/**
 * Construct **<audio>** node with specific options.
 */
export default class Audio extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('audio', options)
  }
}
