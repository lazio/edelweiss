// @flow

import Wrapper from '../monads/wrapper.mjs'

export function identity<T>(value: T): T {
  return value
}

export function tap<T>(value: T, fn: (value: T) => mixed): T {
  fn(value)
  return value
}

export function alt(
  left: (...args: Array<mixed>) => mixed,
  right: (...args: Array<mixed>) => mixed
) {
  return (...args: Array<mixed>) => left(...args) || right(...args)
}

export function seq(...fns: Array<(value: mixed) => mixed>) {
  return (value: mixed): void => {
    fns.forEach((fn) => fn(value))
  }
}

export function fork(
  join: (firstValue: mixed, secondValue: mixed) => mixed,
  firstFn: (value: mixed) => mixed,
  secondFn: (value: mixed) => mixed
) {
  return (value: mixed) => join(firstFn(value), secondFn(value))
}

export function compose(...fns: Array<(...args: Array<mixed>) => mixed>) {
  return (...args: Array<mixed>) => {
    return fns.reduce(
      (currentArgs, fn) =>
        currentArgs === args && Array.isArray(currentArgs)
          ? fn(...currentArgs)
          : fn(currentArgs),
      args
    )
  }
}

export function chain<T>(value: T): Wrapper<T> {
  return Wrapper.of(value)
}

export function curry<R>(fn: (...args: Array<mixed>) => R, argumentsLength: number) {
  switch (argumentsLength) {
    case 1:
      return fn
    case 2:
      return (a1: mixed) => {
        return (a2: mixed) => {
          return fn(a1, a2)
        }
      }
    case 3:
      return (a1: mixed) => {
        return (a2: mixed) => {
          return (a3: mixed) => {
            return fn(a1, a2, a3)
          }
        }
      }
    default:
      throw new Error(
        `Function must have at least one argument and no more than 3. Taked -> ${argumentsLength}`
      )
  }
}
