// @flow

declare module 'edelweiss' {
  declare export class ENode {
    constructor(tag: string, options?: ENodeOptions): ENode;

    createElement(): HTMLElement;
  }

  declare export class Component {
    beforeBuild(): Promise<void>;
    build(): ENode | ENode[];
    afterBuild(): Promise<void>;
  }

  declare export class Router {
    current: Route | void;

    constructor(routes: Route[]): Router;

    to(path: string): void;
  }

  declare export function createState<T: { [string]: any }>(
    object: T
  ): {
    state: Proxy<T>,
    listen(listener: StateListener<T>): void,
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
    to: string,
    fields: string[],
    update: (
      newState: T
    ) => string | Component | ENode | (string | Component | ENode)[],
  }
}
