import { i18n, router, html, translate } from '../build';

describe('Internationalization', () => {
  beforeAll(() => {
    document.body.innerHTML = '<div class="main"></div>';
    router.add({
      path: '/',
      container: '.main',
      view() {
        return html`${i18n.translate('main')}`;
      },
    });
  });

  test('translate method without adding translation object returns undefined and innerHTML is empty', async () => {
    await router.to('/');

    const main = document.querySelector('.main');

    expect(main).toBeTruthy();
    expect(main.innerHTML).toMatch('');
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
    await router.reload();

    const main = document.querySelector('.main');

    expect(main).toBeTruthy();
    expect(main.innerHTML).toMatch('Привіт');
  });

  test('changing language cause rerender of the page', () => {
    i18n.setLanguage('en');

    const main = document.querySelector('.main');

    expect(main).toBeTruthy();
    expect(main.innerHTML).toMatch('Hello');
  });

  test('translate method inserts variable correctly', async () => {
    document.body.insertAdjacentHTML('beforeend', '<div class="last"></div>');
    router.add({
      path: '/withVar',
      container: '.last',
      view() {
        return html`${i18n.translate('withVar', { name: 'world' })}`;
      },
    });
    await router.to('/withVar');

    expect(i18n.currentLanguage).toBe('en');

    const last = document.querySelector('.last');

    expect(last).toBeTruthy();
    expect(last.innerHTML).toMatch('Hello world');
  });

  test('translate function behave as i18n.translate', async () => {
    document.body.insertAdjacentHTML('beforeend', '<div class="alias"></div>');
    router.add({
      path: '/alias',
      container: '.alias',
      view() {
        return html`${translate('withVar', { name: 'alias' })}`;
      },
    });
    await router.to('/alias');

    const alias = document.querySelector('.alias');

    expect(alias).toBeTruthy();
    expect(alias.innerHTML).toMatch('Hello alias');
  });
});
