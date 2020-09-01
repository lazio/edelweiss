import { Router } from '../src';

describe('Test "Router"', () => {
  test('"Router.current" before "Router.to" must to have empty values in "path" and "view()"', () => {
    expect(Router.current.path).toEqual('');
    expect(Router.current.view()).toEqual('');
  });

  test('"Router.to" before "Router.add" must not throw an Error', () => {
    expect(Router.to('/')).resolves.not.toThrow();
  });

  test('"Router.to" must use global "container" if there is not local one', () => {
    Router.container = '.page ';
    Router.add([
      {
        path: '/',
        view() {
          return 'Start';
        },
      },
      {
        path: '/test',
        view() {
          return 'Test';
        },
      },
      {
        path: '/not-found',
        container: '.no-element',
        view() {
          return 'No such element';
        },
      },
    ]);

    expect(Router.to('/test')).resolves.toBe(undefined);
  });

  test('"Router.to" must update "container" element with children that returns from "Route.view()"', async () => {
    await Router.to('/test');

    const container = document.querySelector<HTMLDivElement>('.page');

    if (container) {
      const child = container.innerText;
      expect(child).toMatch('Test');
    }
  });

  test('"Router.to" must not throw an error if container is not exist', () => {
    expect(Router.to('/not-found')).resolves.not.toThrow();
  });

  test('Navigating to any links without setting state, does not throw error', () => {
    document.body.innerHTML = '<a href="#u"></a>';

    const a = document.querySelector('a');
    if (a) {
      expect(() => a.click()).not.toThrow();
    }
  });
});
