import { array, maybe } from '@fluss/core';
import { isElementNode } from '../utils/predicates';
import { addEventListener } from '@fluss/web';
import { isEventAttribute } from '../utils/library_attributes';

/**
 * Holds all listeners that will be attached to element.
 * Elements are marked with event ids.
 */
export const eventListenersMap = new Map<
  string,
  [eventName: string, listener: EventListenerOrEventListenerObject]
>();

/** Holds all detach functions of every element's event listeners. */
const detachEventListenersMap: WeakMap<
  Node,
  ReadonlyArray<() => void>
> = new WeakMap();

export function detachEvents(element: Node): void {
  (detachEventListenersMap.get(element) ?? []).forEach((fn) => fn());
  detachEventListenersMap.delete(element);
}

export function attachEvents(
  element: Node,
  attachToChildren: boolean = false
): void {
  if (isElementNode(element)) {
    array(element.attributes)
      .filter(({ name }) => isEventAttribute(name))
      .map(({ value: id }) => {
        maybe(eventListenersMap.get(id)).map(([event, listener]) => {
          const detachFn = addEventListener<EventTarget, string>(
            element,
            event,
            listener
          );

          detachEventListenersMap.set(element, [
            ...(detachEventListenersMap.get(element) ?? []),
            detachFn,
          ]);

          eventListenersMap.delete(id);
        });
      });

    if (attachToChildren && element.childElementCount > 0) {
      array(element.children).forEach((child) =>
        attachEvents(child, attachToChildren)
      );
    }
  }
}
