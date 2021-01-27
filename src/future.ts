import { reactive } from './core/reactive';
import { Dependency } from './core/dependency';

/**
 * Allow to insert into template asychronous HTML.
 * First value is dependency that will insert nodes into DOM
 * and second value is a function that allows update them later.
 * If promise rejects, then _fallback_ remains/inserts in DOM.
 */
export function future(
  fallback:
    | string
    | HTMLTemplateElement
    | Iterable<string | HTMLTemplateElement> = ''
): readonly [
  buildedTemplate: Dependency<
    string | HTMLTemplateElement | Iterable<string | HTMLTemplateElement>
  >,
  update: (
    value: Promise<
      string | HTMLTemplateElement | Iterable<string | HTMLTemplateElement>
    >
  ) => Promise<void>
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
