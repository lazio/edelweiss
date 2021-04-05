import { isDependency } from '../dependency';
import { markers, removeMarker } from '../marker';
import { RegularAttributeBridge, bridges } from '../bridge';

/**
 * Build attribute value and differs static incoming
 * values from dynamic. Due to possibility to insert more
 * than one value into attribute, it must find all markers
 * and replace them.
 */
const replaceMarkerWithValue = (
  node: Element,
  attributeName: string,
  attributeValue: string
): string => {
  const attributeMarker = markers.find((marker) =>
    attributeValue.includes(marker.toString())
  );

  if (attributeMarker !== undefined) {
    let newAttributeValue: string;

    if (isDependency<unknown, string>(attributeMarker.value)) {
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
};

export const processRegularAttribute = (
  currentNode: Element,
  name: string,
  value: string
): void =>
  currentNode.setAttribute(
    name,
    replaceMarkerWithValue(currentNode, name, value)
  );
