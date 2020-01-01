// @flow

import ENode from '../nodes/en.mjs'

export function transformNodesToElements(
  nodes: ENode | ENode[]
): HTMLElement[] {
  if (Array.isArray(nodes)) {
    return nodes.map(node => node.createElement())
  } else {
    return [nodes.createElement()]
  }
}
