import { markers, removeMarker } from '../marker';
import { HOOK_ATTRIBUTE_PREFIX } from '../constants';
import { Hooks, registerHook, Hook } from '../hooks';

export function processHook(
  node: Element,
  attributeName: string,
  attributeValue: string
): void {
  const hookMarker = markers.find(
    (marker) => attributeValue === marker.toString()
  );

  if (hookMarker !== undefined) {
    const hookName = attributeName.replace(HOOK_ATTRIBUTE_PREFIX, '');

    switch (hookName) {
      case Hooks.MOUNTED:
      case Hooks.UPDATED:
      case Hooks['WILL_UNMOUNT']:
        registerHook(hookName, node, hookMarker.value as Hook);
        break;
      default:
        console.warn(`Unknown hook name: ${hookName}.`);
    }

    node.removeAttribute(attributeName);
    removeMarker(hookMarker);
  }
}
