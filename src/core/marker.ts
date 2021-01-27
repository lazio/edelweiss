import { uid } from './utilities/uid';
import { createComment } from './utilities/create_comment';

/** Base class for markers. */
export interface Marker {
  readonly id: number;
  readonly value: unknown;

  toString(): string;
}

export class AttributeMarker implements Marker {
  readonly id: number = uid();

  constructor(readonly value: unknown) {}

  toString(): string {
    return `{{${this.id}}}`;
  }
}

export class NodeMarker implements Marker {
  readonly id: number = uid();

  constructor(readonly value: unknown) {}

  toString(): string {
    // Here we just define place for nodes.
    return createComment(`{{${this.id}}}`);
  }
}

export let markers: Array<Marker> = [];

export function removeMarker(marker: Marker): void {
  markers = markers.filter((item) => item !== marker);
}
