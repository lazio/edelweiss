import MTNode from './mtn'

/**
 * Construct **<script>** node with specific options.
 */
export default class Script extends MTNode {
  /**
   * @param {string} [src] URI of an external script; this can be used as an alternative to embedding a script directly within a document.
   * @param {MTNodeOptions} [options]
   */
  constructor(src, options) {
    super('script', options)
    this._attributes.src = src
  }
}
