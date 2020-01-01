// @flow

import ENode from './nodes/en.mjs'
import Component from './component/component.mjs'

import { transformNodesToElements } from './utils/transform.mjs'
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
    let newToElement = toElement.cloneNode(false)

    newToElement.dataset.rid = toElement.dataset.rid || `${uid()}`

    if (Array.isArray(nodes)) {
      const promiseElements: Promise<(HTMLElement | string)[]>[] = nodes.map(
        async node => {
          if (node instanceof Component) {
            return [...transformNodesToElements(await node._render())]
          } else if (node instanceof ENode) {
            return [node.createElement()]
          } else {
            return [node]
          }
        }
      )

      const elements = await Promise.all(promiseElements)
      elements.forEach(els => newToElement.append(...els))
    } else {
      if (nodes instanceof Component) {
        const nodeOrNodes = nodes.build()
        if (Array.isArray(nodeOrNodes)) {
          newToElement.append(...transformNodesToElements(nodeOrNodes))
        } else {
          newToElement = nodeOrNodes.createElement()
        }
      } else if (nodes instanceof ENode) {
        newToElement.append(nodes.createElement())
      } else {
        newToElement.append(nodes)
      }
    }

    toElement.replaceWith(newToElement)
  }
}
