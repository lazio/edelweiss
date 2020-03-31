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
