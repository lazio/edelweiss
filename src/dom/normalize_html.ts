import { promiseOf } from '@fluss/core';
import { edelweissPolicy } from '../utils/trusted_types';
import { createElement, querySelector } from '@fluss/web';

export async function normalizeHTML(
  nodes: string | Promise<string> | Array<string | Promise<string>>
): Promise<string> {
  if (Array.isArray(nodes)) {
    return nodes.reduce(
      (prev: Promise<string>, current) =>
        prev.then((prevHtml) =>
          normalizeHTML(current).then(
            (normalizedHtml) => prevHtml + normalizedHtml
          )
        ),
      promiseOf('')
    );
  } else {
    return nodes;
  }
}

export function normalizeHTMLForWebComponent(
  html: string
): HTMLTemplateElement {
  const wrapperElement = createElement('div')
    .map((div) => {
      div.innerHTML = edelweissPolicy.createHTML(
        html.trim().startsWith('<template')
          ? html
          : `<template>${html}</template>`
      );
      return div;
    })
    .extract();

  return (
    querySelector('template', wrapperElement).extract() ||
    /**
     * Template element must be directly defined in HTML.
     * Content can't be added to it in JS.
     * So function returns empty element as fallback.
     */
    createElement('template').extract()
  );
}
