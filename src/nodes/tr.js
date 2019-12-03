import MTNode from './mtn'

/**
 * Construct **<tr>** node with specific options.
 */
export default class Tr extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('tr', options)
  }
}
