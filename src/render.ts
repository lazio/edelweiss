import { callHookOnElementWithChildren, Hooks } from './core/hooks';

/**
 * Attaches template to container in DOM.
 * It does not create reactive bindings, neither worry
 * about container existence. Also if container already
 * has child nodes, then they will not removed and template
 * nodes will be inserted right before them.
 */
export function render(container: ParentNode, node: HTMLTemplateElement): void {
  // `adoptNode` is used in order to save event listeners on nodes inside
  // `DocumentFragment`. Unfortunately, `importNode` method does not
  // save them.
  //
  // Iterable `NodeListOf` is converted to array for saving references to
  // nodes and allow to repeated iterating over them.
  //
  //  "Iterating over an iterator is said to consume the iterator,
  //   because it is generally only possible to do once."
  //   - [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Iterators_and_Generators)
  const childNodes = Array.from(document.adoptNode(node.content).childNodes);
  container.prepend(...childNodes);
  childNodes.forEach((node) =>
    callHookOnElementWithChildren(Hooks.MOUNTED, node)
  );
}
