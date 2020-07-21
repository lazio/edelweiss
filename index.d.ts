declare module '@prostory/edelweiss' {
  export class Component {
    styles(): string | string[];
    beforeBuild(): Promise<void>;
    template(): Promise<string>;
    afterBuild(): Promise<void>;
  }

  export class Router {
    static get current(): Route & RouteInfo;
    static get container(): string | void;
    static set container(value: string): void;

    static add(routes: Route | Route[]): void;
    static to(
      path: string,
      options?: {
        willStateChange?: boolean,
      }
    ): Promise<void>;
    static reload(): Promise<void>;
    static back(): void;
    static forward(): void;
  }

  export class I18n {
    static get currentLanguage(): string | void;
    static get languagesTags(): string[];

    static add(languages: I18nLanguagesSet, initial?: string): void;
    static setLanguage(tag: string): void;
    static translate(path: string, variables?: { [key: string]: string } = {}): string;
  }

  export class Config {
    static get cssRootFolder(): string;
    static set cssRootFolder(dir: string): void;
  }

  declare export function createState<T = {}>(object: T): T;

  export function html(
    parts: string[],
    ...variables: any[]
  ): Promise<string>;

  export function registerCss(css: string | string[]): void

  export type Styles = { [key: string]: number | string } | string

  export type Route = {
    path: string | RegExp,
    container?: string,
    before?: () => Promise<void>,
    view: () => string | Component | Promise<string> | (string | Component | Promise<string>)[],
    after?: () => Promise<void>,
  }

  export type RouteInfo = {
    parameters?: ?RegExpMatchArray,
  }

  export type I18nLanguage = string | { [key: string]: I18nLanguage }

  export type I18nLanguagesSet = {
    [key: string]: I18nLanguage,
  }
}