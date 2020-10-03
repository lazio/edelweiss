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
  static get cssRootFolder(): string;
  static set cssRootFolder(dir: string);
}

/**
 * Returns translated text based on _path_. Same as `I18n.translate` static
 * method.
 */
export function translate(
  path: string,
  variables?: { [key: string]: string }
): string;

/** Creates state based on object initial values. */
export function createState<T extends object = object>(object: T): T;

/** Creates string template that will be evaluated as DOM elements. */
export function html(
  parts: TemplateStringsArray,
  ...variables: Array<any>
): Promise<string>;

/**
 * Lazingly load CSS to page.
 * @param {string | Array<string>} css - name of css files that need to be
 * lazy loaded.
 * @returns {(immediately?: boolean) => void} function that unload registered css
 * (removes from the page). If [immediately] is `true`, then css will be removed
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
