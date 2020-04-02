// @flow

declare module '/node_modules/@prostory/edelweiss/dist/index.mjs' {
  declare export class Component {
    constructor(options?: ComponentOptions): Component;

    beforeBuild(): Promise<void>;
    template(): Promise<string>;
    afterBuild(): Promise<void>;
  }

  declare export class Router {
    static get current(): {
      path: string | RegExp,
      container?: string,
      view: () => string | Component | (string | Component)[],
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
    static translate(path: string, variables?: { [string]: string }): string;
  }

  declare export function createState<T: { [string]: any }>(object: T): T

  declare export function html(
    parts: string[],
    ...variables: mixed[]
  ): Promise<string>

  declare export function customElement(
    tag: string,
    constructor: Class<Element>,
    extend?: string
  ): void

  declare export function registerCss(css: string | string[]): void

  declare export type Styles = { [string]: number | string } | string

  declare export type Route = {
    path: string | RegExp,
    container?: string,
    view: () => string | Component | (string | Component)[],
  }

  declare export type RouteInfo = {
    parameters?: ?RegExp$matchResult,
  }

  declare type ComponentOptions = {
    css?: string | string[],
  }

  declare type I18nLanguage = string | { [string]: I18nLanguage }

  declare type I18nLanguagesSet = {
    [string]: I18nLanguage,
  }
}
