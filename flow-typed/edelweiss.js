// @flow

declare module '@prostory/edelweiss' {
  declare export class ENode {
    constructor(tag: string, options?: ENodeOptions): ENode;

    createElement(): HTMLElement;
  }

  declare export class A extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): A;
  }

  declare export class Abbr extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Abbr;
  }

  declare export class Address extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Address;
  }

  declare export class Area extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Area;
  }

  declare export class Article extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Article;
  }

  declare export class Aside extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Aside;
  }

  declare export class Audio extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Audio;
  }

  declare export class B extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): B;
  }

  declare export class Base extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Base;
  }

  declare export class Bdi extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Bdi;
  }

  declare export class Bdo extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Bdo;
  }

  declare export class Blockquote extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Blockquote;
  }

  declare export class Body extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Body;
  }

  declare export class Br extends ENode {
    constructor(): Br;
  }

  declare export class Button extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Button;
  }

  declare export class Canvas extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Canvas;
  }

  declare export class Caption extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Caption;
  }

  declare export class Cite extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Cite;
  }

  declare export class Code extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Code;
  }

  declare export class Col extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Col;
  }

  declare export class Colgroup extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Colgroup;
  }

  declare export class Custom extends ENode {
    constructor(
      tag: string,
      constructor: Constructor,
      options?: ENodeOptions
    ): Custom;
  }

  declare export class Data extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Data;
  }

  declare export class Datalist extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Datalist;
  }

  declare export class Dd extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Dd;
  }

  declare export class Del extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Del;
  }

  declare export class Details extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Details;
  }

  declare export class Dfn extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Dfn;
  }

  declare export class Dialog extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Dialog;
  }

  declare export class Div extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Div;
  }

  declare export class Dl extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Dl;
  }

  declare export class Dt extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Dt;
  }

  declare export class Em extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Em;
  }

  declare export class Embed extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Embed;
  }

  declare export class Fieldset extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Fieldset;
  }

  declare export class Figcaption extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Figcaption;
  }

  declare export class Figure extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Figure;
  }

  declare export class Footer extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Footer;
  }

  declare export class Form extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Form;
  }

  declare export class H1 extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): H1;
  }

  declare export class H2 extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): H2;
  }

  declare export class H3 extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): H3;
  }

  declare export class H4 extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): H4;
  }

  declare export class H5 extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): H5;
  }

  declare export class H6 extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): H6;
  }

  declare export class Head extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Head;
  }

  declare export class Header extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Header;
  }

  declare export class Hr extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Hr;
  }

  declare export class Html extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Html;
  }

  declare export class I extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): I;
  }

  declare export class Iframe extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Iframe;
  }

  declare export class Img extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Img;
  }

  declare export class Input extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Input;
  }

  declare export class Ins extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Ins;
  }

  declare export class Kbd extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Kbd;
  }

  declare export class Label extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Label;
  }

  declare export class Legend extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Legend;
  }

  declare export class Li extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Li;
  }

  declare export class Link extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Link;
  }

  declare export class Main extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Main;
  }

  declare export class Map extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Map;
  }

  declare export class Mark extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Mark;
  }

  declare export class Meta extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Meta;
  }

  declare export class Meter extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Meter;
  }

  declare export class Nav extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Nav;
  }

  declare export class NoScript extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): NoScript;
  }

  declare export class Object extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Object;
  }

  declare export class Ol extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Ol;
  }

  declare export class OptGroup extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): OptGroup;
  }

  declare export class Option extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Option;
  }

  declare export class Output extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Output;
  }

  declare export class P extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): P;
  }

  declare export class Param extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Param;
  }

  declare export class Picture extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Picture;
  }

  declare export class Pre extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Pre;
  }

  declare export class Progress extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Progress;
  }

  declare export class Q extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Q;
  }

  declare export class Rp extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Rp;
  }

  declare export class Rt extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Rt;
  }

  declare export class Rtc extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Rtc;
  }

  declare export class Ruby extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Ruby;
  }

  declare export class S extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): S;
  }

  declare export class Samp extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Samp;
  }

  declare export class Script extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Script;
  }

  declare export class Section extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Section;
  }

  declare export class Select extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Select;
  }

  declare export class Slot extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Slot;
  }

  declare export class Small extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Small;
  }

  declare export class Source extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Source;
  }

  declare export class Span extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Span;
  }

  declare export class Strong extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Strong;
  }

  declare export class Style extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Style;
  }

  declare export class Sub extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Sub;
  }

  declare export class Summary extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Summary;
  }

  declare export class Sup extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Sup;
  }

  declare export class Table extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Table;
  }

  declare export class TBody extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): TBody;
  }

  declare export class Td extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Td;
  }

  declare export class Template extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Template;
  }

  declare export class TextArea extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): TextArea;
  }

  declare export class TFoot extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): TFoot;
  }

  declare export class Th extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Th;
  }

  declare export class THead extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): THead;
  }

  declare export class Time extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Time;
  }

  declare export class Title extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Title;
  }

  declare export class Tr extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Tr;
  }

  declare export class Track extends ENode {
    constructor(
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Track;
  }

  declare export class U extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): U;
  }

  declare export class Ul extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Ul;
  }

  declare export class Var extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Var;
  }

  declare export class Video extends ENode {
    constructor(
      children?: Nodes,
      attributes?: Attributes,
      listeners?: ENodeEventListenersObject
    ): Video;
  }

  declare export class Wbr extends ENode {
    constructor(attributes?: Attributes): Wbr;
  }

  declare export class Component {
    constructor(options?: ComponentOptions): Component;

    beforeBuild(): void;
    build(): string | ENode | Component | (string | ENode | Component)[];
    afterBuild(): void;
  }

  declare export class Router {
    current: Route | void;

    constructor(routes: Route[]): Router;

    to(path: string): void;
    reload(): void;
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
  ): void

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
    target?: TargetType,
    method?: FormMethod,
    type?: InputType,
    name?: string,
    label?: string,
    disabled?: boolean,
    value?: string | number,
    max?: number,
    cite?: string,
    src?: string,
    alt?: string,
    datetime?: string,
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
  declare export type ENodeEventListenersObject = {
    [type: EventType]: EventListener,
  }

  declare export type Nodes =
    | string
    | ENode
    | Component
    | (string | ENode | Component)[]

  declare export type ENodeOptions = {
    attributes?: Attributes,
    children?: Nodes,
    listeners?: ENodeEventListenersObject,
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
    update: (
      state: T
    ) => string | Component | ENode | (string | Component | ENode)[] | void,
  }

  declare type CssDeclaration =
    | string
    | { relativeTo: string, cssFilePath: string }

  declare type ComponentOptions = {
    css?: CssDeclaration | CssDeclaration[],
  }

  declare type Constructor = Class<Element>

  declare type FormMethod = 'post' | 'get' | 'dialog'
}
