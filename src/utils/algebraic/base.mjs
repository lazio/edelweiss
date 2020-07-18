// @flow

export default class Base<T> {
  declare _value: T

  constructor(value: T) {
    this._value = value
  }

  static of<T>(value: T): Base<T> {
    return new Base(value)
  }

  map<R>(fn: (value: T) => R): Base<R> {
    return Base.of(fn(this._value))
  }

  filter(predicat: (value: T) => boolean): this {
    // $FlowFixMe
    return predicat(this._value) ? this : Base.of<void>(undefined)
  }

  fold<R>(reduce: (accumulator: R, value: T) => R, initial: R): R {
    return reduce(initial, this._value)
  }

  extract(): T {
    return this._value
  }
}
