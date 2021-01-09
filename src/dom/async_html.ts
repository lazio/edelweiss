import { uid } from '../utils/uid';

const DATA_ASYNC_HTML_STUB_ATTRIBUTE_NAME = 'data-async-html-stub';

export const asyncHTMLMap: Map<string, Promise<string>> = new Map();

export function createStub(asyncHTMLContainer: Promise<string>): string {
  const stub = `__${uid()}__`;
  asyncHTMLMap.set(stub, asyncHTMLContainer);
  return `<div ${DATA_ASYNC_HTML_STUB_ATTRIBUTE_NAME}="${stub}"></div>`;
}

export function getStubElement(
  stub: string,
  root: Element | ShadowRoot
): HTMLDivElement | null {
  return root.querySelector(
    `[${DATA_ASYNC_HTML_STUB_ATTRIBUTE_NAME}="${stub}"]`
  );
}
