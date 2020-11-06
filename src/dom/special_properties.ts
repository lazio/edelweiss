export interface ValueableHTMLElement extends HTMLElement {
  [SpecialProperty.Value]: string;
}

/**
 * Properties that must be updated by library
 * in order to show reactivity.
 */
export enum SpecialProperty {
  Value = 'value',
}
