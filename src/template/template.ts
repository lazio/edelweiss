import Component from '../component/component';
import { uid } from '../utils/uid';
import { warn } from '../utils/warn';
import { registerCustomElement } from './custom_element';
import {
  eventListenerRegExp,
  customElementRegExp,
  hookAttributeRegExp,
  booleanAttributeRegExp,
} from '../utils/regexps';
import { just, maybeOf, promiseOf, isNothing, freeze } from '@fluss/core';

/**
 * Holds all listeners that will be attached to element.
 * Elements are marked with event ids.
 */
export const eventListenersMap = new Map<
  string,
  {
    [eventName: string]: EventListenerOrEventListenerObject;
  }
>();

/** Hooks are defined in order they have been executed in element's lifecycle. */
export enum Hooks {
  Mounted = 'mounted',
  Rendered = 'rendered',
  Updated = 'updated',
  Removed = 'removed',
}

type HookCallback = (self: Element) => void | Promise<void>;

/** Holds callbacks for every element's hooks. */
export const hooksManager = freeze({
  [Hooks.Mounted]: new Map<string, HookCallback>(),
  [Hooks.Rendered]: new Map<string, HookCallback>(),
  [Hooks.Updated]: new Map<string, HookCallback>(),
  [Hooks.Removed]: new Map<string, HookCallback>(),
});

export async function html(
  parts: TemplateStringsArray,
  ...variables: Array<any>
): Promise<string> {
  return parts.reduce((previous, current, index) => {
    return !isNothing(variables[index])
      ? just(variables[index])
          // Wrap variable into Promise
          .map(promiseOf)
          .map((promiseWithVariable) =>
            // Gets template from Component
            promiseWithVariable.then((variable) =>
              buildMaybeComponent(variable)
            )
          )
          .map((promiseWithVariable) =>
            /**
             * Variable may be an Array that contains string, Promise<string> and Component,
             * so we must wait for resolving it and then return result. We do not handle other
             * objects.
             * Also we prevent from inseting commas into template.
             */
            promiseWithVariable.then((variable) =>
              Array.isArray(variable)
                ? Promise.all(
                    variable.map((maybeComponent) =>
                      buildMaybeComponent(maybeComponent)
                    )
                  ).then((all) => all.join(''))
                : variable
            )
          )
          .map((promiseWithVariable) =>
            // Consume current part with previous part
            previous.then((textHTML) =>
              formCurrentHTML(promiseWithVariable, current, index).then(
                (currentHTML) => textHTML + currentHTML
              )
            )
          )
          .extract()
      : // End of template
        previous.then((prevHtml) => prevHtml + current);
  }, promiseOf(''));
}

function formCurrentHTML(
  promiseWithVariable: Promise<any>,
  current: string,
  index: number
): Promise<string> {
  return promiseWithVariable.then((variable) => {
    // Handle @event listener if there is any.
    const matchedElementEventListener = eventListenerRegExp.exec(current);
    if (!isNothing(matchedElementEventListener)) {
      return maybeOf(matchedElementEventListener)
        .map((eventListener) => {
          if (typeof variable !== 'function' && !variable.handleEvent) {
            throw new Error(`Event listener must be type of "function" or object with
      "handleEvent" method, but given "${typeof variable}".`);
          }

          const eventId = uid();
          eventListenersMap.set(eventId, {
            [eventListener[1]]: variable,
          });

          return current.replace(
            eventListener[0],
            `data-event-id${index}="${eventId}"`
          );
        })
        .extract();
    }

    // Handle ?attribute
    const matchBooleanAttribute = booleanAttributeRegExp.exec(current);
    if (!isNothing(matchBooleanAttribute)) {
      return just(matchBooleanAttribute)
        .map((booleanAttribute) => {
          /**
           * It accepts all values and check if it is falsy or truthy.
           * There are 7 falsy values in JS: [values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
           */
          return current.replace(
            booleanAttribute[0],
            variable ? booleanAttribute[1] : ''
          );
        })
        .extract();
    }

    /**
     * Handle hook attribute.
     * It is placed before customElement RegExp matcher,
     * because it has similar pattern. And Hook RegExp is
     * more concrete.
     */
    const matchHookAttribute = hookAttributeRegExp.exec(current);
    if (!isNothing(matchHookAttribute)) {
      const dataHookId = uid();
      /**
       * matchHookAttribute can contain only hook keywords, so we can not
       * check its value.
       */
      const hookName = matchHookAttribute[1] as Hooks;

      hooksManager[hookName].set(dataHookId, variable);

      return current.replace(
        hookAttributeRegExp,
        `data-${hookName}-hook-id="${dataHookId}"`
      );
    }

    // Handle custom element in html
    const matchCustomElement = customElementRegExp.exec(current);
    if (!isNothing(matchCustomElement)) {
      return just(matchCustomElement)
        .map((customElementMatch) => {
          if (Element.isPrototypeOf(variable)) {
            registerCustomElement(customElementMatch, variable);
            return current.replace(
              customElementRegExp,
              // Get rid of hyphens as start or end symbol of tag name.
              `<${customElementMatch[1]}`.replace(/^<-(.+)-$/, '<$1')
            );
          } else {
            warn(
              `You must pass a class constructor to custom element ${customElementMatch[1]}. But given ->` +
                `"${variable}"`
            );
            return '';
          }
        })
        .extract();
    }

    return current + variable;
  });
}

/** Extract template from `Component`. */
function buildMaybeComponent<T>(variable: T | Component): T | Promise<string> {
  return variable instanceof Component ? variable._createNodes() : variable;
}
