// @flow

import { uid } from './utils/uid.mjs'
import { diff, convertToDom } from './utils/dom.mjs'

import type { ElementChildren } from './elements/element_function.mjs'

/**
 * Render [ENode] node or nodes and its derivate nodes as element or elements.
 */
export function render(to: string, nodes: ElementChildren): void {
  const toElement = document.querySelector(to)

  if (toElement) {
    const newToElement = toElement.cloneNode(false)

    newToElement.dataset.rid = toElement.dataset.rid || `${uid()}`

    newToElement.append(...convertToDom(nodes))

    toElement.hasChildNodes()
      ? diff(toElement, newToElement)
      : toElement.replaceWith(newToElement)
  } else {
    console.warn(`"${to}" element is not exist on the page.`)
  }
}
