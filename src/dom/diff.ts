import { _isRouteChanged } from '../router/markers';
import { isLibraryAttribute } from '../utils/library_attributes';
import { maybe, array, isNothing } from '@fluss/core';
import { attachEvents, detachEvents } from './events';
import { mountedHook, removedHook, updatedHook } from './hooks';
import { isCommentNode, isElementNode, isTextNode } from '../utils/predicates';

const IGNORED_ATTRIBUTE_NAME = 'data-ignored';

export function diff(oldNode: Node, newNode: Node): void {
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
        oldNode.hasAttribute(IGNORED_ATTRIBUTE_NAME) &&
        newNode.hasAttribute(IGNORED_ATTRIBUTE_NAME)
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
        } else {
          /**
           * Mounted hook need to be called if route is changed,
           * but attributes do not. This is the case, when element
           * has only hook attribute.
           */
          _isRouteChanged && mountedHook(oldNode);
        }

        attachEvents(oldNode);

        diffChildren(oldNode, newNode);
      } else if (oldNode.hasChildNodes()) {
        attachEvents(newNode, true);

        oldNode.replaceWith(newNode);
        mountedHook(newNode);
        removedHook(oldNode);
      } else {
        detachEvents(oldNode);

        // Same reason as above.
        if (diffAttributes(oldNode, newNode)) {
          _isRouteChanged ? mountedHook(oldNode) : updatedHook(oldNode);
        } else {
          _isRouteChanged && mountedHook(oldNode);
        }

        attachEvents(oldNode);
      }
    } else {
      attachEvents(newNode, true);

      oldNode.replaceWith(newNode);
      mountedHook(newNode);
      removedHook(oldNode);
    }
  } else if (isTextNode(oldNode) && isTextNode(newNode)) {
    if (oldNode.textContent !== newNode.textContent) {
      oldNode.textContent = newNode.textContent;

      maybe(oldNode.parentElement).map((parent) => {
        /**
         * Same reason as above, but here diffing attributes
         * did not apply.
         */
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
    attachEvents(newNode, true);

    (oldNode as ChildNode).replaceWith(newNode);
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
): void {
  const oldChildNodes = array(oldNode.childNodes);
  const newChildNodes = array(newNode.childNodes);

  for (
    let i = 0;
    i < Math.max(newChildNodes.length, oldChildNodes.length);
    i++
  ) {
    const oNode = oldChildNodes[i];
    const nNode = newChildNodes[i];

    if (!isNothing(nNode)) {
      isNothing(oNode)
        ? (attachEvents(nNode, true), oldNode.append(nNode), mountedHook(nNode))
        : diff(oNode, nNode);
    } else if (!isNothing(oNode)) {
      oNode.remove();
      removedHook(oNode);
    } else {
      // Do nothing - old and new node are null or undefined.
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
    array(oldNode.attributes).forEach(({ name }) => {
      if (!newNode.hasAttribute(name)) {
        oldNode.removeAttribute(name);

        /**
         * Library attributes used by edelweiss itself and
         * they must not signals that element was updated.
         */
        if (!areAttributesDifferent && !isLibraryAttribute(name)) {
          areAttributesDifferent = true;
        }
      }
    });
  }

  // Add missing attributes and update changed
  array(newNode.attributes).forEach(({ name, value }) => {
    if (oldNode.getAttribute(name) !== value) {
      oldNode.setAttribute(name, value);

      /**
       * Library attributes used by edelweiss itself and
       * they must not signals that element was updated.
       */
      if (!areAttributesDifferent && !isLibraryAttribute(name)) {
        areAttributesDifferent = true;
      }
    }
  });

  return areAttributesDifferent;
}
