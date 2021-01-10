import { uid } from '../utils/uid';
import { asyncHTMLMap, createStub } from '../dom/async_html';

/**
 * Allow load component that are deferred in time
 * or loads on demand. While async component is resolving
 * stub component is shown and will be replaced by first
 * one.
 *
 * Stub component must have only **one** root element.
 * For example:
 * ```ts
 *  `<div>...children</div>`
 *  // but not
 *  `<div>...children</div>
 *   <div>...children</div>`
 * ```
 *
 * If stub component has not any HTML element, then it will be
 * wrapped by `<div>`.
 */
export function future(
  asyncComponent: Promise<string>,
  stubComponent: string = ''
): string {
  const stubId = `__${uid()}__`;
  asyncHTMLMap.set(stubId, asyncComponent);
  return createStub(stubId, stubComponent);
}
