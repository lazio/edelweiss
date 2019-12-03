import MTNode from './mtn'

/**
 * Construct **<td>** node with specific options.
 */
export default class Td extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('td', options)
  }
}
