import MTNode from './mtn'

/**
 * Construct **<dfn>** node with specific options.
 */
export default class Dfn extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('dfn', options)
  }
}
