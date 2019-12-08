// @flow

import MTNode from '../nodes/mtn.mjs'

export function transformNodesToElements(nodes: MTNode | MTNode[]): HTMLElement[] {
  if (Array.isArray(nodes)) {
    return nodes.map((node) => node.createElement())
  } else {
    return [nodes.createElement()]
  }
}
