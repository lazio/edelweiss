/* eslint-disable no-undef */
import assert from 'assert'

import { html } from '../../dist/template/template.mjs'
import Component from '../../dist/component/component.mjs'

describe('Test template of "edelweiss"', function () {
  it('html() must return Promise<string>', async function () {
    const value = await html`<p></p>`
    assert.strictEqual(typeof value, 'string')
  })

  it('html() must insert string variable and return Promise<string>', async function () {
    const value = await html`<p>${'child'}</p>`
    assert.strictEqual(value, '<p>child</p>')
  })

  it('html() must return Promise<string> without coerced variable if its value is undefined', async function () {
    const value = await html`<p>${undefined}</p>`
    assert.strictEqual(value, '<p></p>')
  })

  it('html() must return Promise<string> without coerced variable if its value is null', async function () {
    const value = await html`<p>${null}</p>`
    assert.strictEqual(value, '<p></p>')
  })

  it('html() must return Promise<string> with inserted "Component" into it.', async function () {
    class TestComponent extends Component {
      template() {
        return html`<p>Component</p>`
      }
    }

    assert.doesNotThrow(async () => { await html`<div>${new TestComponent()}</div>` })

    const value = await html`<div>${new TestComponent()}</div>`
    assert.strictEqual(value, '<div><p>Component</p></div>')
  })

  it('html() must return Promise<string> with inserted "Array<string>" into it', async function () {
    const array = [
      '<p>1</p>',
      '<p>2</p>'
    ]
    const value = await html`<p>${array}</p>`
    assert.strictEqual(value, '<p><p>1</p><p>2</p></p>')
  })
})
