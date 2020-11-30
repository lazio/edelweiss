import { querySelector } from '@fluss/web';
import { i18n, Router, html, translate } from '../build';

describe('Internationalization', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div class="main"></div>';
    Router.add({
      path: '/',
      container: '.main',
      view() {
        return html`${i18n.translate('main')}`;
      },
    });
    Router.to('/');
  });

  test('translate method without adding translation object returns undefined and innerHTML is empty', () => {
    expect(
      querySelector('.main')
        .map((el) => el.innerHTML)
        .extract()
    ).toMatch('');
  });

  test('adding translation languages with initial language make page with that translation', async () => {
    i18n.add(
      {
        en: {
          main: 'Hello',
          withVar: 'Hello ${name}',
        },
        uk: {
          main: 'Привіт',
          withVar: 'Привіт ${name}',
        },
      },
      'uk'
    );
    await Router.reload();

    expect(
      querySelector('.main')
        .map((el) => el.innerHTML)
        .extract()
    ).toMatch('Привіт');
  });

  test('changing language cause rerender of the page', () => {
    i18n.setLanguage('en');

    expect(
      querySelector('.main')
        .map((el) => el.innerHTML)
        .extract()
    ).toMatch('Hello');
  });

  test('translate method inserts variable correctly', async () => {
    document.body.insertAdjacentHTML('beforeend', '<div class="last"></div>');
    Router.add({
      path: '/withVar',
      container: '.last',
      view() {
        return html`${i18n.translate('withVar', { name: 'world' })}`;
      },
    });
    await Router.to('/withVar');

    expect(i18n.currentLanguage).toBe('en');
    expect(
      querySelector('.last')
        .map((el) => el.innerHTML)
        .extract()
    ).toMatch('Hello world');
  });

  test('translate function behave as i18n.translate', async () => {
    document.body.insertAdjacentHTML('beforeend', '<div class="alias"></div>');
    Router.add({
      path: '/alias',
      container: '.alias',
      view() {
        return html`${translate('withVar', { name: 'alias' })}`;
      },
    });
    await Router.to('/alias');

    expect(
      querySelector('.alias')
        .map((el) => el.innerHTML)
        .extract()
    ).toMatch('Hello alias');
  });
});
