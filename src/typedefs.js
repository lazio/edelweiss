/**
 * Options that define parameters for creating **MTNode** object.
 *
 * *extend* is used while creating custom node {@link ./nodes/custom.js}. It is name of HTML tag or node instance that will be customized if you want it to be inherited from basic HTML element.
 * @typedef {{
 *  attributes?: { [key: string]: string|boolean|number },
 *  children?: string | import('./index').MTNode | import('./index').MTNode[],
 *  listeners?: MTNodeEventListener | MTNodeEventListener[],
 *  extend?: string | import('./index').MTNode
 * }} MTNodeOptions
 */

/**
 * Object that describe event listener consumed by **MTNode** object.
 * @typedef {{
 *  type: EventType,
 *  listener: EventListenerOrEventListenerObject
 * }} MTNodeEventListener
 */

/**
 * Defines all possible actions that trigger events.
 * @typedef { 'click' | 'input' | 'change' | 'keydown' | 'keyup' | 'focus' | 'resize' | 'keypress' | 'mousedown' | 'mouseup' | 'mouseenter' | 'mouseover' | 'mousemove' | 'dblclick' | 'mouseout' | 'mouseleave' | 'contextmenu' | 'load' | 'DOMContentLoaded' | 'afterprint' | 'animationcancel' | 'animationend' | 'appinstalled' | 'beforeinstallprompt' | 'beforeprint' | 'beforeunload' | 'blur' | 'cancel' | 'canplay' | 'canplaythrough' | 'cuechange' | 'devicemotion' | 'deviceorientation' | 'deviceorientationabsolute' | 'durationchange' | 'ended' | 'error' | 'gotpointercapture' | 'hashchange' | 'invalid' | 'loadeddata' | 'loadedmetadata' | 'loadend' | 'loadstart' | 'lostpointercapture' | 'message' | 'messageerror' | 'pause' | 'play' | 'pointercancel' | 'pointerdown' | 'pointerenter' | 'pointerleave' | 'pointermove' | 'pointerout' | 'pointerover' | 'pointerup' | 'popstate' | 'rejectionhandled' | 'reset' | 'scroll' | 'select' | 'storage' | 'submit' | 'transitioncancel' | 'transitionend' | 'unhandledrejection' | 'unload' | 'wheel' | 'toggle' } EventType
 */

/**
 * Define all possible types of **<input>**.
 * @typedef { 'button' | 'checkbox' | 'color' | 'date' | 'datetime-local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week' } InputType
 */

/**
 * Define target value for links.
 * @typedef { '_blank' | '_self' | '_parent' | '_top' } TargetType
 */
