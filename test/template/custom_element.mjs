/* eslint-disable import/no-absolute-path */
// @flow

import {
  group,
  test,
  expect,
} from '@prostory/baum'

import { html } from '../../dist/index.mjs'

group('Test custom element creation', () => {
  return [
    test('Defining custom element', () => {
      class MyP extends HTMLParagraphElement {}

      html`<my-p:p=${MyP}>Hello</my-p>`.then(() => {
        const myP = customElements.get('my-p')
        expect(myP).toEqual(MyP)
      })
    }),

    test('Creating custom element', async () => {
      const text = await html`<my-p>Test</my-p>`
      expect(text).toMatch('<my-p>Test</my-p>')
    }),

    test('Registering custom element do not throw an error if "extend" parameter is not defined', () => {
      expect(() => {
        html`<u-u=${class extends HTMLElement {}}></u-u>`
      }).not.toThrow()
    }),

    test('Defining custom element from template', async () => {
      class MyP extends HTMLParagraphElement {}

      const text = await html`<long-list:p=${MyP}></long-list>`
      expect(text).toMatch('<long-list></long-list>')
    }),
  ]
})
