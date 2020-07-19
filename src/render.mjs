// @flow

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
      const newToElement = toElement.cloneNode(false)

      newToElement.innerHTML = edelweissPolicy.createHTML(
        await normalizeHTML(nodes)
      )

      Array.from(newToElement.children).forEach(attachEvents)
      stylePaths.forEach(loadCSS)

      // Clear events cash
      eventListenersMap.clear()
      // Clear paths of styles
      stylePaths.clear()

      toElement.hasChildNodes()
        ? diff(toElement, newToElement)
        : toElement.replaceWith(newToElement)

      return toElement
    })
    .mapNothing(() => console.warn(`"${to}" element is not exist on the page.`))
}
