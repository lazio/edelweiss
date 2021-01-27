import { markers, removeMarker } from '../marker';
import { EVENT_ATTRIBUTE_PREFIX } from '../constants';

export function processEventListener(
  currentNode: Element,
  name: string,
  value: unknown
): void {
  const eventMarker = markers.find((marker) => value === marker.toString());

  if (eventMarker !== undefined) {
    // Events are not allowed to be attached/detached
    // on state changes, so bridge is not need to be
    // created.
    currentNode.addEventListener(
      name.replace(EVENT_ATTRIBUTE_PREFIX, ''),
      eventMarker.value as EventListenerOrEventListenerObject
    );

    currentNode.removeAttribute(name);
    removeMarker(eventMarker);
  }
}
