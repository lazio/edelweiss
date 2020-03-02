// @flow

import Component from './component/component.mjs'
import { diff, normalizeHTML, attachEvents } from './utils/dom.mjs'
import { eventListenersMap } from './template/template.mjs'

// Polyfill for trusted types
if (typeof window.trustedTypes === 'undefined') {
  window.trustedTypes = {
    createPolicy(
      name: string,
      rules: {| createHTML: (text: string) => string |}
    ) {
      return rules
    },
  }
}

// Policy of "edelweiss" framework for preventing XSS vulnerability.
// More info [here](https://github.com/w3c/webappsec-trusted-types)
const edelweissPolicy = window.trustedTypes.createPolicy('edelweiss', {
  createHTML(text: string) {
    return text
  },
})

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

    // Clear events cash
    eventListenersMap.clear()

    toElement.hasChildNodes()
      ? diff(toElement, newToElement)
      : toElement.replaceWith(newToElement)
  } else {
    console.warn(`"${to}" element is not exist on the page.`)
  }
}
