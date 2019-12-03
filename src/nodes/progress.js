import MTNode from './mtn'

/**
 * Construct **<progress>** node with specific options.
 */
export default class Progress extends MTNode {
  /**
   * @param {number} [max] describes how much work the task indicated by the **<progress>** node requires. The *max* attribute, if present, must have a value greater than zero and be a valid floating point number. The default value is 1.
   * @param {number} value specifies how much of the task that has been completed. It must be a valid floating point number between 0 and *max*, or between 0 and 1 if max is omitted. If there is no value attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take.
   * @param {MTNodeOptions} [options]
   */
  constructor(value, max = 1, options) {
    super('progress', options)
    this._attributes.value = value
    this._attributes.max = max
  }
}
