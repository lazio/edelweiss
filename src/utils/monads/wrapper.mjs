// @flow

export default class Wrapper<T> {
  declare _value: T

  constructor(value: T) {
    this._value = value
  }

  static of(value: T): Wrapper<T> {
    return new Wrapper(value)
  }

  map<R>(fn: (value: T) => R): Wrapper<R> {
    return Wrapper.of(fn(this._value))
  }

  join(): Wrapper<T> {
    return this._value instanceof Wrapper ? this._value.join() : this
  }

  extract(): T {
    return this._value
  }

  toString() {
    // $FlowFixMe
    return `Wrapper ( ${this._value} )`
  }
}
