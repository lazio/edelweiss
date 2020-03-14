/* eslint-disable import/no-absolute-path */
// @flow

import {
  group,
  test,
  expect,
} from '/node_modules/@prostory/baum/dist/index.mjs'

import { Router } from '../../dist/index.mjs'

group('Test "Router"', () => {
  test('"Router.current" before "Router.to" must to have empty values in "path" and "view()"', () => {
    expect(Router.current.path).toEqual('')
    expect(Router.current.view()).toEqual('')
  })

  test('"Router.to" before "Router.add" must throw and Error', async () => {
    await expect(Router.to('/')).toBeRejected()
  })

  test('"Router.reload" before "Router.add" must throw and Error', async () => {
    await expect(Router.reload()).toBeRejected()
  })

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

  test('"Router.to" must update "window.location", "window.history"', async () => {
    await Router.to('/test')

    expect(window.location.pathname).toMatch('/test')
    expect(window.history.state.path).toMatch('/test')
    expect(window.history.state.container).toMatch('.page')

    await Router.to('/')
  })

  test('"Router.to" must use global "container" if there is not local one', async () => {
    await expect(Router.to('/test')).toBeResolved()

    await Router.to('/')
  })

  test('"Router.to" must update "container" element with children that returns from "Route.view()"', async () => {
    await Router.to('/test')

    const container = document.querySelector('.page')

    if (container) {
      const child = container.innerText
      expect(child).toMatch('Test')
    }
  })

  test('"Router.to" must throw an error if container is not exist', async () => {
    await expect(Router.to('/not-found')).toBeRejected()
  })
})
