import { Server, Route, Handler } from '@prostory/mountain'
import fs from 'fs'

const mainRoute = new Route({
  path: '/',
  method: 'get',
  notFound: true,
  handle(req, { send }) {
    send({
      type: 'file',
      data: '/index.html'
    })
  }
})

const otherRoute = new Route({
  path: /^(\/[\d\w\W]+)+.mjs$/,
  method: 'get',
  handle(req, { send }) {
    send({
      type: 'file',
      data: req.headers[':path']
    })
  }
})

const s = new Server({
  key: fs.readFileSync('certs/localhost-privkey.pem'),
  cert: fs.readFileSync('certs/localhost-cert.pem'),
  rootDir: import.meta.url,
  timeout: 1000
})

s.onRequest(new Handler([
  mainRoute,
  otherRoute
]).set())

s.onUnknownProtocol((s) => console.warn(`Unknown protocol
${s}`))
s.onError((error) => {
  console.error(`Error occured in request.
  ${error}`)
})
s.listen(5555, 'localhost', () => { console.log(`Listening on port ${5555}...`) })
