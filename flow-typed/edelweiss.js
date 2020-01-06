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
    constructor(
      action: ?string,
      method: ?FormMethod,
      options?: ENodeOptions
    ): Form;
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

  declare export class Map extends ENode {
    constructor(name: string, options?: ENodeOptions): Map;
  }

  declare export class Mark extends ENode {
    constructor(options?: ENodeOptions): Mark;
  }

  declare export class Meta extends ENode {
    constructor(options?: ENodeOptions): Meta;
  }

  declare export class Meter extends ENode {
    constructor(options?: ENodeOptions): Meter;
  }

  declare export class Nav extends ENode {
    constructor(options?: ENodeOptions): Nav;
  }

  declare export class NoScript extends ENode {
    constructor(options?: ENodeOptions): NoScript;
  }

  declare export class Object extends ENode {
    constructor(options?: ENodeOptions): Object;
  }

  declare export class Ol extends ENode {
    constructor(options?: ENodeOptions): Ol;
  }

  declare export class OptGroup extends ENode {
    constructor(
      label: string,
      disabled: ?boolean,
      options?: ENodeOptions
    ): OptGroup;
  }

  declare export class Option extends ENode {
    constructor(options?: ENodeOptions): Option;
  }

  declare export class Output extends ENode {
    constructor(options?: ENodeOptions): Output;
  }

  declare export class P extends ENode {
    constructor(options?: ENodeOptions): P;
  }

  declare export class Param extends ENode {
    constructor(name: string, value: string, options?: ENodeOptions): Param;
  }

  declare export class Picture extends ENode {
    constructor(options?: ENodeOptions): Picture;
  }

  declare export class Pre extends ENode {
    constructor(options?: ENodeOptions): Pre;
  }

  declare export class Progress extends ENode {
    constructor(value: number, max: ?number, options?: ENodeOptions): Progress;
  }

  declare export class Q extends ENode {
    constructor(cite: string, options?: ENodeOptions): Q;
  }

  declare export class Rp extends ENode {
    constructor(options?: ENodeOptions): Rp;
  }

  declare export class Rt extends ENode {
    constructor(options?: ENodeOptions): Rt;
  }

  declare export class Rtc extends ENode {
    constructor(options?: ENodeOptions): Rtc;
  }

  declare export class Ruby extends ENode {
    constructor(options?: ENodeOptions): Ruby;
  }

  declare export class S extends ENode {
    constructor(options?: ENodeOptions): S;
  }

  declare export class Samp extends ENode {
    constructor(options?: ENodeOptions): Samp;
  }

  declare export class Script extends ENode {
    constructor(src: ?string, options?: ENodeOptions): Script;
  }

  declare export class Section extends ENode {
    constructor(options?: ENodeOptions): Section;
  }

  declare export class Select extends ENode {
    constructor(options?: ENodeOptions): Select;
  }

  declare export class Slot extends ENode {
    constructor(name: string, options?: ENodeOptions): Slot;
  }

  declare export class Small extends ENode {
    constructor(options?: ENodeOptions): Small;
  }

  declare export class Source extends ENode {
    constructor(options?: ENodeOptions): Source;
  }

  declare export class Span extends ENode {
    constructor(options?: ENodeOptions): Span;
  }

  declare export class Strong extends ENode {
    constructor(options?: ENodeOptions): Strong;
  }

  declare export class Style extends ENode {
    constructor(options?: ENodeOptions): Style;
  }

  declare export class Sub extends ENode {
    constructor(options?: ENodeOptions): Sub;
  }

  declare export class Summary extends ENode {
    constructor(options?: ENodeOptions): Summary;
  }

  declare export class Sup extends ENode {
    constructor(options?: ENodeOptions): Sup;
  }

  declare export class Table extends ENode {
    constructor(options?: ENodeOptions): Table;
  }

  declare export class TBody extends ENode {
    constructor(options?: ENodeOptions): TBody;
  }

  declare export class Td extends ENode {
    constructor(options?: ENodeOptions): Td;
  }

  declare export class Template extends ENode {
    constructor(options?: ENodeOptions): Template;
  }

  declare export class TextArea extends ENode {
    constructor(options?: ENodeOptions): TextArea;
  }

  declare export class TFoot extends ENode {
    constructor(options?: ENodeOptions): TFoot;
  }

  declare export class Th extends ENode {
    constructor(options?: ENodeOptions): Th;
  }

  declare export class THead extends ENode {
    constructor(options?: ENodeOptions): THead;
  }

  declare export class Time extends ENode {
    constructor(datetime: ?string, options?: ENodeOptions): Time;
  }

  declare export class Title extends ENode {
    constructor(options?: ENodeOptions): Title;
  }

  declare export class Tr extends ENode {
    constructor(options?: ENodeOptions): Tr;
  }

  declare export class Track extends ENode {
    constructor(options?: ENodeOptions): Track;
  }

  declare export class U extends ENode {
    constructor(options?: ENodeOptions): U;
  }

  declare export class Ul extends ENode {
    constructor(options?: ENodeOptions): Ul;
  }

  declare export class Var extends ENode {
    constructor(options?: ENodeOptions): Var;
  }

  declare export class Video extends ENode {
    constructor(options?: ENodeOptions): Video;
  }

  declare export class Wbr extends ENode {
    constructor(options?: ENodeOptions): Wbr;
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
