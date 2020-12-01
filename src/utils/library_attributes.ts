const HOOK_ID_PREFIX = 'data-hook-id-';
const EVENT_ID_PREFIX = 'data-event-id-';

/** Hooks are defined in order they have been executed in element's lifecycle. */
export enum Hooks {
  Mounted = 'mounted',
  Updated = 'updated',
  Removed = 'removed',
}

export function createHookAttributeName(name: Hooks, eventId: number): string {
  return `${HOOK_ID_PREFIX}${name}-${eventId}`;
}

export function createEventIdAttributeName(eventId: number): string {
  return `${EVENT_ID_PREFIX}${eventId}`;
}

export function isLibraryAttribute(attributeName: string): boolean {
  return isHookAttribute(attributeName) || isEventAttribute(attributeName);
}

export function isHookAttribute(attributeName: string): boolean {
  return attributeName.startsWith(HOOK_ID_PREFIX);
}

export function isEventAttribute(attributeName: string): boolean {
  return attributeName.startsWith(EVENT_ID_PREFIX);
}
