// @flow

declare module 'edelweiss' {
  declare export class ENode {
    constructor(tag: string, options?: ENodeOptions): ENode;

    createElement(): HTMLElement;
  }

  declare export class A extends ENode {
    constructor(href: string, options?: ENodeOptions): A;
  }

  declare export class Abbr extends ENode {
    constructor(title?: string, options?: ENodeOptions): Abbr;
  }

  declare export class Address extends ENode {
    constructor(options?: ENodeOptions): Address;
  }

  declare export class Area extends ENode {
    constructor(options?: ENodeOptions): Area;
  }

  declare export class Article extends ENode {
    constructor(options?: ENodeOptions): Article;
  }

  declare export class Aside extends ENode {
    constructor(options?: ENodeOptions): Aside;
  }

  declare export class Audio extends ENode {
    constructor(options?: ENodeOptions): Audio;
  }

  declare export class B extends ENode {
    constructor(options?: ENodeOptions): B;
  }

  declare export class Base extends ENode {
    constructor(
      href: string,
      target: ?TargetType,
      options?: ENodeOptions
    ): Base;
  }

  declare export class Bdi extends ENode {
    constructor(options?: ENodeOptions): Bdi;
  }

  declare export class Bdo extends ENode {
    constructor(options?: ENodeOptions): Bdo;
  }

  declare export class Blockquote extends ENode {
    constructor(cite: ?string, options?: ENodeOptions): Blockquote;
  }

  declare export class Body extends ENode {
    constructor(options?: ENodeOptions): Body;
  }

  declare export class Br extends ENode {
    constructor(): Br;
  }

  declare export class Button extends ENode {
    constructor(options?: ENodeOptions): Button;
  }

  declare export class Canvas extends ENode {
    constructor(options?: ENodeOptions): Canvas;
  }

  declare export class Caption extends ENode {
    constructor(options?: ENodeOptions): Caption;
  }

  declare export class Cite extends ENode {
    constructor(options?: ENodeOptions): Cite;
  }

  declare export class Code extends ENode {
    constructor(options?: ENodeOptions): Code;
  }

  declare export class Col extends ENode {
    constructor(options?: ENodeOptions): Col;
  }

  declare export class Colgroup extends ENode {
    constructor(options?: ENodeOptions): Colgroup;
  }

  declare export class Custom extends ENode {
    constructor(
      tag: string,
      constructor: Constructor,
      options?: ENodeOptions
    ): Custom;
  }

  declare export class Data extends ENode {
    constructor(value: string, options?: ENodeOptions): Data;
  }

  declare export class Datalist extends ENode {
    constructor(id: string, options?: ENodeOptions): Datalist;
  }

  declare export class Dd extends ENode {
    constructor(options?: ENodeOptions): Dd;
  }

  declare export class Del extends ENode {
    constructor(options?: ENodeOptions): Del;
  }

  declare export class Details extends ENode {
    constructor(open?: boolean, options?: ENodeOptions): Details;
  }

  declare export class Dfn extends ENode {
    constructor(options?: ENodeOptions): Dfn;
  }

  declare export class Dialog extends ENode {
    constructor(open?: boolean, options?: ENodeOptions): Dialog;
  }

  declare export class Div extends ENode {
    constructor(options?: ENodeOptions): Div;
  }

  declare export class Dl extends ENode {
    constructor(options?: ENodeOptions): Dl;
  }

  declare export class Dt extends ENode {
    constructor(options?: ENodeOptions): Dt;
  }

  declare export class Em extends ENode {
    constructor(options?: ENodeOptions): Em;
  }

  declare export class Embed extends ENode {
    constructor(options?: ENodeOptions): Embed;
  }

  declare export class Fieldset extends ENode {
    constructor(options?: ENodeOptions): Fieldset;
  }

  declare export class Figcaption extends ENode {
    constructor(options?: ENodeOptions): Figcaption;
  }

  declare export class Figure extends ENode {
    constructor(options?: ENodeOptions): Figure;
  }

  declare export class Footer extends ENode {
    constructor(options?: ENodeOptions): Footer;
  }

  declare export class Form extends ENode {
    constructor(action: ?string, method: ?FormMethod, options?: ENodeOptions): Form;
  }

  declare export class H extends ENode {
    constructor(importance: number, options?: ENodeOptions): H;
  }

  declare export class Head extends ENode {
    constructor(options?: ENodeOptions): Head;
  }

  declare export class Header extends ENode {
    constructor(options?: ENodeOptions): Header;
  }

  declare export class Hr extends ENode {
    constructor(options?: ENodeOptions): Hr;
  }

  declare export class Html extends ENode {
    constructor(options?: ENodeOptions): Html;
  }

  declare export class I extends ENode {
    constructor(options?: ENodeOptions): I;
  }

  declare export class Iframe extends ENode {
    constructor(options?: ENodeOptions): Iframe;
  }

  declare export class Img extends ENode {
    constructor(src: string, alt: string, options?: ENodeOptions): Img;
  }

