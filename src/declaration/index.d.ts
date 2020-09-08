/**
 * Class that must be used to describe components of the page or page itself.
 * Can be replaced by plain function.
 */
export class Component {
  styles(): string | Array<string>;
  beforeBuild(): void | Promise<void>;
  template(): string | Promise<string>;
  afterBuild(): void | Promise<void>;
}

/** Does routing of site. */
export class Router {
  static get current(): Route & RouteInfo;
  static get container(): string | undefined;
  static set container(value: string | undefined);

  /** Makes routes known for `Router`.  */
  static add(routes: Route | Array<Route>): void;
  /** Navigates to route base on `path`. */
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

  static add(languages: I18nLanguagesSet, initial?: string): void;
  static setLanguage(tag: string): Promise<void>;
  static translate(path: string, variables?: { [key: string]: string }): string;
}

export class Config {
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
  path: string | RegExp;
  container?: string;
  before?: () => void | Promise<void>;
  view: () =>
    | string
    | Component
    | Promise<string>
    | Array<string | Component | Promise<string>>;
  after?: () => void | Promise<void>;
};

export type RouteInfo = {
  parameters?: RegExpMatchArray;
};

export type I18nLanguage = string | { [key: string]: I18nLanguage };

/**
 * Describe languages object.
 * Keys must be language identifiers (by example `en`, `uk`, `fr` etc.).
 */
export type I18nLanguagesSet = {
  [key: string]: I18nLanguage;
};
