import MTNode from './mtn'

/**
 * Construct **<dl>** node with specific options.
 * The node encloses a list of groups of terms (specified using the **<dt>** node) and descriptions (provided by **<dd>** nodes).
 */
export default class Dl extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('dl', options)
  }
}
