import { createContent } from './core/create_content';
import { createTemplate } from './core/create_template';
import { processTemplate } from './core/process_template';

/**
 * Creates isolated HTML template.
 *
 * Though it is allowed to define `<style>` element
 * inside template, after adopting it to main `document`
 * these styles will not be scoped by default.
 */
export function html(
  statics: TemplateStringsArray,
  ...values: ReadonlyArray<unknown>
): HTMLTemplateElement {
  return processTemplate(createTemplate(createContent(statics, ...values)));
}
