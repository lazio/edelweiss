// @flow

import ENode, { transformNodesToElements } from './nodes/en.mjs'
import Component from './component/component.mjs'

import { uid } from './utils/uid.mjs'

/**
 * Render [ENode] node or nodes and its derivate nodes as element or elements.
 */
export async function render(
  to: string,
  nodes: string | ENode | Component | (string | ENode | Component)[]
): Promise<void> {
  const toElement = document.querySelector(to)

  if (toElement) {
    const newToElement = toElement.cloneNode(false)

    newToElement.dataset.rid = toElement.dataset.rid || `${uid()}`

    const buildedElements = await transformNodesToElements(nodes)

    newToElement.append(...buildedElements)

    toElement.replaceWith(newToElement)
  }
}
