// @flow

import type { MTNodeOptions } from './mtn.mjs'

import MTNode from './mtn.mjs'

/**
 * Construct **<template>** node with specific options.
 */
export default class Template extends MTNode {
  constructor(options?: MTNodeOptions) {
    super('template', options)
  }
}
