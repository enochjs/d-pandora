import express from 'express'
import { container } from 'inversifyExpress/index'
import Config from 'config/index'
import jwt from 'jsonwebtoken'

const config = container.get<Config>('Config')

const authIgnore = ['/api/login']

export default async function auth(req: express.Request, res: express.Response, next: express.NextFunction) {
  if (authIgnore.indexOf(req.path) !== -1) {
    return next()
  }
  const authorization = req.headers.authorization || ''
  try {
    jwt.verify(authorization, config.privateKey)
    // req.username = decoded.username
  } catch (error) {
    if (!req.path.startsWith('/api')) { // 页面不校验权限
      return next()
    }
    res.status(302)
    res.send({ data: false })
    return false
  }
  return next()
}
