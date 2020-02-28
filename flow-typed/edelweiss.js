// @flow

declare module '/node_modules/@prostory/edelweiss/dist/index.mjs' {
  declare export class Component {
    constructor(options?: ComponentOptions): Component;

    beforeBuild(): void;
    template(): string;
    afterBuild(): void;
  }

  declare export class Router {
    static +current: Route | void;

    static add(routes: Route | Route[]): void;
    static to(path: string): void;
    static reload(): void;
    static back(): void;
    static forward(): void;
  }

  declare export class I18n {
    static +currentLanguage: string;

    static add(languages: I18nLanguagesSet, initial?: string): void;
    static setLanguage(tag: string): void;
    static translate(path: string, variables?: { [string]: string }): string;
    static get languagesTags(): string[];
  }

  declare export function createState<T: { [string]: any }>(object: T): T

  declare export function html(parts: string[], ...variables: []): string;

  declare export type Styles = { [string]: number | string } | string

  declare export type Route = {
    path: string | RegExp,
    container: string,
    view: () => string | Component | (string | Component)[],
  }

  declare type CssDeclaration =
    | string
    | { relativeTo: string, cssFilePath: string }

  declare type ComponentOptions = {
    css?: CssDeclaration | CssDeclaration[],
  }

  declare type I18nLanguage = string | { [string]: I18nLanguage }

  declare type I18nLanguagesSet = {
    [string]: I18nLanguage,
  }
}
