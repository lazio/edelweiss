import MTNode from './mtn'

/**
 * Construct **<video>** node with specific options.
 */
export default class Video extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('video', options)
  }
}
