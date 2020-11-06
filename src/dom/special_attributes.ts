export interface ValueableHTMLElement extends HTMLElement {
  [SpecialAttributes.Value]: string;
}

/**
 * Attributes and properties that must be updated by library
 * in order to show reactivity.
 */
export const enum SpecialAttributes {
  Value = 'value',
}
