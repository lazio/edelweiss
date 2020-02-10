// @flow

import { attach } from './nodes/en.mjs'
import { uid } from './utils/uid.mjs'
import { diff } from './utils/dom.mjs'

import type ENode from './nodes/en.mjs'
import type Component from './component/component.mjs'

/**
 * Render [ENode] node or nodes and its derivate nodes as element or elements.
 */
export function render(
  to: string,
  nodes: string | ENode | Component | (string | ENode | Component)[]
): void {
  const toElement = document.querySelector(to)

  if (toElement) {
    const newToElement = toElement.cloneNode(false)

    newToElement.dataset.rid = toElement.dataset.rid || `${uid()}`

    attach(newToElement, nodes)

    toElement.hasChildNodes()
      ? diff(toElement, newToElement)
      : toElement.replaceWith(newToElement)
  } else {
    console.warn(`"${to}" element is not exist on the page.`)
  }
}
