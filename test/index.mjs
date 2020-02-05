import { Custom, Main, render, Footer, Button } from '../dist/index.mjs'

const main = new Main(
  new Custom('custom-p', class extends HTMLElement {}, {
    children: 'Hello custom 2',
  }),
  { class: 'main' }
)

const footer = new Footer(
  new Button(
    'Click me) I am a cool button!',
    {
      style:
        'margin: 0; padding: 5px 10px; border: none; outline: none; background-color: blue; color: black;',
    },
    {
      click(event) {
        console.log('Clicked')
      },
    }
  ),
  {
    class: 'footer',
    style: 'padding: 15px; background-color: #cecece;',
  },
)

render('body', [main, footer])
