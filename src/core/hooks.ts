import { isElement } from './utilities/is_element';

/**
 * Function that invokes on some action made with element.
 * Accepts the element as argument.
 */
export interface Hook {
  <E extends Element>(element: E): void;
}

export enum Hooks {
  MOUNTED = 'mounted',
  UPDATED = 'updated',
  'WILL_UNMOUNT' = 'will-unmount',
}

const hookMaps = {
  [Hooks.MOUNTED]: new WeakMap<Element, Hook>(),
  [Hooks.UPDATED]: new WeakMap<Element, Hook>(),
  [Hooks['WILL_UNMOUNT']]: new WeakMap<Element, Hook>(),
} as const;

export function callHook(name: Hooks, node: Node): void {
  if (isElement(node)) {
    hookMaps[name].get(node)?.(node);
  }
}

export function registerHook(name: Hooks, node: Element, hook: Hook): void {
  hookMaps[name].set(node, hook);
}

export function callHookOnElementWithChildren(
  name: Hooks,
  element: Node
): void {
  callHook(name, element);

  if (isElement(element) && element.childElementCount > 0) {
    for (const child of element.children) {
      callHookOnElementWithChildren(name, child);
    }
  }
}
