import MTNode from './mtn'

/**
 * Construct **<noscript>** node with specific options.
 */
export default class NoScript extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('noscript', options)
  }
}
