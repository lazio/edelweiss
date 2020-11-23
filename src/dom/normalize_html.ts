import { edelweissPolicy } from '../utils/trusted_types';
import { createElement, querySelector } from '@fluss/web';

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
    querySelector('template', wrapperElement).extract() ??
    // Just fallback.
    createElement('template').extract()
  );
}
