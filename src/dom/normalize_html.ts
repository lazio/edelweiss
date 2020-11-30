import { edelweissPolicy } from '../utils/trusted_types';

export function normalizeHTMLForWebComponent(
  html: string
): HTMLTemplateElement {
  const template = document.createElement('div');
  template.innerHTML = edelweissPolicy.createHTML(
    html.trim().startsWith('<template') ? html : `<template>${html}</template>`
  );

  return (
    template.querySelector('template') ??
    // Just fallback.
    document.createElement('template')
  );
}
