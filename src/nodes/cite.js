import MTNode from './mtn'

/**
 * Construct **<cite>** node with specific options.
 */
export default class Cite extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('cite', options)
  }
}
