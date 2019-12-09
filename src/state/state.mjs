// @flow

export type Target = { [string]: mixed }

export function makeState(
  object: Target,
  listener?: (newState: Target) => void
): Target {
  return new Proxy(object, {
    get(object: Target, field: string) {
      return Object.freeze(object[field])
    },
    set(object: Target, field: string, value: mixed) {
      object[field] = value
      if (listener) {
        listener(object)
      }
      return true
    }
  })
}
