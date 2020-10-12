import { Component, html } from '../src';

describe('Test "Component"', () => {
  test('Component.template() returns Promise<string>', () => {
    class TestComponent extends Component {
      template() {
        return html`Test`;
      }
    }

    const component = new TestComponent();
    expect(component.template()).toBeInstanceOf(Promise);
    expect(component.template()).resolves.toBe('Test');
  });

  test('Component.beforeBuild() invokes before template is builded', () => {
    class TestComponent extends Component {
      name: string = '';

      beforeBuild() {
        this.name = 'TestComponent';
      }

      template() {
        return html`Test ${this.name}`;
      }
    }

    const component = new TestComponent();
    expect(component._createNodes()).resolves.toEqual('Test TestComponent');
  });

  test('Component.afterBuild() invokes after template is builded', async () => {
    class TestComponent extends Component {
      name: string = '';

      beforeBuild() {
        this.name = 'TestComponent';
      }

      // Left for sure
      async afterBuild() {
        this.name = 'TestComponent2';
      }

      template() {
        return html`Test ${this.name}`;
      }
    }

    const component = new TestComponent();
    await component._createNodes();
    // afterBuild rewrites name field that was defined by beforeBuild method.
    expect(component.name).toEqual('TestComponent2');
  });

  test('Styles are added to page before Component is rendered', async () => {
    class TestComponent extends Component {
      styles() {
        return 'no_exists.css';
      }

      template() {
        return html`Test styles`;
      }
    }

    const component = new TestComponent();
    await component._createNodes();
    expect(document.documentElement.innerHTML).toMatch(/\bno_exists.css\b/);
  });
});
