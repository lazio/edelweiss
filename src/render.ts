import { callHookOnElementWithChildren, Hooks } from './core/hooks';

/**
 * Attaches template to container in DOM.
 * It does not create reactive bindings, neither worry
 * about container existence. Also if container already
 * has child nodes, then they will not removed and template
 * nodes will be inserted right after them.
 */
export const render = (
  container: ParentNode,
  node: HTMLTemplateElement
): void =>
  // `adoptNode` is used in order to save event listeners on nodes inside
  // `DocumentFragment`. Unfortunately, `importNode` method does not
  // save them.
  document.adoptNode(node.content).childNodes.forEach((node) => {
    container.append(node);
    callHookOnElementWithChildren(Hooks.MOUNTED, node);
  });
