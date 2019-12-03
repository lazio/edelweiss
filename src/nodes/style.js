import MTNode from './mtn'

/**
 * Construct **<style>** node with specific options.
 * In order to define styles, give stringified styles to *options.children* property.
 */
export default class Style extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('style', options)
  }
}
