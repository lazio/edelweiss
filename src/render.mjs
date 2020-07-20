// @flow

import Maybe from './utils/algebraic/maybe.mjs'
import Component from './component/component.mjs'
import { element } from './utils/functional.mjs'
import { loadCSS } from './utils/styles.mjs'
import { stylePaths } from './css.mjs'
import { edelweissPolicy } from './utils/trusted_types.mjs'
import { eventListenersMap } from './template/template.mjs'
import { diff, normalizeHTML, attachEvents } from './utils/dom.mjs'

/**
 * Render templates on the page.
 */
export function render(
  to: string,
  nodes:
    | string
    | Component
    | Promise<string>
    | (string | Component | Promise<string>)[]
): void {
  element(to)
    .map((toElement) => {
      Maybe.of(toElement.cloneNode(false)).map((element) => {
        normalizeHTML(nodes)
          .then((html) => {
            element.innerHTML = edelweissPolicy.createHTML(html)
            return element
          })
          .then((element) => {
            Array.from(element.children).forEach(attachEvents)
            return element
          })
          .then((element) => {
            stylePaths.forEach(loadCSS)
            // Clear events cash
            eventListenersMap.clear()
            // Clear paths of styles
            stylePaths.clear()
            return element
          })
          .then((element) => {
            toElement.hasChildNodes()
              ? diff(toElement, element)
              : toElement.replaceWith(element)
          })
      })
      return toElement
    })
    .mapNothing(() => {
      throw new Error(`"${to}" element is not exist on the page.`)
    })
}
