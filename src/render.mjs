// @flow

import MTNode from './nodes/mtn.mjs'
import Component from './component/component.mjs'

import { transformNodesToElements } from './utils/transform.mjs'

/**
 * Render [MTNode] node or nodes and its derivate nodes as element or elements.
 */
export function render(to: string, nodes: MTNode | Component | (MTNode | Component)[]) {
  const toElement = document.querySelector(to)

  if (toElement) {
    let newToElement = toElement.cloneNode(false)

    if (Array.isArray(nodes)) {
      const elements: HTMLElement[][] = nodes.map((node) => {
        if (node instanceof Component) {
          return transformNodesToElements(node.build())
        } else {
          return [node.createElement()]
        }
      })
      elements.forEach((els) => newToElement.append(...els))
    } else {
      if (nodes instanceof Component) {
        const nodeOrNodes = nodes.build()
        if (Array.isArray(nodeOrNodes)) {
          newToElement.append(...transformNodesToElements(nodeOrNodes))
        } else {
          newToElement = nodeOrNodes.createElement()
        }
      } else {
        newToElement.append(nodes.createElement())
      }
    }

    toElement.replaceWith(newToElement)
  }
}
