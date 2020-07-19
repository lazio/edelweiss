// @flow

export default class Maybe<T> {
  declare _value: T

  constructor(value: T) {
    this._value = value
  }

  static of<T>(value: T): Maybe<$NonMaybeType<T>> {
    return new Maybe(value)
  }

  isJust(): boolean {
    return this._value !== null && this._value !== undefined
  }

  map<R>(fn: (value: $NonMaybeType<T>) => R): this {
    // $FlowFixMe
    this._value = this.isJust() ? fn(this._value) : this._value
    return this
  }

  mapNothing<R>(fn: () => R): this {
    // $FlowFixMe
    this._value = !this.isJust() ? fn() : this._value
    return this
  }

  filter(predicat: (value: $NonMaybeType<T>) => boolean): this {
    return this.isJust() && predicat(this._value)
      ? this
      : // $FlowFixMe
        Maybe.of<void>(undefined)
  }

  fold<R>(
    reduce: (accumulator: R, value: $NonMaybeType<T>) => R,
    initial: R
  ): R {
    return this.isJust() ? reduce(initial, this._value) : initial
  }

  extract(): T {
    return this._value
  }
}
