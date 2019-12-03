import MTNode from './mtn'

/**
 * Construct **<(custom-node-name)>** node with specific options.
 */
export default class Custom extends MTNode {
  /**
   * @private
   * @type {string|MTNode|undefined}
   */
  _extends

  /**
   * Creates node that represent custom DOM's element.
   * @param {string} tag name of the custom node.
   * @param {Function} constructor class or function that describe custom element.
   * @param {MTNodeOptions} [options]
   * @throws {Error} if **tag** or **constructor** isn't provided.
   */
  constructor(tag, constructor, options = {}) {
    super(tag, options)
    if (!constructor) {
      throw new Error(`Constructor value of the Custom ${tag} node must be provided!`)
    }

    const { extend } = options

    /** @type {ElementDefinitionOptions} */
    const customElementsOptions = {}
    if (extend) {
      this._extends = extend

      if (typeof extend === 'string') {
        customElementsOptions.extends = extend
      } else {
        customElementsOptions.extends = extend._tag
      }
    }
    customElements.define(
      tag,
      constructor,
      extend ? customElementsOptions : undefined
    )
  }

  createElement() {
    let elementName = ''
    if (this._extends) {
      if (typeof this._extends === 'string') {
        elementName = this._extends
      } else {
        elementName = this._extends._tag
      }
    } else {
      elementName = this._tag
    }
    const elementCreationOptions = this._extends ? { is: this._tag } : undefined
    const element = document.createElement(elementName, elementCreationOptions)

    const fulfilledElement = this._attachOptionsTo(element)
    if (elementCreationOptions) {
      fulfilledElement.setAttribute('is', elementCreationOptions.is)
    }
    return fulfilledElement
  }
}
