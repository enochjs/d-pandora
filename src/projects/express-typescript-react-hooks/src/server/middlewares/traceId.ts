import express from 'express'
import { container } from 'inversifyExpress/index'
import { v4 } from 'uuid'
import { Logger } from 'winston'
import { asyncHooks } from 'utils/asyncHooks'

export default async function traceId(req: express.Request, res: express.Response, next: express.NextFunction) {
  const logger = container.get<Logger>('Logger')
  const id = v4()
  try {
    asyncHooks.set('traceId', id)
    next()
  } catch (e) {
    logger.error(`error traceId=${id}, ${req.path}`)
    next()
  }
}
