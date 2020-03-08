/* eslint-disable import/no-absolute-path */
/* eslint-disable no-undef */
// @flow

import { group, test, expect } from '/node_modules/@prostory/baum/dist/index.mjs'

import { html } from '../../dist/template/template.mjs'
import Component from '../../dist/component/component.mjs'

group('Test template of "edelweiss"', async () => {
  test('html() must return Promise<string>', async () => {
    const value = await html`<p></p>`
    expect(typeof value).toEqual('string')
  })

  test('html() must insert string variable and return Promise<string>', async () => {
    const value = await html`<p>${'child'}</p>`
    expect(value).toEqual('<p>child</p>')
  })

  test('html() must return Promise<string> without coerced variable if its value is undefined', async () => {
    const value = await html`<p>${undefined}</p>`
    expect(value).toEqual('<p></p>')
  })

  test('html() must return Promise<string> without coerced variable if its value is null', async () => {
    const value = await html`<p>${null}</p>`
    expect(value).toEqual('<p></p>')
  })

  test('html() must return Promise<string> with inserted "Component" into test.', async () => {
    class TestComponent extends Component {
      template() {
        return html`<p>Component</p>`
      }
    }

    await expect(html`<div>${new TestComponent()}</div>`).toBeResolved()

    const value = await html`<div>${new TestComponent()}</div>`
    expect(value).toEqual('<div><p>Component</p></div>')
  })

  test('html() must return Promise<string> with inserted "Array<string>" into test', async () => {
    const array = [
      '<p>1</p>',
      '<p>2</p>'
    ]

    ;(await expect(html`<p>${array}</p>`).toBeResolved()).toEqual('<p><p>1</p><p>2</p></p>')
  })

  test('html() must return Promise<string> with inserted "Promise<string>" into test', async () => {
    const child = html`<span>Child</span>`
    ;(await expect(html`<p>${child}</p>`).toBeResolved()).toEqual('<p><span>Child</span></p>')
  })

  test('html() must return Promise<string> with boolean attribute', async () => {
    const valueFalsy = await html`<button ?disable=${false}>child</button>`
    expect(valueFalsy).toEqual('<button >child</button>')

    const valueTruthy = await html`<button ?disable=${true}>child</button>`
    expect(valueTruthy).toEqual('<button disable>child</button>')
  })

  test('html() must return Promise<string> with style attribute and variable as object', async () => {
    const styles = {
      opacity: 0,
      display: 'block'
    }
    const value = await html`<button style="${styles}">child</button>`
    expect(value).toEqual('<button style="opacity:0;display:block">child</button>')
  })

  test('html() must rejects with style attribute and variable as invalid object', async () => {
    const styles = {
      opacity() {},
      display: 'block'
    }

    await expect(html`<button style="${styles}">child</button>`).toBeRejected()
  })

  test('html() must rejects with style attribute and variable as invalid type (function)', async () => {
    const styles = () => {}

    await expect(html`<button style="${styles}">child</button>`).toBeRejected()
  })
})
