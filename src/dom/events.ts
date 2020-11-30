import { isElementNode } from '../utils/predicates';
import { addEventListener } from '@fluss/web';
import { isEventAttribute } from '../utils/library_attributes';
import { arrayFrom, maybeOf } from '@fluss/core';

/**
 * Holds all listeners that will be attached to element.
 * Elements are marked with event ids.
 */
export const eventListenersMap = new Map<
  string,
  {
    [eventName: string]: EventListenerOrEventListenerObject;
  }
>();

/** Holds all detach functions of every element's event listeners. */
const detachEventListenersMap: Map<string, () => void> = new Map();

export function detachEvents(
  element: Node,
  detachFromChildren: boolean = false
) {
  if (isElementNode(element)) {
    arrayFrom(element.attributes)
      .filter(({ name }) => isEventAttribute(name))
      .forEach(({ value: id }) =>
        maybeOf(detachEventListenersMap.get(id)).map((detachFn) => {
          detachEventListenersMap.delete(id);
          detachFn();
        })
      );

    if (detachFromChildren && element.childElementCount > 0) {
      arrayFrom(element.children).forEach((child) =>
        detachEvents(child, detachFromChildren)
      );
    }
  }
}

export function attachEvents(element: Node, attachToChildren: boolean = false) {
  if (isElementNode(element)) {
    arrayFrom(element.attributes)
      .filter(({ name }) => isEventAttribute(name))
      .map(({ value: id }) => {
        maybeOf(eventListenersMap.get(id))
          .map<ReadonlyArray<[string, EventListenerOrEventListenerObject]>>(
            Object.entries
          )
          .map(([listener]) => {
            const detachFn = addEventListener<EventTarget, string>(
              element,
              listener[0],
              listener[1]
            );

            detachEventListenersMap.set(id, detachFn);

            eventListenersMap.delete(id);
          });
      });

    if (attachToChildren && element.childElementCount > 0) {
      arrayFrom(element.children).forEach((child) =>
        attachEvents(child, attachToChildren)
      );
    }
  }
}
