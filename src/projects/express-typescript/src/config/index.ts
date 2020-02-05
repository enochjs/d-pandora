import { container } from 'inversifyExpress/index'

export default class Config {
  public port = 3000

  // jwt key 每个项目自己生成一个随机数，泄露有安全隐患
  public privateKey = 'privateKey'
}

container.bind<Config>('Config').toConstantValue(new Config())
