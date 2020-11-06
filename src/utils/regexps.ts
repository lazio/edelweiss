export const eventListenerRegExp = /@([\w-]+)=$/;

export const dataEventIdJSRegExp = /^eventId-[\d]{1,}$/;

export const booleanAttributeRegExp = /\?([\w-]+)=$/;

export const hookAttributeRegExp = /:(mounted|updated|removed)=$/;

export const dataHookIdJSRegExp = /hookId(Mounted|Updated|Removed)-[\d]{1,}$/;

export const pathVariableRegExp = /:.+:(\?)?/g;

export const specialPropertiesRegExp = /\.(value)=$/;
