import { NextFunction, Request, Response } from 'express'
import { container } from 'inversifyExpress/index'
import { Logger } from 'winston'

export default function accessLogger (req: Request, res: Response, next: NextFunction) {
  if (!req.path.includes('_next') && !req.path.includes('static')) {
    const startTime = Date.now()
    const logger = container.get<Logger>('Logger')
    logger.info(`HTTP_REQUEST_INFO: ${req.method} ${req.url}      ================ start`)
    res.on('finish', () => {
      const cost = Date.now() - startTime
      logger.info(`HTTP_REQUEST_INFO: ${req.method} ${req.url} ${res.statusCode} ==== cost: ${cost} ms ================ end`)
    })
  }
  next()
}
