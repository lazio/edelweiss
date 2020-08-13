import { panic } from '../utils/panic';
import { alternation } from '@fluss/core';

export function registerCustomElement(
  match: RegExpMatchArray,
  constructor: CustomElementConstructor
) {
  const customNameTag = match[1];

  if (!customNameTag || typeof customNameTag !== 'string') {
    panic(`tag name for custom element must be provided and be type of "string"!
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
