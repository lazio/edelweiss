import { reactive } from './core/reactive';
import type { Dependency } from './core/dependency';
import type { SecureHTMLNode } from './core/bridge';

/**
 * Allow to insert into template asychronous HTML.
 * First value is dependency that will insert nodes into DOM
 * and second value is a function that allows update them later.
 * If promise rejects, then _fallback_ remains/inserts in DOM.
 */
export function future(
  fallback: SecureHTMLNode = ''
): readonly [
  buildedTemplate: Dependency<SecureHTMLNode, SecureHTMLNode>,
  update: (value: Promise<SecureHTMLNode>) => Promise<void>
] {
  const bound = reactive({ nodes: fallback });

  return [
    bound.nodes((value) => value),
    (asyncTemplate) =>
      asyncTemplate.then(
        (htmlPart) => bound.nodes(htmlPart),
        () => bound.nodes(fallback)
      ),
  ];
}
