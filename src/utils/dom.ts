import Component from '../component/component';
import { eventListenersMap } from '../template/template';
import { dataEventIdJSRegExp } from './regexps';
import {
  append,
  removeNode,
  replaceNode,
  hasAttribute,
  setAttribute,
  removeAttribute,
  addEventListener,
} from '@fluss/web';
import {
  reduce,
  isArray,
  forEach,
  entries,
  resolve,
  maybeOf,
  arrayFrom,
  isNothing,
} from '@fluss/core';

export function diff(oldNode: Element, newNode: Element) {
  if (oldNode.nodeType === newNode.nodeType) {
    if (oldNode.tagName === newNode.tagName) {
      diffAttributes(oldNode, newNode);

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
            if (nNode.nodeType === Node.ELEMENT_NODE) {
              isNothing(oNode)
                ? append(oldNode, nNode)
                : diff(oNode as Element, nNode as Element);
            } else if (nNode.nodeType === Node.TEXT_NODE) {
              !isNothing(oNode)
                ? // Update text node only if there is difference
                  oNode.textContent !== nNode.textContent
                  ? (oNode.textContent = nNode.textContent)
                  : null
                : append(oldNode, nNode);
            } else {
              // TODO(kapelianovych): add document fragment node?
            }
          } else if (!isNothing(oNode)) {
            removeNode(oNode);
          } else {
            // Do nothing - old and new node is null or undefined.
          }
        }
      } else {
        replaceNode(oldNode, newNode);
      }
    } else {
      replaceNode(oldNode, newNode);
    }
  } else {
    replaceNode(oldNode, newNode);
  }
}

/**
 * Determines attribute that is outdated and update or remove it.
 * Attributes may be in inexact order, so we need go twice on them.
 */
function diffAttributes(oldNode: Element, newNode: Element) {
  if (oldNode.attributes.length !== newNode.attributes.length) {
    // Remove exessive attributes
    forEach(oldNode.attributes, ({ name }) => {
      if (!hasAttribute(newNode, name)) {
        removeAttribute(oldNode, name);
      }
    });
  }

  // Add missing attributes and update changed
  forEach(newNode.attributes, ({ name, value }) =>
    setAttribute(oldNode, name, value)
  );
}

export async function normalizeHTML(
  nodes:
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>
): Promise<string> {
  if (isArray(nodes)) {
    return reduce(
      nodes,
      (prev, current) =>
        prev.then((prevHtml) =>
          normalizeHTML(current).then(
            (normalizedHtml) => prevHtml + normalizedHtml
          )
        ),
      resolve('')
    );
  } else {
    return nodes instanceof Component ? nodes._createNodes() : nodes;
  }
}

export function attachEvents(element: Element) {
  if (element instanceof HTMLElement) {
    const dataAttributes = element.dataset;

    for (const key in dataAttributes) {
      if (dataEventIdJSRegExp.test(key)) {
        const eventListener = eventListenersMap.get(dataAttributes[key] || '');
        if (!isNothing(eventListener)) {
          const [listener] = entries(eventListener);
          addEventListener<EventTarget, string>(
            element,
            listener[0],
            listener[1]
          );

          /**
           * "data-event-id{number}" attribute is no more useful, so
           * we can remove it.
           *
           * "eventNumber" will be always type of number and greater or eaual,
           * than zero because if script is here, so event listener exists and element
           * has "data-event-id{number}" attribute.
           * First result is matched substring.
           */
          maybeOf(key.match(/[\d]+/)).map((eventNumber) =>
            removeAttribute(element, `data-event-id${eventNumber[0]}`)
          );
        }
      }
    }

    if (element.childElementCount > 0) {
      forEach(element.children, attachEvents);
    }
  }
}
