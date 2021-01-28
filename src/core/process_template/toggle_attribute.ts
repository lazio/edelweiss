import { isDependency } from '../dependency';
import { markers, removeMarker } from '../marker';
import { TOGGLE_ATTRIBUTE_PREFIX } from '../constants';
import { bridges, ToggleAttributeBridge } from '../bridge';

export function processToggleAttribute(
  currentNode: Element,
  name: string,
  value: string
): void {
  const toggleMarker = markers.find((marker) => value === marker.toString());

  if (toggleMarker !== undefined) {
    const validToggleAttributeName = name.replace(TOGGLE_ATTRIBUTE_PREFIX, '');

    let toggleAttributeValue: boolean;

    if (isDependency<unknown, boolean>(toggleMarker.value)) {
      const toggleBridge = new ToggleAttributeBridge(
        currentNode,
        validToggleAttributeName,
        toggleMarker.value
      );
      bridges.push(toggleBridge);

      toggleAttributeValue = Boolean(toggleMarker.value.value);
    } else {
      toggleAttributeValue = Boolean(toggleMarker.value);
    }

    toggleAttributeValue
      ? currentNode.setAttribute(validToggleAttributeName, '')
      : currentNode.removeAttribute(validToggleAttributeName);

    currentNode.removeAttribute(name);
    removeMarker(toggleMarker);
  }
}
