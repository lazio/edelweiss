import { registerCss, Router } from '../src';
import { querySelector, getAttribute } from '@fluss/web';

describe('registerCss', () => {
  beforeAll(() => {
    document.head.innerHTML = '';
    document.body.innerHTML = '<p></p>';

    Router.add({
      path: '/',
      container: 'p',
      view() {
        return 'Hello';
      },
    });

    Router.to('/');
  });

  test('registerCss inserts <link> to page with default path after rendering stage.', async () => {
    registerCss('main.css');

    expect(querySelector('link', document.head).isNothing()).toBe(true);

    await Router.reload();

    expect(querySelector('link', document.head).isJust()).toBe(true);
    expect(
      querySelector('link', document.head)
        .chain((link) => getAttribute(link, 'href'))
        .extract()
    ).toMatch('/public/styles/main.css');
  });

  test('registerCss returns function that remove inserted link immediately with provided option.', async () => {
    const unregisterCss = registerCss('main.css');

    await Router.reload();

    unregisterCss(true);

    expect(querySelector('link', document.head).isNothing()).toBe(true);
  });

  test('registerCss returns function that remove inserted link on next rendering step without provided option.', async () => {
    const unregisterCss = registerCss('main.css');

    await Router.reload();

    unregisterCss();

    expect(querySelector('link', document.head).isNothing()).toBe(false);

    await Router.reload();

    expect(querySelector('link', document.head).isNothing()).toBe(true);
  });
});
