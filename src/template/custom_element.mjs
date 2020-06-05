// @flow

/**
 * Defines custom element if it is not exists.
 * @param {string} tag name of the new element.
 * @param {Class<Element>} constructor class that describe new element.
 * @param {string} [extend] HTML tag that is extended.
 * @throws {TypeError} if [tag] or [constructor] is not defined.
 */
export function customElement(
  tag: string,
  constructor: Class<Element>,
  extend?: string
) {
  if (!tag || typeof tag !== 'string') {
    throw new TypeError(`"tag" parameter for "customElement" function must be provided and be type of "string"!
    Tag: ${tag}
    Constructor: ${constructor.toString()}
    Extend: ${extend || ''}`)
  }
  if (!constructor) {
    throw new TypeError(`"constructor" parameter for "customElement" function must be provided!
    Tag: ${tag}
    Constructor: ${constructor.toString()}
    Extend: ${extend || ''}`)
  }

  const customElementConstructor: Class<Element> | null = customElements.get(
    tag
  )
  if (!customElementConstructor) {
    customElements.define(
      tag,
      constructor,
      extend
        ? { extends: extend }
        : undefined
    )
  }
}

export function registerCustomElement(match: RegExp$matchResult, constructor: Class<Element>) {
  const customName = match[1]
  // Name of the standart tag starts from ":", so we must get rid of it.
  const extendNativeName: string | void = match[2] ? match[2].slice(1) : undefined
  customElement(customName, constructor, extendNativeName)
}
