import Component from '../component/component';
import { eventListenersMap } from '../template/template';
import { dataEventIdJSRegExp } from './regexps';
import { mountedHook, removedHook, updatedHook } from './hooks';
import { isCommentNode, isElementNode, isTextNode } from './predicates';
import { maybeOf, promiseOf, arrayFrom, isNothing } from '@fluss/core';
import {
  removeNode,
  appendNodes,
  replaceNode,
  hasAttribute,
  setAttribute,
  getAttribute,
  removeAttribute,
  addEventListener,
} from '@fluss/web';

export function diff(oldNode: Node, newNode: Node) {
  if (isElementNode(oldNode) && isElementNode(newNode)) {
    if (oldNode.tagName === newNode.tagName) {
      diffAttributes(oldNode, newNode) && updatedHook(oldNode);

      if (newNode.hasChildNodes()) {
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
              ? (appendNodes(oldNode, nNode), mountedHook(nNode))
              : diff(oNode, nNode);
          } else if (!isNothing(oNode)) {
            removeNode(oNode);
            removedHook(oNode);
          } else {
            // Do nothing - old and new node is null or undefined.
          }
        }
      } else if (oldNode.hasChildNodes()) {
        replaceNode(oldNode, newNode);
        mountedHook(newNode);
        removedHook(oldNode);
      } else {
        // Do nothing - both nodes haven't children and difference of attributes is
        // already checked.
      }
    } else {
      replaceNode(oldNode, newNode);
      mountedHook(newNode);
      removedHook(oldNode);
    }
  } else if (isTextNode(oldNode) && isTextNode(newNode)) {
    oldNode.textContent !== newNode.textContent &&
      ((oldNode.textContent = newNode.textContent),
      maybeOf(oldNode.parentElement).map(updatedHook));
  } else if (isCommentNode(oldNode) && isCommentNode(newNode)) {
    /**
     * Comment node is separated, because we do not need
     * invoke hook on parent node if comment node is changed.
     */
    oldNode.textContent !== newNode.textContent &&
      (oldNode.textContent = newNode.textContent);
  } else {
    replaceNode(oldNode as ChildNode, newNode);
    mountedHook(newNode);
    removedHook(oldNode);
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

export async function normalizeHTML(
  nodes:
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>
): Promise<string> {
  if (Array.isArray(nodes)) {
    return nodes.reduce(
      (prev: Promise<string>, current) =>
        prev.then((prevHtml) =>
          normalizeHTML(current).then(
            (normalizedHtml) => prevHtml + normalizedHtml
          )
        ),
      promiseOf('')
    );
  } else {
    return nodes instanceof Component ? nodes._createNodes() : nodes;
  }
}

/** Holds all detach functions of every element's event listeners. */
export const detachEventListenersList: Array<() => void> = [];

export function attachEvents(element: Element, rememberDetach = true) {
  if (element instanceof HTMLElement) {
    Object.entries(element.dataset)
      .filter(([attrName, _]) => dataEventIdJSRegExp.test(attrName))
      .map(([attrName, eventId]) => {
        maybeOf(eventId).map((id) => {
          maybeOf(eventListenersMap.get(id))
            .map<ReadonlyArray<[string, EventListenerOrEventListenerObject]>>(
              Object.entries
            )
            .map(([listener]) => {
              addEventListener<EventTarget, string>(
                element,
                listener[0],
                listener[1]
              ).map(
                (detachFn) =>
                  rememberDetach && detachEventListenersList.push(detachFn)
              );

              return id;
            })
            .map((id) => eventListenersMap.delete(id));
        });

        return attrName;
      })
      .map((attrName) =>
        maybeOf(/(\d+)$/.exec(attrName)).map((execArray) => execArray[1])
      )
      .forEach((maybeEventIdNumber) =>
        maybeEventIdNumber.map((eventIdNumber) =>
          removeAttribute(element, `data-event-id${eventIdNumber}`)
        )
      );

    if (element.childElementCount > 0) {
      arrayFrom(element.children).forEach((element) =>
        attachEvents(element, rememberDetach)
      );
    }
  }
}
