import { maybe } from '@fluss/core';
import { isElementNode } from '../utils/predicates';
import { isHookAttribute, Hooks } from '../utils/library_attributes';

export type HookCallback = (self: Element) => void | Promise<void>;

/** Holds callbacks for every element's hooks. */
export const hooksManager = {
  [Hooks.Mounted]: new Map<string, HookCallback>(),
  [Hooks.Updated]: new Map<string, HookCallback>(),
  [Hooks.Removed]: new Map<string, HookCallback>(),
} as const;

/** If parent node is mounted, so its children are also mounted. */
export function mountedHook(node: Node): void {
  applyHook(node, Hooks.Mounted);
  Array.from(node.childNodes).forEach(mountedHook);
}

export function updatedHook(node: Node): void {
  applyHook(node, Hooks.Updated);
}

/** If parent node is removed, so its children are also removed. */
export function removedHook(node: Node): void {
  applyHook(node, Hooks.Removed);
  Array.from(node.childNodes).forEach(removedHook);
}

/**
 * Hook id does not be deleted from element, because
 * some of them require its.
 */
function applyHook(node: Node, type: Hooks): void {
  /**
   * This trick is used in order to render "initial" state
   * of element and then apply hook.
   */
  setTimeout(() => {
    if (isElementNode(node)) {
      Array.from(node.attributes)
        .filter(({ name }) => isHookAttribute(name))
        .forEach(({ value: id }) => {
          maybe(hooksManager[type].get(id)).map((hook) =>
            Promise.resolve(hook(node)).then(() =>
              hooksManager[type].delete(id)
            )
          );
        });
    }
  }, 0);
}
