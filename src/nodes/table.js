import MTNode from './mtn'

/**
 * Construct **<table>** node with specific options.
 */
export default class Table extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('table', options)
  }
}
