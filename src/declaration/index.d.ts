/**
 * Parent class for all custom elements.
 *
 * Other properties and custom element's callbacks you can define as
 * usual.
 */
export class WebComponent<T extends State = {}> extends HTMLElement {
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
  changeState(parts: Partial<T>): Promise<void>;

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
  template(): string | Promise<string>;
}

type WebComponentConstructor = {
  new (): WebComponent;
  prototype: WebComponent;
};

/**
 * Defines autonomous custom elements.
 *
 * More info about them and their lifecycles
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

/**
 * Class that must be used to describe components of the page or page itself.
 * Can be replaced by plain function.
 */
export class Component {
  /**
   * Loads css files to page before `Component` is built.
   * Looks for files in directory that is defined by `Config.cssRootFolder`.
   */
  styles(): string | Array<string>;
  beforeBuild(): void | Promise<void>;
  template(): string | Promise<string>;
  afterBuild(): void | Promise<void>;
}

/** Does routing of site. */
export class Router {
  /** Returns info about current route. */
  static get current(): Route;

  /** Define settings for `Router`. */
  static configure(options: Partial<RouterOptions>): void;
  /** Makes routes known for `Router`.  */
  static add(routes: Route | Array<Route>): void;
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

export class I18n {
  static get currentLanguage(): string | undefined;
  static get languagesTags(): Array<string>;

  /** Add language pack. */
  static add(languages: I18nLanguagesSet, initial?: string): void;
  /** Change current language of view. */
  static setLanguage(tag: string): Promise<void>;
  /** Returns translated text based on _path_. */
  static translate(path: string, variables?: { [key: string]: string }): string;
}

export class Config {
  /**
   * Path to directory where must be css files that will be loaded
   * by `registerCss` function or by `Component.styles` method.
   */
  static cssRootFolder(): string;
}

/**
 * Returns translated text based on _path_. Same as `I18n.translate` static
 * method.
 */
export function translate(
  path: string,
  variables?: { [key: string]: string }
): string;

type StateValue = string | number | boolean | Array<StateValue> | State;
/** Common shape of state for application. */
export interface State {
  [key: string]: StateValue;
}

/** Creates state based on object initial values. */
export function createState<T extends State = {}>(object: T): T;

/** Creates string template that will be evaluated as DOM elements. */
export function html(
  parts: TemplateStringsArray,
  ...variables: Array<any>
): Promise<string>;

/**
 * Lazingly load CSS to page.
 * @param css - name of css files that need to be
 * lazy loaded.
 * @returns function that unload registered css
 * (removes from the page). If _immediately_ is `true`, then css will be removed
 * in time of function's invoking, otherwise css will be removed on next
 * rendering step (`Router.to`, `Router.reload` etc).
 */
export function registerCss(
  css: string | Array<string>
): (immediately?: boolean) => void;

export type Route = {
  /**
   * Path of the route. It will be implicitly converted to `RegExp`,
   * so you can write valid RegExp in string.
   * For convinience "(.+)" means _variable_ and can be
   * writed as ":any-name:". This is **variable**.
   * Also variables can be optional, in such case they must end with question
   * mark - `:any-name:?`.
   *
   * For example: `/docs-?:section:?` equals to `new Regexp('^/docs-?(.+)?$')`.
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
   * Holds variables that are defined inside _path_.
   * First value of array is whole matched string.
   * Second value (index **1**) and go on are path's variables.
   */
  readonly parameters?: RegExpMatchArray;
  /** Hook is invoked before this route will render. */
  before?: () => void | Promise<void>;
  /** Returns HTML template for this route. */
  view: () =>
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>;
  /** Hook is invoked after this route renders. */
  after?: () => void | Promise<void>;
};

type RouterOptions = {
  /** Prefix path that will be prepended to path of all user's defined routes. */
  basePrefix: string;
  /**
   * Container for elements from all routes.
   * If all routes will have the same container,
   * then this variable may be set and used.
   */
  baseContainer: string;
};

export type I18nLanguage = string | { [key: string]: I18nLanguage };

/**
 * Describe languages object.
 * Keys must be language identifiers (by example `en`, `uk`, `fr` etc.).
 */
export type I18nLanguagesSet = {
  [key: string]: I18nLanguage;
};
