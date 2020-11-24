/**
 * Parent class for all custom elements.
 *
 * Other properties and custom element's callbacks you can define as
 * usual.
 */
export abstract class WebComponent<
  T extends object = object
> extends HTMLElement {
  /**
   * When overriding constructor always call **super()** at start,
   * so that the correct prototype chain will be established.
   */
  constructor();

  /**
   * Returns state of custom element.
   * For changing state use `changeState` method.
   */
  get state(): T;

  /* Returns array of attribute names to monitor for changes. */
  static get observedAttributes(): ReadonlyArray<string>;

  /**
   * Change part of state of custom element.
   * Every change is reactive.
   */
  changeState(parts: Partial<T>): void;

  /**
   * Called when the element is moved to a new document
   * (happens in `document.adoptNode`, very rarely used).
   */
  adoptedCallback(): void;
  /**
   * Browser calls this method when the element is added to the document
   * (can be called many times if an element is repeatedly added/removed).
   */
  connectedCallback(): void;
  /**
   * Browser calls this method when the element is removed from the document
   * (can be called many times if an element is repeatedly added/removed).
   */
  disconnectedCallback(): void;
  /**
   * Called when one of attributes returned by `observedAttributes` is modified.
   *
   * Calling `super.attributeChangedCallback` while overriding this
   * method is necessary. Otherwise reactivity will be lost.
   */
  attributeChangedCallback(
    name: string,
    oldValue: string,
    newValue: string
  ): void;

  /**
   * Defines inner DOM of custom element as Shadow DOM.
   *
   * Returned HTML will be wrapped with `HTMLTemplateElement`,
   * if method returns HTML that are not wrapped with top-level `<template>`.
   */
  abstract template(): string;
}

type WebComponentConstructor = {
  new (): WebComponent;
  prototype: WebComponent;
};

/**
 * Defines autonomous custom elements. Can be safely called many times.
 *
 * More info about custom elements and their lifecycles
 * [at MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).
 */
export function defineWebComponent<E extends WebComponentConstructor>(
  /** Name of the custom tag. Must contain dash symbol. */
  tagName: string,
  /**
   * Class that describe custom element. You must override `template`
   * method.
   */
  elementClass: E
): void;

/** Does routing of site. */
export class Router {
  /** Returns info about current route. */
  static get current(): Readonly<Route>;

  /** Define settings for `Router`. */
  static configure(options: Partial<RouterOptions>): void;
  /** Makes routes known for `Router`.  */
  static add(
    routes: Omit<Route, 'parameters'> | ReadonlyArray<Omit<Route, 'parameters'>>
  ): void;
  /** Navigates to route based on `path`. */
  static to(
    path: string,
    options?: {
      willStateChange?: boolean;
    }
  ): Promise<void>;
  static reload(): Promise<void>;
  static back(): void;
  static forward(): void;
}

export namespace i18n {
  type LanguageObject = string | { [key: string]: LanguageObject };

  /**
   * Describe languages object.
   * Keys must be language identifiers (by example `en`, `uk`, `fr` etc.).
   */
  type Languages = {
    [key: string]: LanguageObject;
  };

  const currentLanguage: string | undefined;
  function languagesTags(): ReadonlyArray<string>;

  /** Add language pack. */
  function add(languages: Languages, initial?: string): void;
  /** Change current language of view. */
  function setLanguage(tag: string): void;
  /** Returns translated text based on _path_. */
  function translate(
    path: string,
    variables?: { [key: string]: string }
  ): string;
}

/**
 * Returns translated text based on _path_.
 * Same as `i18n.translate` function.
 */
export function translate(
  path: string,
  variables?: { [key: string]: string }
): string;

/** Creates state based on object initial values. */
export function createState<T extends object = object>(object: T): T;

export type HookCallback = (self: Element) => void | Promise<void>;

type AllowedValues =
  | null
  | undefined
  | string
  | number
  | boolean
  | Function
  | ReadonlyArray<string>
  | EventListenerObject;

/** Creates string template that will be evaluated as DOM elements. */
export function html(
  parts: TemplateStringsArray,
  ...variables: ReadonlyArray<AllowedValues>
): string;

export type Route = {
  /**
   * Path of the route. It will be implicitly converted to `RegExp`,
   * so you must write valid RegExp in string.
   *
   * Variables will be available in _parameters_ field.
   */
  readonly path: string;
  /**
   * Selector of root element that will hold HTML of this route.
   * If local container property is absent, then global one will
   * be used.
   */
  readonly container?: string;
  /**
   * Holds variables (capture groups) that are defined inside _path_.
   * First value of array is whole matched string.
   * Second value (index **1**) and go on are path's variables.
   */
  readonly parameters: RegExpMatchArray;
  /**
   * Hook is invoked before this route will render.
   *
   * For preventing navigation to route return `false`
   * from method.
   */
  before?: () => void | boolean | Promise<void | boolean>;
  /** Returns HTML template for this route. */
  view: () => string;
  /** Hook is invoked after this route renders. */
  after?: () => void | Promise<void>;
};

type RouterOptions = {
  /** Prefix path that will be prepended to path of all routes defined by user. */
  prefix: string;
  /**
   * Global container selector of root node of application.
   * If most routes will have the same container,
   * then this variable may be set.
   */
  container: string;
};
