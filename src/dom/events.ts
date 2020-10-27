import { addEventListener } from '@fluss/web';
import { dataEventIdJSRegExp } from '../utils/regexps';
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
  if (element instanceof HTMLElement) {
    Object.entries(element.dataset)
      .filter(([attrName, _]) => dataEventIdJSRegExp.test(attrName))
      .forEach(([_, eventId]) =>
        maybeOf(eventId)
          .map((id) => {
            const detachFn = detachEventListenersMap.get(id);
            detachEventListenersMap.delete(id);
            return detachFn;
          })
          .map((detach) => detach())
      );

    if (detachFromChildren && element.childElementCount > 0) {
      arrayFrom(element.children).forEach((child) =>
        detachEvents(child, detachFromChildren)
      );
    }
  }
}

export function attachEvents(element: Node, attachToChildren: boolean = false) {
  if (element instanceof HTMLElement) {
    Object.entries(element.dataset)
      .filter(([attrName, _]) => dataEventIdJSRegExp.test(attrName))
      .map(([_, eventId]) => {
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
              ).map((detachFn) => detachEventListenersMap.set(id, detachFn));

              eventListenersMap.delete(id);
            });
        });
      });

    if (attachToChildren && element.childElementCount > 0) {
      arrayFrom(element.children).forEach((child) =>
        attachEvents(child, attachToChildren)
      );
    }
  }
}
