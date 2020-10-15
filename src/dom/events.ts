import { eventListenersMap } from '../template/template';
import { dataEventIdJSRegExp } from '../utils/regexps';
import { arrayFrom, maybeOf } from '@fluss/core';
import { addEventListener, removeAttribute } from '@fluss/web';

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
