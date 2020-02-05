import express from 'express'
import { container } from 'inversifyExpress/index'
import Config from 'config/index'

const ENV = process.env.NODE_ENV || 'localdev'
// eslint-disable-next-line
const { version } = require('../../package.json')

const config = container.get<Config>('Config')

export default function html(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.path.startsWith('/api')) {
    next()
    return
  }

  let main = `//${req.host}:${config.port}/${version}-main.js`

  if (ENV === 'localdev') {
    main = `//127.0.0.1:3001/${version}-main.js`
  }

  if (req.path === '/login') {
    if (ENV === 'localdev') {
      main = `//127.0.0.1:3001/${version}-login.js`
    } else {
      main = `//${req.host}:${config.port}/${version}-login.js`
    }
  }

  res.status(200)
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta http-equiv="Content-type" content="text/html; charset=utf-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title></title>
    </head>
    <body>
      <div id="root"></div>
      <script src="${main}"></script>
    </body>
    </html>
  `)
}
