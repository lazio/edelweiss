export const eventListenerRegExp = /@([\w-]+)=['"]?$/;

export const dataEventIdJSRegExp = /^eventId[\d]{1,}$/;

export const booleanAttributeRegExp = /\?([\w-]+)=['"]?$/;

export const hookAttributeRegExp = /:(mounted|updated|removed)=$/;

export const pathVariableRegExp = /:.+:(\?)?/g;
