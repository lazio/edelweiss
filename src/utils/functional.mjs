// @flow

import Maybe from './algebraic/maybe.mjs'

export function element(
  selector: string,
  from?: HTMLElement
): Maybe<HTMLElement> {
  return Maybe.of((from || document).querySelector(selector))
}
