/**
 * Attaches template to container in DOM.
 * It does not create reactive bindings, neither worry
 * about container existence. Also if container already
 * has child nodes, then they will not removed and template
 * nodes will be inserted right before them.
 */
export function render(container: ParentNode, node: HTMLTemplateElement): void {
  // adoptNode is used in order to save event listeners on nodes inside
  // DocumentFragment. Unfortunately, importNode method does not
  // save them.
  container.prepend(...document.adoptNode(node.content).childNodes);
}
