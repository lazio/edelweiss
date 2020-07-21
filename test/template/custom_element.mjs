/* eslint-disable import/no-absolute-path */
// @flow

import {
  group,
  test,
  expect,
} from '/node_modules/@prostory/baum/dist/index.mjs'

import { registerCustomElement, html } from '../../dist/index.mjs'

group('Test custom element creation', () => {
  return [
    test('Defining custom element', () => {
      class MyP extends HTMLParagraphElement {}

      registerCustomElement(['my-p', 'p'], MyP)

      const myP = customElements.get('my-p')
      expect(myP).toEqual(MyP)
    }),

    test('Creating custom element', async () => {
      const text = await html`<my-p>Test</my-p>`
      expect(text).toMatch('<my-p>Test</my-p>')
    }),

    test('"registerCustomElement" function throws error if "tag" parameter is not defined', () => {
      expect(() => {
        registerCustomElement([undefined], class E extends HTMLElement {})
      }).toThrow()
    }),

    test('"registerCustomElement" function throws error if "tag" parameter is not type of "string"', () => {
      expect(() => {
        registerCustomElement([{}], class E extends HTMLElement {})
      }).toThrow()
    }),

    test('"registerCustomElement" function throws error if "constructor" parameter is not defined', () => {
      expect(() => {
        registerCustomElement(['my-p'])
      }).toThrow()
    }),

    test('"registerCustomElement" function do not throw error if "extend" parameter is not defined', () => {
      class MyP extends HTMLParagraphElement {}

      expect(() => {
        registerCustomElement(['my-p'], MyP)
      }).not.toThrow()
    }),

    test('Defining custom element from template', async () => {
      class MyP extends HTMLParagraphElement {}

      const text = await html`<long-list:p=${MyP}></long-list>`
      expect(text).toMatch('<long-list></long-list>')
    }),

    test('Defining custom element from template without constructor lead to an error.', () => {
      expect(html`<long-list =${false}></long-list>`).toBeRejected()
    }),
  ]
})
