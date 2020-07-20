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
    .map(async (toElement) => {
      return Maybe.of(toElement.cloneNode(false))
        .map(async (element) => {
          element.innerHTML = edelweissPolicy.createHTML(
            await normalizeHTML(nodes)
          )
          return element
        })
        .map((element) => {
          Array.from(element.children).forEach(attachEvents)
          return element
        })
        .map((element) => {
          stylePaths.forEach(loadCSS)
          // Clear events cash
          eventListenersMap.clear()
          // Clear paths of styles
          stylePaths.clear()
          return element
        })
        .map((element) => {
          toElement.hasChildNodes()
            ? diff(toElement, element)
            : toElement.replaceWith(element)
        })
        .extract()
    })
    .mapNothing(() => {
      throw new Error(`"${to}" element is not exist on the page.`)
    })
}
