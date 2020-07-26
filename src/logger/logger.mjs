// @flow

import LEVELS from './levels.mjs'

export function log(message: string, level?: $Values<typeof LEVELS> = LEVELS.ERROR): void {
  switch (level) {
    case LEVELS.WARNING:
      console.warn(message)
      break
    case LEVELS.ERROR:
      console.error(message)
      break
    default:
      console.log(message)
  }
}