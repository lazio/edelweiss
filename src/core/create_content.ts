import {
  EVENT_ATTRIBUTE_PREFIX,
  TOGGLE_ATTRIBUTE_PREFIX,
  PROPERTY_ATTRIBUTE_PREFIX,
} from './constants';
import { Marker, markers, NodeMarker, AttributeMarker } from './marker';

/**
 * This RegExp has two capturing groups:
 *  1. attribute name.
 *  2. attribute value (may not be).
 */
const PRECEEDING_ATTRIBUTE_REGEXP = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|\s*\/?[>"']))+.)?$/;

/**
 * This function is called at first. It concat all parts of HTML and
 * inserts markers for values: either static or dynamic. Markers are
 * differs by position - attribute or node.
 */
export function createContent(
  statics: TemplateStringsArray,
  ...values: ReadonlyArray<unknown>
): string {
  return statics.reduce((all, current, index) => {
    const previousTemplate = all + current;

    // Statics is always greater by one then values.
    // So we must not create marker for last static part.
    if (values.length <= index) {
      return previousTemplate;
    } else {
      const attributeMatch = PRECEEDING_ATTRIBUTE_REGEXP.exec(previousTemplate);

      let marker: Marker;
      let previousTemplatePart: string;

      if (attributeMatch !== null) {
        const attributeName = attributeMatch[1];

        marker = new AttributeMarker(values[index]);

        if (attributeName.startsWith('@')) {
          previousTemplatePart = previousTemplate.replace(
            attributeName,
            EVENT_ATTRIBUTE_PREFIX + attributeName.slice(1)
          );
        } else if (attributeName.startsWith('?')) {
          previousTemplatePart = previousTemplate.replace(
            attributeName,
            TOGGLE_ATTRIBUTE_PREFIX + attributeName.slice(1)
          );
        } else if (attributeName.startsWith('.')) {
          previousTemplatePart = previousTemplate.replace(
            attributeName,
            PROPERTY_ATTRIBUTE_PREFIX + attributeName.slice(1)
          );
        } else {
          previousTemplatePart = previousTemplate;
        }
      } else {
        marker = new NodeMarker(values[index]);
        previousTemplatePart = previousTemplate;
      }

      markers.push(marker);

      return previousTemplatePart + marker.toString();
    }
  }, '');
}
