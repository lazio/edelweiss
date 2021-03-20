import { isComment } from '../utilities/is_comment';
import { processHook } from './hook';
import { processNodes } from './nodes';
import { processProperty } from './property';
import { processEventListener } from './event_attribute';
import { processToggleAttribute } from './toggle_attribute';
import { processRegularAttribute } from './regular_attribute';
import {
  HOOK_ATTRIBUTE_PREFIX,
  EVENT_ATTRIBUTE_PREFIX,
  TOGGLE_ATTRIBUTE_PREFIX,
  PROPERTY_ATTRIBUTE_PREFIX,
} from '../constants';

type FilteredNode = Element | Comment;

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
    isComment(currentNode)
      ? processNodes(currentNode, walker)
      : Array.from(currentNode.attributes).forEach(({ name, value }) => {
          if (name.startsWith(EVENT_ATTRIBUTE_PREFIX)) {
            processEventListener(currentNode as Element, name, value);
          } else if (name.startsWith(TOGGLE_ATTRIBUTE_PREFIX)) {
            processToggleAttribute(currentNode as Element, name, value);
          } else if (name.startsWith(PROPERTY_ATTRIBUTE_PREFIX)) {
            processProperty(currentNode as Element, name, value);
          } else if (name.startsWith(HOOK_ATTRIBUTE_PREFIX)) {
            processHook(currentNode as Element, name, value);
          } else {
            processRegularAttribute(currentNode as Element, name, value);
          }
        });
  }

  return template;
}
