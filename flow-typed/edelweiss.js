// @flow

declare module '/node_modules/@prostory/edelweiss/dist/index.mjs' {
  declare export class Component {
    styles(): string | string[];
    beforeBuild(): Promise<void>;
    template(): Promise<string>;
    afterBuild(): Promise<void>;
  }

  declare export class Router {
    static get current(): {
      path: string | RegExp,
      container?: string,
      view: () =>
        | string
        | Component
        | Promise<string>
        | (string | Component | Promise<string>)[],
      parameters?: ?RegExp$matchResult,
    };
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

  declare export class I18n {
    static get currentLanguage(): string | void;
    static get languagesTags(): string[];

    static add(languages: I18nLanguagesSet, initial?: string): void;
    static setLanguage(tag: string): void;
    static translate(
      path: string,
      variables?: { [key: string]: string }
    ): string;
  }

  declare export class Config {
    static get cssRootFolder(): string;
    static set cssRootFolder(dir: string): void;
  }

  declare export function createState<T: { [string]: mixed }>(object: T): T

  declare export function html(
    parts: string[],
    ...variables: mixed[]
  ): Promise<string>

  declare export function registerCss(css: string | string[]): void

  declare export type Styles = { [key: string]: number | string } | string

  declare export type Route = {
    path: string | RegExp,
    container?: string,
    before?: () => Promise<void>,
    view: () =>
      | string
      | Component
      | Promise<string>
      | (string | Component | Promise<string>)[],
    after?: () => Promise<void>,
  }

  declare export type RouteInfo = {
    parameters?: ?RegExp$matchResult,
  }

  declare type I18nLanguage = string | { [key: string]: I18nLanguage }

  declare type I18nLanguagesSet = {
    [string]: I18nLanguage,
  }
}
