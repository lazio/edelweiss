import Component from '../component/component';
import { uid } from '../utils/uid';
import { warn } from '../utils/warn';
import { registerCustomElement } from './custom_element';
import {
  eventListenerRegExp,
  customElementRegExp,
  booleanAttributeRegExp,
} from '../utils/regexps';
import {
  just,
  reduce,
  maybeOf,
  resolve,
  isArray,
  isNothing,
} from '@fluss/core';

/**
 * Holds all listeners that will be attached to element.
 * Elements are marked with event ids.
 */
export const eventListenersMap = new Map<
  string,
  {
    // Name of the event: event listener
    // eslint-disable-next-line func-call-spacing
    [key: string]:
      | ((event: Event) => void)
      | { handleEvent: (event: Event) => void };
  }
>();

export async function html(
  parts: TemplateStringsArray,
  ...variables: Array<any>
): Promise<string> {
  return reduce(
    parts,
    (previous, current, index) => {
      return !isNothing(variables[index])
        ? just(variables[index])
            // Wrap variable into Promise
            .map(resolve)
            .map((promiseWithVariable) =>
              // Gets template from Component
              promiseWithVariable.then((variable) =>
                variable instanceof Component
                  ? variable._createNodes()
                  : variable
              )
            )
            .map((promiseWithVariable) =>
              /**
               * Variable may be an Array that contains Promise, so we must wait for resolving
               * it and then return result. Also we prevent from inseting commas into template.
               */
              promiseWithVariable.then((variable) =>
                isArray(variable)
                  ? Promise.all(variable).then((all) => all.join(''))
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
    },
    Promise.resolve('')
  );
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
            `data-event-id${index}="${eventId}"` // eventsInElement++
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

    // Handle custom element in html
    const matchCustomElement = customElementRegExp.exec(current);
    if (!isNothing(matchCustomElement)) {
      return just(matchCustomElement)
        .map((customElementMatch) => {
          // eslint-disable-next-line no-prototype-builtins
          if (Element.isPrototypeOf(variable)) {
            // $FlowFixMe - we already check for Class.
            registerCustomElement(customElementMatch, variable);
            return current.replace(
              customElementRegExp,
              // Get rid of hyphens as start or end symbol of tag name.
              `<${customElementMatch[1]}`.replace(/^<-(.+)-$/, '<$1')
            );
          } else {
            warn(
              `You must pass a class constructor to custom element ${customElementMatch[1]}. But given ->` +
                // $FlowFixMe
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
