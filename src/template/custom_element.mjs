// @flow

import Maybe from '../utils/monads/maybe.mjs'

export function registerCustomElement(
  match: RegExp$matchResult,
  constructor: Class<Element>
) {
  const customNameTag = match[1]

  if (!customNameTag || typeof customNameTag !== 'string') {
    throw new TypeError(`tag name for custom element must be provided and be type of "string"!
    Tag: ${customNameTag}
    Constructor: ${constructor.toString()}`)
  }

  if (!constructor) {
    throw new TypeError(`"constructor" parameter for custom element must be provided!
    Tag: ${customNameTag}
    Constructor: ${constructor.toString()}`)
  }

  // Name of the standart tag starts from ":", so we must get rid of it.
  const extendNativeName: string | void = match[2]
    ? match[2].slice(1)
    : undefined

  Maybe.of(customElements.get(customNameTag)).mapNothing(() => {
    customElements.define(
      customNameTag,
      constructor,
      extendNativeName ? { extends: extendNativeName } : undefined
    )
  })
}
