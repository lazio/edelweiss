// @flow

import Base from './base.mjs'

export default class Maybe<T> extends Base<T> {
  static of<T>(value: T): Maybe<T> {
    return new Maybe(value)
  }

  isJust(): boolean {
    return this._value !== null && this._value !== undefined
  }

  map<R>(fn: (value: $NonMaybeType<T>) => R): Maybe<R> {
    // $FlowFixMe
    return this.isJust() ? Maybe.of(fn(this._value)) : this
  }

  filter(predicat: (value: $NonMaybeType<T>) => boolean): this {
    return this.isJust() && predicat(this._value)
      ? this
      // $FlowFixMe
      : Maybe.of<void>(undefined)
  }

  fold<R>(
    reduce: (accumulator: R, value: $NonMaybeType<T>) => R,
    initial: R
  ): R {
    return this.isJust() ? reduce(initial, this._value) : initial
  }
}
