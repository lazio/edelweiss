import './crypto_for_jest';
import { html, router } from '../build/index.js';

describe('router', () => {
  beforeAll(() => (window.location.pathname = '/'));

  test('should insert template based on current location', () => {
    const [page] = router(
      {
        pattern: '/',
        template: () => html`start`,
      },
      {
        pattern: '/one',
        template: () => html`one`,
      }
    );

    const template = html` <div>${page}</div> `;

    expect(template.content.childNodes.length).toBe(
      3 /* start comment + text + end comment */
    );
    expect(template.content.childNodes.item(1).textContent).toMatch('start');
  });

  test('should update template', () => {
    const [page, to] = router(
      {
        pattern: '/',
        template: () => html`start`,
      },
      {
        pattern: '/one',
        template: () => html`one`,
      }
    );

    const template = html` <div>${page}</div> `;

    expect(template.content.childNodes.item(1).textContent).toMatch('start');

    to('/one');

    expect(template.content.childNodes.length).toBe(
      3 /* start comment + text + end comment */
    );
    expect(template.content.childNodes.item(1).textContent).toMatch('one');
  });

  test('should insert default not found route if there is no match', () => {
    const [page, to] = router(
      {
        pattern: '/',
        template: () => html`start`,
      },
      {
        pattern: '/one',
        template: () => html`one`,
      }
    );

    const template = html` <div>${page}</div> `;

    to('/second');

    expect(template.content.firstElementChild.innerHTML).toMatch('/second');
  });

  test('should insert custom not found route if there is no match', () => {
    const [page, to] = router(
      {
        pattern: '/',
        template: () => html`start`,
      },
      {
        pattern: '/one',
        template: () => html`one`,
      },
      {
        pattern: '/not-found',
        notFound: true,
        template: () => html`No route match!`,
      }
    );

    const template = html` <div>${page}</div> `;

    to('/third');

    expect(template.content.firstElementChild.innerHTML).toMatch(
      'No route match!'
    );
  });
});
