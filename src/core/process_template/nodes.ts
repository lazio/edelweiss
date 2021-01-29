import { uid } from '../utilities/uid';
import { isIterable } from '../utilities/is_iterable';
import { isDependency } from '../dependency';
import { createComment } from '../utilities/create_comment';
import { markers, removeMarker } from '../marker';
import { bridges, NodeBridge, SecureHTMLNode } from '../bridge';

export function processNodes(currentNode: Comment, walker: TreeWalker): void {
  const nodeMarker = markers.find(
    (marker) =>
      marker.toString() === createComment(currentNode.textContent ?? '')
  );

  if (nodeMarker !== undefined) {
    let nodes: ReadonlyArray<ChildNode> = procesValue(
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

function procesValue(
  currentNode: Comment,
  value: unknown
): ReadonlyArray<ChildNode> {
  // If marker is Dependency - set up reactive binding.
  if (isDependency<unknown, SecureHTMLNode>(value)) {
    const endNode = document.createComment(`{{${uid()}}}`);
    const nodeBridge = new NodeBridge(currentNode, value, endNode);

    bridges.push(nodeBridge);

    return [
      ...procesValue(currentNode, value.value),
      // We must insert end node into DOM to
      // work for reactive binding.
      endNode,
    ];
  } else if (isIterable(value)) {
    let nodes: Array<ChildNode> = [];

    for (const iterableValue of value as Iterable<unknown>) {
      nodes = nodes.concat(procesValue(currentNode, iterableValue));
    }

    return nodes;
  } else if (value instanceof HTMLTemplateElement) {
    return [...document.adoptNode(value.content).childNodes];
  } else {
    // Reason of explicit conversion to string is the same as in `NodeBridge`.
    return [document.createTextNode(String(value))];
  }
}
