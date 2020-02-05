import express from 'express'
const ENV = process.env.NODE_ENV || 'localdev'

export default async function html(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (req.path.startsWith('/api')) {
    next()
    return
  }

  let main = 'your own js address'
  // develop address
  if (ENV === 'localdev') {
    main = '//127.0.0.1:3001/main.js'
  }

  // your constants
  const constants = {
    CITIES: [],
    MYCITYLIST: [],
    NAVIGATION: [],
    AUTHCODE: {},
    PLATFORMLIST: [],
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
      <script>
        window.$GLOBALCONFIG = ${JSON.stringify(constants)};
      </script>
      <script src="${main}"></script>
    </body>
    </html>
  `)
}
