import { isDependency } from '../dependency';
import { markers, removeMarker } from '../marker';
import { RegularAttributeBridge, bridges } from '../bridge';

export function processRegularAttribute(
  currentNode: Element,
  name: string,
  value: string
): void {
  const constructedValue = replaceMarkerWithValue(currentNode, name, value);

  currentNode.setAttribute(name, constructedValue);
}

/**
 * Build attribute value and differs static incoming
 * values from dynamic. Due to possibility to insert more
 * than one value into attribute, it must find all markers
 * and replace them.
 */
function replaceMarkerWithValue(
  node: Element,
  attributeName: string,
  attributeValue: string
): string {
  const attributeMarker = markers.find((marker) =>
    attributeValue.includes(marker.toString())
  );

  if (attributeMarker !== undefined) {
    let newAttributeValue: string;

    if (isDependency(attributeMarker.value)) {
      const attributeBridge = new RegularAttributeBridge(
        node,
        attributeName,
        attributeMarker.value
      );
      bridges.push(attributeBridge);

      newAttributeValue = String(attributeMarker.value.value);
    } else {
      newAttributeValue = String(attributeMarker.value);
    }

    const finishedAttributeValue = replaceMarkerWithValue(
      node,
      attributeName,
      attributeValue.replace(attributeMarker.toString(), newAttributeValue)
    );

    // Marker's value is replaced, so we can safely delete it.
    removeMarker(attributeMarker);

    return finishedAttributeValue;
  } else {
    return attributeValue;
  }
}
