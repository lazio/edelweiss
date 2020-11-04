/**
 * Need for distinguish between diffing elements inside one page and
 * between two different pages.
 */
export let _isRouteChanged: boolean = false;

export function setIsRouteChangedMarker(value: boolean): void {
  _isRouteChanged = value;
}
