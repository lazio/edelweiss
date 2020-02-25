// @flow

import Component from './component/component.mjs'
import { diff, normalizeHTML, attachEvents } from './utils/dom.mjs'
import { eventListenersMap } from './template/template.mjs'

/**
 * Render [ENode] node or nodes and its derivate nodes as element or elements.
 */
export function render(to: string, nodes: string | Component | (string | Component)[]): void {
  const toElement = document.querySelector(to)

  if (toElement) {
    const newToElement = toElement.cloneNode(false)

    const template = document.createElement('template')
    template.innerHTML = normalizeHTML(nodes)

    const children = Array.from(template.content.children)

    children.forEach(child => {
      document.adoptNode(child)

      attachEvents(child)

      newToElement.append(child)
    })

    // Clear events cash
    eventListenersMap.clear()

    toElement.hasChildNodes()
      ? diff(toElement, newToElement)
      : toElement.replaceWith(newToElement)
  } else {
    console.warn(`"${to}" element is not exist on the page.`)
  }
}
