/**
 * Main class that creates DOM node.
 */
export default class MTNode {
  /** @private */
  _tag = ''
  /**
   * @private
   * @type {{ [key: string]: string|boolean|number }}
   */
  _attributes = {}
  /**
   * @private
   * @type {MTNode | MTNode[] | string | undefined}
   */
  _children
  /**
   * @private
   * @type {MTNodeEventListener | MTNodeEventListener[] | undefined}
   */
  _listeners

  /**
   * Creates node that represent DOM's element.
   * @param {string} tag
   * @param {MTNodeOptions} [options]
   * @throws {Error} if **tag** isn't provided.
   */
  constructor(tag, options = {}) {
    if (!tag) {
      throw new Error('Tag name isn\'t provided!')
    } else {
      this._tag = tag
    }

    const { attributes, children, listeners } = options

    if (attributes) {
      this._attributes = attributes
    }
    this._children = children
    this._listeners = listeners
  }

  /**
   * Creates element based on [this] node information.
   */
  createElement() {
    const element = document.createElement(this._tag)

    return this._attachOptionsTo(element)
  }

  /**
   * Attach listeners, sets attributes and add children to *element* parameter.
   * @param {HTMLElement} element
   */
  _attachOptionsTo(element) {
    if (Object.keys(this._attributes).length > 0) {
      const attributesEntries = Object.entries(this._attributes)
      attributesEntries.forEach(([key, value]) => {
        if (typeof value === 'boolean' && !value) {
          element.removeAttribute(key)
        } else {
          element.setAttribute(key, value)
        }
      })
    }

    if (this._children) {
      if (this._children instanceof Array) {
        this._children.forEach((child) => {
          element.append(child.createElement())
        })
      } else if (this._children instanceof MTNode) {
        element.append(this._children.createElement())
      } else {
        element.append(this._children)
      }
    }

    if (this._listeners) {
      if (this._listeners instanceof Array) {
        this._listeners.forEach(({ type, listener }) => {
          element.addEventListener(type, listener)
        })
      } else {
        const { type, listener } = this._listeners
        element.addEventListener(type, listener)
      }
    }

    return element
  }
}
