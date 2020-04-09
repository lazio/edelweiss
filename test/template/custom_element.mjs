/* eslint-disable import/no-absolute-path */
// @flow

import {
  group,
  test,
  expect,
} from '/node_modules/@prostory/baum/dist/index.mjs'

import { customElement, html } from '../../dist/index.mjs'

group('Test custom element creation', () => {
  return [
    test('Defining custom element', () => {
      class MyP extends HTMLParagraphElement {}

      customElement('my-p', MyP, 'p')

      const myP = customElements.get('my-p')
      expect(myP).toEqual(MyP)
    }),

    test('Creating custom element', async () => {
      const text = await html`<my-p>Test</my-p>`
      expect(text).toMatch('<my-p>Test</my-p>')
    }),

    test('"customElement" function throws error if "tag" parameter is not defined', () => {
      expect(() => {
        customElement(undefined, class E extends HTMLElement {})
      }).toThrow()
    }),

    test('"customElement" function throws error if "tag" parameter is not type of "string"', () => {
      expect(() => {
        customElement({}, class E extends HTMLElement {})
      }).toThrow()
    }),

    test('"customElement" function throws error if "constructor" parameter is not defined', () => {
      expect(() => {
        customElement('my-p')
      }).toThrow()
    }),

    test('"customElement" function do not throw error if "extend" parameter is not defined', () => {
      class MyP extends HTMLParagraphElement {}

      expect(() => {
        customElement('my-p', MyP)
      }).not.toThrow()
    }),
  ]
})
