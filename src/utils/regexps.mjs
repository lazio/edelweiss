// @flow

export const eventListenerRegExp = /@([\w-]+)=['"]?$/
export const dataEventIdJSRegExp = /^eventId[\d]{1,}$/
export const customElementRegExp = /<([\w-]+)(:[\w]+)?=$/
export const styleAttributeRegExp = /style=['"]?[\w\s:;()-]*$/
export const booleanAttributeRegExp = /\?([\w-]+)=['"]?$/
