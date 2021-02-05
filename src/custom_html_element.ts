import { bind } from './bind';
import { render } from './render';
import type { Dependency } from './core/dependency';

/**
 * Describes type of reactive property.
 * Property can be defined in class via `declare` keyword.
 *
 * If property is called without argument -
 * it returns reactive container with value, that can
 * be used in **computed** context or in DOM.
 *
 * If type of argument is function, then returned
 * reactive container will contain derived value, that
 * are returned by function.
 *
 * If argument is `null` - bounded attribute will be
 * deleted and value of property will be set to empty
 * string.
 *
 * If argument is type of `string`, then container's
 * value is updated and elements that are bound to
 * container is rerendered.
 */
export interface Property {
  (): Dependency<null | string, null | string>;
  <R>(argument: (value: null | string) => R): Dependency<null | string, R>;
  (argument: null | string): void;
}

/**
 * Parent class for custom elements.
 * At least `template` method need to be defined.
 */
export abstract class CustomHTMLElement extends HTMLElement {
  /**
   * Returns an array of attribute names to monitor for changes.
   * For declared attributes same reactive properties will be created.
   * Default value of new properties is empty string.
   * Property is always reflect same attribute's value and
   * vise versa.
   * Name of properties will be in _camelCase_ notation.
   */
  static get observedAttributes(): ReadonlyArray<string> {
    return [];
  }

  /**
   * When overriding constructor always call **super()** at start,
   * so that the correct prototype chain will be established.
   */
  constructor() {
    super();

    attachReactiveAccessorsTo(this);

    render(
      this.attachShadow({
        mode: 'open',
      }),
      this.template()
    );
  }

  /**
   * Called this method when the element is added to the document
   * (can be called many times if an element is repeatedly added/removed).
   */
  protected connectedCallback(): void {}

  /**
   * Called this method when the element is removed from the document
   * (can be called many times if an element is repeatedly added/removed).
   */
  protected disconnectedCallback(): void {}

  /**
   * Called when the element is moved to a new document
   * (happens in `document.adoptNode`).
   */
  protected adoptedCallback(): void {}

  /**
   * Called when one of attributes returned by `observedAttributes`
   * is modified.
   *
   * Call `super.attributeChangedCallback` while overriding this
   * method.
   */
  protected attributeChangedCallback(
    this: CustomHTMLElement & { [property: string]: Property },
    name: string,
    oldValue: string | null,
    newValue: string | null
  ): void {
    if (oldValue !== newValue) {
      this[toCamelCase(name)](newValue);
    }
  }

  /** Defines inner DOM of custom element as Shadow DOM. */
  protected abstract template(): HTMLTemplateElement;
}

function attachReactiveAccessorsTo(target: CustomHTMLElement): void {
  const constructor = target.constructor as typeof CustomHTMLElement;

  constructor.observedAttributes.forEach((property) =>
    createAccessorFor(target, property)
  );
}

function createAccessorFor(target: CustomHTMLElement, property: string): void {
  const [dependency, update] = bind<null | string>(
    target.getAttribute(property)
  );

  Reflect.defineProperty(target, toCamelCase(property), {
    get() {
      return <R>(value?: null | string | ((value: null | string) => R)) => {
        if (typeof value === 'function') {
          return dependency(value);
        } else if (value === undefined) {
          return dependency();
        } else if (value === null) {
          target.removeAttribute(property);
          update(null);
        } else {
          target.setAttribute(property, value);
          update(value);
        }
      };
    },
    set() {},
    enumerable: true,
    configurable: true,
  });
}

/** Converts kebab-case to camelCase. */
function toCamelCase(name: string): string {
  return name.replace(/-(\w)/g, (match, letter: string) =>
    letter.toUpperCase()
  );
}
