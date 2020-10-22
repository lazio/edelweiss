import { _isRouteChanged } from '../router/router';
import { attachEvents, detachEvents } from './events';
import { maybeOf, arrayFrom, isNothing } from '@fluss/core';
import { mountedHook, removedHook, updatedHook } from './hooks';
import { isCommentNode, isElementNode, isTextNode } from '../utils/predicates';
import {
  removeNode,
  appendNodes,
  replaceNode,
  hasAttribute,
  setAttribute,
  getAttribute,
  removeAttribute,
} from '@fluss/web';

const IGNORED_ATTRIBUTE_NAME = 'data-ignored';

export function diff(oldNode: Node, newNode: Node) {
  if (isElementNode(oldNode) && isElementNode(newNode)) {
    if (oldNode.tagName === newNode.tagName) {
      /**
       * If element has boolean `data-ignore` attribute, then
       * this element and his descendants will not be checked
       * for difference. It is useful for elements, which has
       * dynamic content or is changed by programmer, not through
       * template differing (by example JS animation).
       */
      if (
        hasAttribute(oldNode, IGNORED_ATTRIBUTE_NAME) &&
        hasAttribute(newNode, IGNORED_ATTRIBUTE_NAME)
      ) {
        return;
      }

      if (newNode.hasChildNodes()) {
        detachEvents(oldNode);

        if (diffAttributes(oldNode, newNode)) {
          /**
           * If route is changed, then DOM must be rebuilded.
           * Due to diffing algorithm, some nodes can be left from
           * old page and reused. In that case we need to know,
           * whether page is changed in order to call proper hook.
           */
          _isRouteChanged ? mountedHook(oldNode) : updatedHook(oldNode);
        }

        attachEvents(oldNode);

        diffChildren(oldNode, newNode);
      } else if (oldNode.hasChildNodes()) {
        detachEvents(oldNode, true);
        attachEvents(newNode, true);

        replaceNode(oldNode, newNode);
        mountedHook(newNode);
        removedHook(oldNode);
      } else {
        // Do nothing - both nodes haven't children and difference of attributes is
        // already checked.
      }
    } else {
      detachEvents(oldNode, true);
      attachEvents(newNode, true);

      replaceNode(oldNode, newNode);
      mountedHook(newNode);
      removedHook(oldNode);
    }
  } else if (isTextNode(oldNode) && isTextNode(newNode)) {
    if (oldNode.textContent !== newNode.textContent) {
      oldNode.textContent = newNode.textContent;

      maybeOf(oldNode.parentElement).map((parent) => {
        /** Same reason as above. */
        _isRouteChanged ? mountedHook(parent) : updatedHook(parent);
      });
    }
  } else if (isCommentNode(oldNode) && isCommentNode(newNode)) {
    /**
     * Comment node is separated, because we do not need
     * invoke hook on parent node if comment node is changed.
     */
    oldNode.textContent !== newNode.textContent &&
      (oldNode.textContent = newNode.textContent);
  } else {
    detachEvents(oldNode, true);
    attachEvents(newNode, true);

    replaceNode(oldNode as ChildNode, newNode);
    mountedHook(newNode);
    removedHook(oldNode);
  }
}

/**
 * Diff children of nodes, but not them itself.
 * Need to be separated for diffing shadow root of custom elements.
 */
export function diffChildren(
  oldNode: Element | ShadowRoot,
  newNode: Element | DocumentFragment
) {
  const oldChildNodes = arrayFrom(oldNode.childNodes);
  const newChildNodes = arrayFrom(newNode.childNodes);

  for (
    let i = 0;
    i < Math.max(newChildNodes.length, oldChildNodes.length);
    i++
  ) {
    const oNode = oldChildNodes[i];
    const nNode = newChildNodes[i];

    if (!isNothing(nNode)) {
      isNothing(oNode)
        ? (attachEvents(nNode, true),
          appendNodes(oldNode, nNode),
          mountedHook(nNode))
        : diff(oNode, nNode);
    } else if (!isNothing(oNode)) {
      detachEvents(oNode, true);

      removeNode(oNode);
      removedHook(oNode);
    } else {
      // Do nothing - old and new node is null or undefined.
    }
  }
}

/**
 * Determines attribute that is outdated and update or remove it.
 * Attributes may be in inexact order, so we need go twice on them.
 * Returns value that tells whether attributes in oldNode and newNode
 * are different or not.
 */
function diffAttributes(oldNode: Element, newNode: Element): boolean {
  let areAttributesDifferent = false;

  if (oldNode.attributes.length !== newNode.attributes.length) {
    // Remove exessive attributes
    arrayFrom(oldNode.attributes).forEach(({ name }) => {
      if (!hasAttribute(newNode, name)) {
        removeAttribute(oldNode, name);
        areAttributesDifferent = true;
      }
    });
  }

  // Add missing attributes and update changed
  arrayFrom(newNode.attributes).forEach(({ name, value }) => {
    if (getAttribute(oldNode, name).extract() !== value) {
      setAttribute(oldNode, name, value);
      areAttributesDifferent = true;
    }
  });

  return areAttributesDifferent;
}
