import MTNode from './mtn'

/**
 * Construct **<template>** node with specific options.
 */
export default class Template extends MTNode {
  /**
   * @param {MTNodeOptions} [options]
   */
  constructor(options) {
    super('template', options)
  }
}
