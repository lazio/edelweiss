// @flow

export default class Match<T> {
  declare _value: T
  declare _matched: boolean
  declare _multi: boolean

  constructor(value: T) {
    this._value = value
    this._matched = false
    this._multi = false
  }

  static of<T>(value: T): Match<T> {
    return new Match(value)
  }

  extract(): T {
    return this._value
  }

  matched(value: boolean) {
    this._matched = value
    return this
  }

  multi(value: boolean) {
    this._multi = value
    return this
  }

  on<R>(predicat: (value: T) => boolean, fn: (value: T) => R) {
    this._value =
      (this._multi || !this._matched) && (this._matched = predicat(this._value))
        ? // $FlowFixMe
          fn(this._value)
        : this._value
    return this
  }

  otherwise<R>(fn: (value: T) => R) {
    // $FlowFixMe
    this._value = this._matched ? this._value : fn(this._value)
    return this
  }
}
