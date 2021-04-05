import { uid } from './utilities/uid';
import { createComment } from './utilities/create_comment';

/** Base class for markers. */
export interface Marker {
  readonly _id: string;
  readonly value: unknown;

  toString(): string;
}

export class AttributeMarker implements Marker {
  readonly _id: string = uid();

  constructor(readonly value: unknown) {}

  toString(): string {
    return `{{${this._id}}}`;
  }
}

export class NodeMarker implements Marker {
  readonly _id: string = uid();

  constructor(readonly value: unknown) {}

  toString(): string {
    // Here we just define place for nodes.
    return createComment(`{{${this._id}}}`);
  }
}

export let markers: Array<Marker> = [];

export const removeMarker = (marker: Marker): void => {
  markers = markers.filter((item) => item !== marker);
};
