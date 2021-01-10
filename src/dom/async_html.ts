import { openHTMLTagRegExp } from '../utils/regexps';

const DATA_ASYNC_HTML_STUB_ATTRIBUTE_NAME = 'data-async-html-stub';

export const asyncHTMLMap: Map<string, Promise<string>> = new Map();

export function createStub(stubId: string, stubComponent: string): string {
  if (!stubComponent.trimStart().startsWith('<')) {
    return `<div ${DATA_ASYNC_HTML_STUB_ATTRIBUTE_NAME}="${stubId}">${stubComponent}</div>`;
  } else {
    return stubComponent.replace(
      openHTMLTagRegExp,
      `$& ${DATA_ASYNC_HTML_STUB_ATTRIBUTE_NAME}="${stubId}"`
    );
  }
}

export function getStubElement(
  stub: string,
  root: Element | ShadowRoot
): HTMLDivElement | null {
  return root.querySelector(
    `[${DATA_ASYNC_HTML_STUB_ATTRIBUTE_NAME}="${stub}"]`
  );
}
