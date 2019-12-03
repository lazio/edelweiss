import MTNode from './mtn'

/**
 * Construct **<rt>** node with specific options.
 * The **<rt>** node must always be contained within a **<ruby>** node.
 */
export default class Rt extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('rt', options)
  }
}