  declare export class Input extends ENode {
    constructor(type: InputType, options?: ENodeOptions): Input;
  }

  declare export class Ins extends ENode {
    constructor(options?: ENodeOptions): Ins;
  }

  declare export class Kbd extends ENode {
    constructor(options?: ENodeOptions): Kbd;
  }

  declare export class Label extends ENode {
    constructor(options?: ENodeOptions): Label;
  }

  declare export class Legend extends ENode {
    constructor(options?: ENodeOptions): Legend;
  }

  declare export class Li extends ENode {
    constructor(options?: ENodeOptions): Li;
  }

  declare export class Link extends ENode {
    constructor(options?: ENodeOptions): Link;
  }

  declare export class Main extends ENode {
    constructor(options?: ENodeOptions): Main;
  }

  declare export class Span extends ENode {
    constructor(options?: ENodeOptions): Span;
  }

  declare export class Component {
    constructor(options?: ComponentOptions): Component;

    beforeBuild(): Promise<void>;
    build(): ENode | ENode[];
    afterBuild(): Promise<void>;
  }

  declare export class Router {
    current: Route | void;

    constructor(routes: Route[]): Router;

    to(path: string): Promise<void>;
    reload(): Promise<void>;
    back(): void;
    forward(): void;
  }

  declare export function createState<T: { [string]: any }>(
    object: T
  ): {
    state: T,
    onChange: (listener: StateListener<T>) => void,
  }

  declare export function render(
    to: string,
    nodes: string | ENode | Component | (string | ENode | Component)[]
  ): Promise<void>

  declare export type InputType =
    | 'button'
    | 'checkbox'
    | 'color'
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'file'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'radio'
    | 'range'
    | 'reset'
    | 'search'
    | 'submit'
    | 'tel'
    | 'text'
    | 'time'
    | 'url'
    | 'week'

  /**
   * Define target value for links.
   */
  declare export type TargetType = '_blank' | '_self' | '_parent' | '_top'

  declare export type Styles = { [string]: number | string } | string

  declare export type Attributes = {
    style?: Styles,
    class?: string,
    [string]: string | boolean | number,
  }

  // Defines all possible actions that trigger events.
  declare export type EventType =
    | 'click'
    | 'input'
    | 'change'
    | 'keydown'
    | 'keyup'
    | 'focus'
    | 'resize'
    | 'keypress'
    | 'mousedown'
    | 'mouseup'
    | 'mouseenter'
    | 'mouseover'
    | 'mousemove'
    | 'dblclick'
    | 'mouseout'
    | 'mouseleave'
    | 'contextmenu'
    | 'load'
    | 'DOMContentLoaded'
    | 'afterprint'
    | 'animationcancel'
    | 'animationend'
    | 'appinstalled'
    | 'beforeinstallprompt'
    | 'beforeprint'
    | 'beforeunload'
    | 'blur'
    | 'cancel'
    | 'canplay'
    | 'canplaythrough'
    | 'cuechange'
    | 'devicemotion'
    | 'deviceorientation'
    | 'deviceorientationabsolute'
    | 'durationchange'
    | 'ended'
    | 'error'
    | 'gotpointercapture'
    | 'hashchange'
    | 'invalid'
    | 'loadeddata'
    | 'loadedmetadata'
    | 'loadend'
    | 'loadstart'
    | 'lostpointercapture'
    | 'message'
    | 'messageerror'
    | 'pause'
    | 'play'
    | 'pointercancel'
    | 'pointerdown'
    | 'pointerenter'
    | 'pointerleave'
    | 'pointermove'
    | 'pointerout'
    | 'pointerover'
    | 'pointerup'
    | 'popstate'
    | 'rejectionhandled'
    | 'reset'
    | 'scroll'
    | 'select'
    | 'storage'
    | 'submit'
    | 'transitioncancel'
    | 'transitionend'
    | 'unhandledrejection'
    | 'unload'
    | 'wheel'
    | 'toggle'

  // Object that describe event listener consumed by **ENode** object.
  declare export type ENodeEventListener = {
    type: EventType,
    listener: EventListener,
  }

  declare export type ENodeOptions = {
    attributes?: Attributes,
    children?: ENode | Component | (ENode | Component | string)[] | string,
    listeners?: ENodeEventListener | ENodeEventListener[],
    extend?: string | ENode,
  }

  declare export type Route = {
    path: string,
    container: string,
    view: () => string | ENode | Component | (string | ENode | Component)[],
  }

  declare export type StateListener<T: { [string]: any }> = {
    to?: string,
    fields: string[],
    reactiveAttributes?: $Keys<Attributes>[],
    update: (newStateContainer: {
      state: T,
      onChange: (listener: StateListener<T>) => void,
    }) => string | Component | ENode | (string | Component | ENode)[] | void,
  }

  declare type ComponentOptions = {
    css?: string | string[],
  }

  declare type Constructor = Class<Element>

  declare type FormMethod = 'post' | 'get' | 'dialog'
}
