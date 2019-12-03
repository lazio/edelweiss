import MTNode from './mtn'

/**
 * Construct **<img>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Img extends MTNode {
  /**
   * @param {string} src path to image source.
   * @param {string} alt placeholder of the image.
   * @param {MTNodeOptions} [options]
   */
  constructor(src, alt, options) {
    super('img', options)
    this._attributes.src = src
    this._attributes.alt = alt
    this._children = undefined
  }
}
