import { isDependency } from '../dependency';
import { markers, removeMarker } from '../marker';
import { bridges, PropertyBridge } from '../bridge';
import { PROPERTY_ATTRIBUTE_PREFIX } from '../constants';

export const processProperty = (
  currentNode: Element,
  name: string,
  value: string
): void => {
  const propertyMarker = markers.find((marker) => value === marker.toString());

  if (propertyMarker !== undefined) {
    const validPropertyName = name.replace(PROPERTY_ATTRIBUTE_PREFIX, '');

    let propertyValue: unknown;

    if (isDependency(propertyMarker.value)) {
      const propertyBridge = new PropertyBridge(
        currentNode,
        validPropertyName,
        propertyMarker.value
      );
      bridges.push(propertyBridge);

      propertyValue = propertyMarker.value.value;
    } else {
      propertyValue = propertyMarker.value;
    }

    (currentNode as Element & { [property: string]: unknown })[
      validPropertyName
    ] = propertyValue;

    currentNode.removeAttribute(name);
    removeMarker(propertyMarker);
  }
};
