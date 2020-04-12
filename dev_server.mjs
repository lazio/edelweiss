import { Server, Router } from '@prostory/mountain'
import fs from 'fs'

const mainRoute = {
  path: '/',
  method: 'get',
  notFound: true,
  handle(req, { send }) {
    send({
      type: 'file',
      data: './index.html',
    })
  },
}

const otherRoute = {
  path: /^(\/[\d\w\W]+)+.mjs$/,
  method: 'get',
  handle(req, { send }) {
    send({
      type: 'file',
      data: req.headers[':path'],
    })
  },
}

const s = new Server({
  key: fs.readFileSync('certs/localhost-privkey.pem'),
  cert: fs.readFileSync('certs/localhost-cert.pem'),
})

s.onRequest(new Router([mainRoute, otherRoute]).set())

s.onUnknownProtocol((s) =>
  console.warn(`Unknown protocol
${s}`)
)
s.onError((error) => {
  console.error(`Error occured in request.
  ${error}`)
})
s.listen(5555, 'localhost', () => {
  console.log(`Listening on port ${5555}...`)
})
