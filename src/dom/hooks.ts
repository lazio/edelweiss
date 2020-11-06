import { dataHookIdJSRegExp } from '../utils/regexps';
import { arrayFrom, freeze, maybeOf, promiseOf, tupleOf } from '@fluss/core';

/** Hooks are defined in order they have been executed in element's lifecycle. */
export enum Hooks {
  Mounted = 'mounted',
  Updated = 'updated',
  Removed = 'removed',
}

export type HookCallback = (self: Element) => void | Promise<void>;

/** Holds callbacks for every element's hooks. */
export const hooksManager = freeze({
  [Hooks.Mounted]: new Map<string, HookCallback>(),
  [Hooks.Updated]: new Map<string, HookCallback>(),
  [Hooks.Removed]: new Map<string, HookCallback>(),
});

/** If parent node is mounted, so its children are also mounted. */
export function mountedHook(node: Node) {
  applyHook(node, Hooks.Mounted);
  arrayFrom(node.childNodes).forEach(mountedHook);
}

export function updatedHook(node: Node) {
  applyHook(node, Hooks.Updated);
}

/** If parent node is removed, so its children are also removed. */
export function removedHook(node: Node) {
  applyHook(node, Hooks.Removed);
  arrayFrom(node.childNodes).forEach(removedHook);
}

/**
 * Hook id does not be deleted from element, because
 * some of them require its.
 */
function applyHook(node: Node, type: Hooks) {
  /**
   * This trick is used in order to render "initial" state
   * of element and then apply hook.
   */
  setTimeout(() => {
    if (node instanceof HTMLElement) {
      Object.entries(node.dataset)
        .filter(([attrName, _]) => dataHookIdJSRegExp.test(attrName))
        .forEach(([_, eventId]) => {
          maybeOf(eventId)
            .map((id) => tupleOf(id, maybeOf(hooksManager[type].get(id))))
            .map(([id, maybeFn]) =>
              maybeFn.map((fn) =>
                promiseOf(fn(node)).then(() => hooksManager[type].delete(id))
              )
            );
        });
    }
  }, 0);
}
