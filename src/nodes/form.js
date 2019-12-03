import MTNode from './mtn'

/**
 * Construct **<form>** node with specific options.
 */
export default class Form extends MTNode {
  /**
   * @param {string} [action] the URI of a program that processes the form information. This value can be overridden by a *formaction* attribute on a **<button>**, **<input type="submit">** or **<input type="image">** node.
   * @param {'post' | 'get' | 'dialog'} [method] this value can be overridden by a *formmethod* attribute on a **<button>**, **<input type="submit">** or **<input type="image">** node.
   * @param {MTNodeOptions} [options]
   */
  constructor(action, method, options) {
    super('form', options)
    this._attributes.action = action
    this._attributes.method = method
  }
}
