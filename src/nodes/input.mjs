// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Define all possible types of **<input>**.
 */
export type InputType =
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'

/**
 * Construct **<input>** node with specific options.
 * This node can't have children. If there is set ones, they will be ignored.
 */
export default class Input extends ENode {
  constructor(type: InputType, options?: ENodeOptions) {
    super('input', options)
    this._attributes.type = type
    this._children = undefined
  }
}
