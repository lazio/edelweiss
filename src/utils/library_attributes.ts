import { Hooks } from '../dom/hooks';

const HOOK_ID_PREFIX = 'data-hook-id-';
const EVENT_ID_PREFIX = 'data-event-id-';

export function createHookAttributeName(name: Hooks, eventId: number): string {
  return `${HOOK_ID_PREFIX}${name}-${eventId}`;
}

export function createEventIdAttributeName(eventId: number): string {
  return `${EVENT_ID_PREFIX}${eventId}`;
}

export function isLibraryAttribute(attributeName: string): boolean {
  return (
    attributeName.startsWith(HOOK_ID_PREFIX) ||
    attributeName.startsWith(EVENT_ID_PREFIX)
  );
}
