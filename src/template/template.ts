import Component from '../component/component';
import { uid } from '../utils/uid';
import { warn } from '../utils/warn';
import { registerCustomElement } from './custom_element';
import { just, freeze, promiseOf, isNothing } from '@fluss/core';
import {
  eventListenerRegExp,
  customElementRegExp,
  hookAttributeRegExp,
  booleanAttributeRegExp,
} from '../utils/regexps';

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
      let listener = variable;

      if (typeof listener !== 'function' && isNothing(listener.handleEvent)) {
        warn(`Event listener must be type of "function" or object with
  "handleEvent" method, but given "${typeof listener}".`);
        listener = () => {};
      }

      const eventId = uid();
      eventListenersMap.set(eventId, {
        [matchedElementEventListener[1]]: listener,
      });

      return current.replace(
        matchedElementEventListener[0],
        `data-event-id${index}="${eventId}"`
      );
    }

    // Handle ?attribute
    const matchBooleanAttribute = booleanAttributeRegExp.exec(current);
    if (!isNothing(matchBooleanAttribute)) {
      /**
       * It accepts all values and check if it is falsy or truthy.
       * There are 7 falsy values in JS: [values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
       */
      return current.replace(
        matchBooleanAttribute[0],
        variable ? matchBooleanAttribute[1] : ''
      );
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
      if (Element.isPrototypeOf(variable)) {
        registerCustomElement(matchCustomElement, variable);

        return current.replace(
          customElementRegExp,
          // Get rid of hyphens as start or end symbol of tag name.
          `<${matchCustomElement[1]}`.replace(/^<-(.+)-$/, '<$1')
        );
      } else {
        warn(
          `You must pass a class constructor to custom element ${matchCustomElement[1]}. But given ->` +
            `"${variable}"`
        );
        return '';
      }
    }

    return current + variable;
  });
}

/** Extract template from `Component`. */
function buildMaybeComponent<T>(variable: T | Component): T | Promise<string> {
  return variable instanceof Component ? variable._createNodes() : variable;
}
