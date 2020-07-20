// @flow

import Maybe from './algebraic/maybe.mjs'

export function element(
  selector: string,
  from?: HTMLElement
): Maybe<HTMLElement> {
  return Maybe.of((from || document).querySelector(selector))
}

type ElementCreator = {
  map: (fn: (element: HTMLElement) => HTMLElement) => ElementCreator,
  extract(): HTMLElement,
}

export function createElement(tag: string): ElementCreator {
  let element = document.createElement(tag)
  const creator: ElementCreator = {
    map(fn: (element: HTMLElement) => HTMLElement) {
      element = fn(element)
      return creator
    },
    extract() {
      return element
    },
  }
  return creator
}
