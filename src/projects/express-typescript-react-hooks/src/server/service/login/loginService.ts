import { provide } from 'inversifyExpress/index'

@provide('LoginService')
export default class LoginService {
  public checkUser(username: string, password: string) {
    return username || password
  }
}
