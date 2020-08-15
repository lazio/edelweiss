import { warn } from '../utils/warn';
import { alternation } from '@fluss/core';

export function registerCustomElement(
  match: RegExpMatchArray,
  constructor: CustomElementConstructor
): void {
  const customNameTag = match[1];

  if (!customNameTag || typeof customNameTag !== 'string') {
    return warn(`tag name for custom element must be provided and be type of "string"!
    Tag: ${customNameTag}
    Constructor: ${constructor.toString()}`);
  }

  // Name of the standart tag starts from ":", so we must get rid of it.
  const extendNativeName: string | void = match[2]
    ? match[2].slice(1)
    : undefined;

  alternation(
    () => customElements.get(customNameTag),
    () =>
      customElements.define(
        customNameTag,
        constructor,
        extendNativeName ? { extends: extendNativeName } : undefined
      )
  )();
}
