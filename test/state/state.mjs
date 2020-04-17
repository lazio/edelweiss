/* eslint-disable import/no-absolute-path */

import {
  group,
  test,
  expect,
} from '/node_modules/@prostory/baum/dist/index.mjs'

import { createState } from '../../dist/index.mjs'

const testState = createState({ clicks: 0 })

group('Tests for state', () => [
  test('Getting from state value', () => {
    expect(testState.clicks).toEqual(0)
  }),

  test('Setting new value to state', () => {
    try {
      testState.clicks++
    } catch (error) {
      // Internally Router.reload is invoked, but Router does not configured
      // at that moment, so error will be printed to console.
      expect(testState.clicks).toEqual(1)
    }
  }),

  test('Deleting property from state', () => {
    try {
      delete testState.clicks
    } catch (error) {
      // Internally Router.reload is invoked, but Router does not configured
      // at that moment, so error will be printed to console.
      expect(testState.clicks).toBe('undefined')
    }
  }),
])
