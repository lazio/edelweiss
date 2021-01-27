import { processNodes } from './nodes';
import { processProperty } from './property';
import { processEventListener } from './event_attribute';
import { processToggleAttribute } from './toggle_attribute';
import { processRegularAttribute } from './regular_attribute';
import {
  EVENT_ATTRIBUTE_PREFIX,
  TOGGLE_ATTRIBUTE_PREFIX,
  PROPERTY_ATTRIBUTE_PREFIX,
} from '../constants';

type FilteredNode = Element | Comment;

function isCommentNode(node: Node): node is Comment {
  return node.nodeType === Node.COMMENT_NODE;
}

function isElementNode(node: Node): node is Element {
  return node.nodeType === Node.ELEMENT_NODE;
}

/**
 * Processing template is accomplished in three steps:
 *
 *  1. Finding marker with value.
 *  2. Replacing marker's value with marker in node.
 *     Here bridges are established.
 *  3. Removing marker and relative unneeded stuff (special attributes).
 */
export function processTemplate(
  template: HTMLTemplateElement
): HTMLTemplateElement {
  const walker = document.createTreeWalker(
    template.content,
    NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_COMMENT
  );

  let currentNode: FilteredNode | null = null;
  while ((currentNode = walker.nextNode() as FilteredNode | null) !== null) {
    if (isCommentNode(currentNode)) {
      processNodes(currentNode, walker);
    } else if (isElementNode(currentNode)) {
      for (const { name, value } of currentNode.attributes) {
        if (name.startsWith(EVENT_ATTRIBUTE_PREFIX)) {
          processEventListener(currentNode, name, value);
        } else if (name.startsWith(TOGGLE_ATTRIBUTE_PREFIX)) {
          processToggleAttribute(currentNode, name, value);
        } else if (name.startsWith(PROPERTY_ATTRIBUTE_PREFIX)) {
          processProperty(currentNode, name, value);
        } else {
          processRegularAttribute(currentNode, name, value);
        }
      }
    }
  }

  return template;
}
