import { uid } from '../utilities/uid';
import { isIterable } from '../utilities/checks';
import { isDependency } from '../dependency';
import { adoptToNodes } from '../utilities/adopt_to_nodes';
import { createComment } from '../utilities/create_comment';
import { markers, removeMarker } from '../marker';
import { bridges, NodeBridge, Child } from '../bridge';

export function processNodes(currentNode: Comment, walker: TreeWalker): void {
  const nodeMarker = markers.find(
    (marker) =>
      marker.toString() === createComment(currentNode.textContent ?? '')
  );

  if (nodeMarker !== undefined) {
    let nodes: ReadonlyArray<ChildNode> = processValue(
      currentNode,
      nodeMarker.value
    );

    // Marker is replaced by nodes, so it can be removed
    // safely now.
    removeMarker(nodeMarker);

    currentNode.after(...nodes);

    // We do not need to iterate over already processed nodes.
    // So walker skips them by pointing to last inserted node.
    if (nodes.length > 0) {
      walker.currentNode = nodes[nodes.length - 1];
    }
  }
}

function processValue(
  currentNode: Comment,
  value: unknown
): ReadonlyArray<ChildNode> {
  // If marker is Dependency - set up reactive binding.
  if (isDependency<unknown, Child>(value)) {
    const endNode = document.createComment(`{{${uid()}}}`);
    const nodeBridge = new NodeBridge(currentNode, value, endNode);

    bridges.push(nodeBridge);

    return [
      ...processValue(currentNode, value.value),
      // We must insert end node into DOM to
      // work for reactive binding.
      endNode,
    ];
  } else if (isIterable(value)) {
    let nodes: Array<ChildNode> = [];

    for (const iterableValue of value as Iterable<unknown>) {
      nodes = nodes.concat(processValue(currentNode, iterableValue));
    }

    return nodes;
  } else {
    return adoptToNodes(value);
  }
}
