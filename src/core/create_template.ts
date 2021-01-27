import { edelweissPolicy } from './polyfills/trusted_types';

/** Creates nodes from text HTML. */
export function createTemplate(content: string): HTMLTemplateElement {
  const template = document.createElement('template');
  template.innerHTML = edelweissPolicy.createHTML(content);
  return template;
}
