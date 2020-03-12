/* eslint-disable import/no-absolute-path */
// @flow

import {
  group,
  test,
  expect,
} from '/node_modules/@prostory/baum/dist/index.mjs'

import { html, Component } from '../../dist/index.mjs'

group('Test template of "edelweiss"', () => {
  test('html() must return Promise<string>', async () => {
    const value = html`
      <p></p>
    `
    ;(await expect(value).toBeResolved()).isString()
  })

  test('html() must insert string variable and return Promise<string>', async () => {
    const value = await html`
      <p>${'child'}</p>
    `
    expect(value).toMatch('<p>child</p>')
  })

  test('html() must return Promise<string> without coerced variable if its value is undefined', async () => {
    const value = await html`
      <p>${undefined}</p>
    `
    expect(value).toMatch('<p></p>')
  })

  test('html() must return Promise<string> without coerced variable if its value is null', async () => {
    const value = await html`
      <p>${null}</p>
    `
    expect(value).toMatch('<p></p>')
  })

  test('html() must return Promise<string> with inserted "Component" into test.', async () => {
    class TestComponent extends Component {
      template() {
        return html`
          <p>Component</p>
        `
      }
    }

    await expect(
      html`
        <div>${new TestComponent()}</div>
      `
    ).toBeResolved()

    const value = await html`
      <div>${new TestComponent()}</div>
    `
    expect(value).toMatch('<div>[\\s]*<p>[\\s]*Component[\\s]*</p>[\\s]*</div>')
  })

  test('html() must return Promise<string> with inserted "Array<string>" into test', async () => {
    const array = ['<p>1</p>', '<p>2</p>']

    ;(
      await expect(
        html`
          <p>${array}</p>
        `
      ).toBeResolved()
    ).toMatch('<p><p>1</p><p>2</p></p>')
  })

  test('html() must return Promise<string> with inserted "Promise<string>" into test', async () => {
    const child = html`
      <span>Child</span>
    `
    ;(
      await expect(
        html`
          <p>${child}</p>
        `
      ).toBeResolved()
    ).toMatch('<p>[\\s]*<span>[\\s]*Child[\\s]*</span>[\\s]*</p>')
  })

  test('html() must return Promise<string> with boolean attribute', async () => {
    const valueFalsy = await html`
      <button ?disable=${false}>child</button>
    `
    expect(valueFalsy).toMatch('<button[\\s]*>child</button>')

    const valueTruthy = await html`
      <button ?disable=${true}>child</button>
    `
    expect(valueTruthy).toMatch('<button disable>child</button>')
  })

  test('html() must return Promise<string> with style attribute and variable as object', async () => {
    const styles = {
      opacity: 0,
      display: 'block',
    }
    const value = await html`
      <button style="${styles}">child</button>
    `
    expect(value).toMatch(
      '<button style="opacity:0;display:block">child</button>'
    )
  })

  test('html() must rejects with style attribute and variable as invalid object', async () => {
    const styles = {
      opacity() {},
      display: 'block',
    }

    await expect(
      html`
        <button style="${styles}">child</button>
      `
    ).toBeRejected()
  })

  test('html() must add styles to style element with some styles', async () => {
    const styles = {
      opacity: 0,
      'font-size': '1rem'
    }

    const button = await html`
        <button style='width: 20px; ${styles}'>child</button>
      `
    expect(button).toMatch(/<button style='width: 20px; opacity:0;font-size:1rem;?'>child<\/button>/)
  })

  test(`html() must set to an element "data-event-id[number]" attribute 
  if event handler is passed to element`, async () => {
    const button = await html`
        <button @click=${(event) => {}}>child</button>
      `
    expect(button).toMatch(/<button data-event-id[\d]=[\d]+>child<\/button>/)
  })

  test('html() must add value to other values of element attribute', async () => {
    const button = await html`
        <button class='some-class ${'other-class'}'>child</button>
      `
    expect(button).toMatch(/<button class='some-class other-class'>child<\/button>/)
  })
})
