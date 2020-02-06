import { Logger } from 'winston'
import jwt from 'jsonwebtoken'
import {
  Controller, ResponseBody, Post, RequestBody,
} from 'inversifyExpress/index'
import { provideNamed, inject } from 'inversifyExpress/ioc'
import { TYPE } from 'inversifyExpress/constants'

import LoginService from 'service/login/loginService'
import Config from 'config/index'


@provideNamed(TYPE.Controller, 'LoginController')
@Controller('/')
export default class LoginController {
  @inject('Logger')
  private logger: Logger

  @inject('Config')
  private config: Config

  @inject('LoginService')
  private loginService: LoginService

  @Post('api/login')
  @ResponseBody
  public async login (
    @RequestBody('username') username: string,
    @RequestBody('password') password: string,
  ): Promise<string> {
    const result = await this.loginService.checkUser(username, password)

    if (result) {
      const token = await jwt.sign(
        {
          username,
          iat: new Date().getTime(),
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        },
        this.config.privateKey,
      )
      return token
    }
    throw new Error('用户名密码错误！')
  }
}
