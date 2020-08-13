/* eslint-disable import/no-absolute-path */
// @flow

import {
  test,
  group,
  expect,
} from '@prostory/baum'

import { Router } from '../../dist/index.mjs'

group('Test "Router"', () => {
  return [
    test('"Router.current" before "Router.to" must to have empty values in "path" and "view()"', () => {
      expect(Router.current.path).toEqual('')
      expect(Router.current.view()).toEqual('')
    }),

    test('"Router.to" before "Router.add" must throw and Error', () => {
      expect(() => Router.to('/')).toThrow()
    }),

    test('"Router.reload" before "Router.add" must throw and Error', () => {
      expect(() => Router.reload()).toThrow()
    }),

    test('"Router.to" must use global "container" if there is not local one', () => {
      Router.container = '.page '
      Router.add([
        {
          path: '/',
          view() {
            return 'Start'
          },
        },
        {
          path: '/test',
          view() {
            return 'Test'
          },
        },
        {
          path: '/not-found',
          container: '.no-element',
          view() {
            return 'No such element'
          },
        },
      ])

      expect(() => Router.to('/test')).not.toThrow()
    }),

    test('"Router.to" must update "container" element with children that returns from "Route.view()"', async () => {
      await Router.to('/test')

      const container = document.querySelector('.page')

      if (container) {
        const child = container.innerText
        expect(child).toMatch('Test')
      }
    }),

    test('"Router.to" must throw an error if container is not exist', () => {
      expect(() => Router.to('/not-found')).toThrow()
    }),
  ]
})
