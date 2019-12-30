// @flow

declare module 'mountain-template' {
  declare export class MTNode {
    constructor(tag: string, options?: MTNodeOptions): MTNode;

    createElement(): HTMLElement;
  }

  declare export class Component {
    beforeBuild(): Promise<void>;
    build(): MTNode | MTNode[];
    afterBuild(): Promise<void>;
  }

  declare export class Router {
    current: Route | typeof undefined;

    constructor(routes: Route[]): Router;

    to(path: string): void;
  }

  declare export function createState<T: { [string]: any }>(
    object: T
  ): {
    state: Proxy<T>,
    on(listener: StateListener<T>): void,
  }

  declare export function render(
    to: string,
    nodes: string | MTNode | Component | (string | MTNode | Component)[]
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
    style: Styles,
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

  // Object that describe event listener consumed by **MTNode** object.
  declare export type MTNodeEventListener = {
    type: EventType,
    listener: EventListener,
  }

  declare export type MTNodeOptions = {
    attributes?: Attributes,
    children?: MTNode | Component | (MTNode | Component | string)[] | string,
    listeners?: MTNodeEventListener | MTNodeEventListener[],
    extend?: string | MTNode,
  }

  declare export type Route = {
    path: string,
    container: string,
    nodes: () => string | MTNode | Component | (string | MTNode | Component)[],
  }

  declare export type StateListener<T: { [string]: any }> = {
    to: string,
    fields: string[],
    update: (
      newState: T
    ) => string | Component | MTNode | (string | Component | MTNode)[],
  }
}
