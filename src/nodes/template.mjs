// @flow

import type { ENodeOptions } from './en.mjs'

import ENode from './en.mjs'

/**
 * Construct **<template>** node with specific options.
 */
export default class Template extends ENode {
  constructor(options?: ENodeOptions) {
    super('template', options)
  }
}
