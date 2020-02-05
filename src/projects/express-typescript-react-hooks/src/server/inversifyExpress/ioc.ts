import { Container, inject, injectable } from 'inversify'
import {
  autoProvide, fluentProvide, provide, buildProviderModule,
} from 'inversify-binding-decorators'
import getDecorators from 'inversify-inject-decorators'

const container = new Container()
const { lazyInject } = getDecorators(container)

const provideNamed = function (identifier: any, name: string) {
  return fluentProvide(identifier)
    .whenTargetNamed(name)
    .done()
}

const provideSingleton = function (identifier: any) {
  return fluentProvide(identifier)
    .inSingletonScope()
    .done()
}

export {
  container, autoProvide, provide, buildProviderModule, provideSingleton, provideNamed, inject, lazyInject, injectable,
}
