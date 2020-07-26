// @flow

import Maybe from './monads/maybe.mjs'
import { chain } from './fns/fns.mjs'

import type Wrapper from './monads/wrapper.mjs'

export function element(
  selector: string,
  from?: HTMLElement
): Maybe<HTMLElement> {
  return Maybe.of((from || document).querySelector(selector))
}

export function createElement(tag: string): Wrapper<HTMLElement> {
  return chain(document.createElement(tag))
}
