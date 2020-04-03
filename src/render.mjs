// @flow

import Component from './component/component.mjs'
import { eventListenersMap } from './template/template.mjs'
import { diff, normalizeHTML, attachEvents } from './utils/dom.mjs'
import { loadCSS } from './utils/styles.mjs'
import { edelweissPolicy } from './utils/trusted_types.mjs'
import { stylePaths } from './css.mjs'

/**
 * Render templates on the page.
 */
export async function render(
  to: string,
  nodes: string | Component | (string | Component)[]
): Promise<void> {
  const toElement = document.querySelector(to)

  if (toElement) {
    const newToElement = toElement.cloneNode(false)

    newToElement.innerHTML = edelweissPolicy.createHTML(await normalizeHTML(nodes))

    Array.from(newToElement.children).forEach(attachEvents)
    stylePaths.forEach(loadCSS)

    // Clear events cash
    eventListenersMap.clear()
    // Clear paths of styles
    stylePaths.clear()

    toElement.hasChildNodes()
      ? diff(toElement, newToElement)
      : toElement.replaceWith(newToElement)
  } else {
    console.warn(`"${to}" element is not exist on the page.`)
  }
}
