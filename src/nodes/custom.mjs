// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

export type Constructor = Class<Element>

/**
 * Construct **<(custom-node-name)>** node with specific options.
 */
export default class Custom extends ENode {
  _extends: string | ENode | typeof undefined

  /**
   * @throws {Error} if **tag** or **constructor** isn't provided.
   */
  constructor(tag: string, constructor: Constructor, options?: ENodeOptions = {}) {
    super(tag, options)
    if (!constructor) {
      throw new Error(`Constructor value of the Custom ${tag} node must be provided!`)
    }

    const { extend } = options

    const customElementsOptions: ElementDefinitionOptions = {}
    if (extend) {
      this._extends = extend

      if (typeof extend === 'string') {
        customElementsOptions.extends = extend
      } else {
        customElementsOptions.extends = extend._tag
      }
    }

    const customElementConstructor: Class<Element> = customElements.get(tag)
    if (!customElementConstructor) {
      customElements.define(
        tag,
        constructor,
        extend ? customElementsOptions : undefined
      )
    }
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
    // $FlowFixMe
    const element = document.createElement(elementName, elementCreationOptions)

    const fulfilledElement = this._attachOptionsTo(element)
    if (elementCreationOptions) {
      fulfilledElement.setAttribute('is', elementCreationOptions.is)
    }
    return fulfilledElement
  }
}
