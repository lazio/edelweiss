import { Custom, Main, render, Footer, Button } from '../dist/index.mjs'

const main = new Main({
  attributes: {
    class: 'main'
  },
  children: [
    new Custom('custom-p', class extends HTMLElement {}, {
      children: 'Hello custom 2'
    })
  ]
})

const footer = new Footer({
  attributes: {
    class: 'footer',
    style: 'padding: 15px; background-color: #cecece;'
  },
  children: new Button({
    attributes: {
      style: 'margin: 0; padding: 5px 10px; border: none; outline: none; background-color: blue; color: black;'
    },
    children: 'Click me) I am a cool button!'
  })
})

render('body', [main, footer])
