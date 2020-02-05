import { provide, inject } from 'inversifyExpress/index'
import { Logger } from 'winston'

@provide('UserService')
export default class UserService {
  @inject('Logger')
  private logger: Logger

  public getUserList(id: number) {
    this.logger.info({ id })
    return { id }
  }
}
