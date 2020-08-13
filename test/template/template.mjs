/* eslint-disable import/no-absolute-path */
// @flow

import { group, test, expect } from '@prostory/baum'

import { html, Component } from '../../dist/index.mjs'

group('Test template of "edelweiss"', () => {
  return [
    test('html() must return Promise<string>', async () => {
      ;(await expect(html` <p></p> `).toBeResolved()).toBe('string')
    }),

    test('html() must insert string variable and return Promise<string>', async () => {
      const value = await html` <p>${'child'}</p> `
      expect(value).toMatch(/\s*<p>child<\/p>\s*/)
    }),

    test('html() must return Promise<string> without coerced variable if its value is undefined', async () => {
      const value = await html` <p>${undefined}</p> `
      expect(value).toMatch(/\s*<p><\/p>\s*/)
    }),

    test('html() must return Promise<string> without coerced variable if its value is null', async () => {
      const value = await html` <p>${null}</p> `
      expect(value).toMatch(/\s*<p><\/p>\s*/)
    }),

    test('html() must return Promise<string> with inserted "Component" into test.', async () => {
      class TestComponent extends Component {
        template() {
          return html` <p>Component</p> `
        }
      }

      await expect(html` <div>${new TestComponent()}</div> `).toBeResolved()

      const value = await html` <div>${new TestComponent()}</div> `
      expect(value).toMatch(
        '[\\s]*<div>[\\s]*<p>[\\s]*Component[\\s]*</p>[\\s]*</div>[\\s]*'
      )
    }),

    test('html() must return Promise<string> with inserted "Array<string>" into test', async () => {
      const array = ['<p>1</p>', '<p>2</p>']

      ;(await expect(html` <p>${array}</p> `).toBeResolved()).toMatch(
        '[\\s]*<p><p>1</p><p>2</p></p>[\\s]*'
      )
    }),

    test('html() must return Promise<string> with inserted "Promise<string>" into test', async () => {
      const child = html` <span>Child</span> `
      ;(await expect(html` <p>${child}</p> `).toBeResolved()).toMatch(
        '[\\s]*<p>[\\s]*<span>[\\s]*Child[\\s]*</span>[\\s]*</p>[\\s]*'
      )
    }),

    test('html() must return Promise<string> with boolean attribute', async () => {
      const valueFalsy = await html` <button ?disable=${false}>child</button> `
      expect(valueFalsy).toMatch('[\\s]*<button[\\s]*>child</button>[\\s]*')

      const valueTruthy = await html` <button ?disable=${true}>child</button> `
      expect(valueTruthy).toMatch('[\\s]*<button disable>child</button>[\\s]*')
    }),

    test(`html() must set to an element "data-event-id[number]" attribute 
  if event handler is passed to element`, async () => {
      const button = await html`
        <button @click=${(event) => {}}>child</button>
      `
      expect(button).toMatch(
        /<button data-event-id[\d]="?[\d]+"?>child<\/button>/
      )
    }),

    test('html() must add value to other values of element attribute', async () => {
      const button = await html`
        <button class="some-class ${'other-class'}">child</button>
      `
      expect(button).toMatch(
        /<button class="some-class other-class">child<\/button>/
      )
    }),
  ]
})
