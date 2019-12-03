import MTNode from './mtn'

/**
 * Construct **<tbody>** node with specific options.
 */
export default class TBody extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('tbody', options)
  }
}
