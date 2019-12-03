import MTNode from './mtn'

/**
 * Construct **<details>** node with specific options.
 */
export default class Details extends MTNode {
  /**
   * @param {boolean} [open=false] indicates whether or not the details — that is, the contents of the **<details>** node — are currently visible. The default, `false`, means the details are not visible.
   * @param {MTNodeOptions} [options]
   */
  constructor(open = false, options) {
    super('details', options)
    this._attributes.open = open
  }
}
