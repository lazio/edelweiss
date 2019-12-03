import MTNode from './mtn'

/**
 * Construct **<base>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Base extends MTNode {
  /**
   * @param {string} href base url for all urls of the document.
   * @param {TargetType|null} [target] base url for all urls of the document.
   * @param {MTNodeOptions} [options]
   */
  constructor(href, target, options) {
    super('base', options)
    this._attributes.href = href
    if (target) {
      this._attributes.target = target
    }
    this._children = undefined
  }
}
