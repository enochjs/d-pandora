import express from 'express'
import interfaces from './interfaces'
import { METADATA_KEY, PARAMETER_TYPE } from './constants'

export function Controller(path: string, ...middleWares: interfaces.Middleware[]) {
  return function (target: any): void {
    const metadata = { target, path, middleWares }
    Reflect.defineMetadata(METADATA_KEY.controller, metadata, target)
  }
}

function Method(method: interfaces.METHOD_TYPE, path: string, ...middleWares: interfaces.Middleware[]): interfaces.HandlerDecorator {
  return function (target: any, methodName: string): void {
    const metadata: interfaces.ControllerMethodMetadata = {
      methodName,
      method,
      middleWares,
      path,
      target,
    }
    let metadataList: interfaces.ControllerMethodMetadata[] = []
    if (!Reflect.hasMetadata(METADATA_KEY.controllerMethod, target.constructor)) {
      Reflect.defineMetadata(METADATA_KEY.controllerMethod, metadataList, target.constructor)
    } else {
      metadataList = Reflect.getMetadata(METADATA_KEY.controllerMethod, target.constructor)
    }
    metadataList.push(metadata)
  }
}

export function All(path: string, ...middleWares: interfaces.Middleware[]): interfaces.HandlerDecorator {
  return Method('all', path, ...middleWares)
}

export function Get(path: string, ...middleWares: interfaces.Middleware[]): interfaces.HandlerDecorator {
  return Method('get', path, ...middleWares)
}

export function Post(path: string, ...middleWares: interfaces.Middleware[]): interfaces.HandlerDecorator {
  return Method('post', path, ...middleWares)
}

export function Put(path: string, ...middleWares: interfaces.Middleware[]): interfaces.HandlerDecorator {
  return Method('put', path, ...middleWares)
}

export function Delete(path: string, ...middleWares: interfaces.Middleware[]): interfaces.HandlerDecorator {
  return Method('delete', path, ...middleWares)
}

function Params(type: PARAMETER_TYPE, parameterName: string): ParameterDecorator {
  return function (target: any, methodName: string, index: number) {
    const metadata: interfaces.ParameterMetadata = {
      type,
      parameterName,
      index,
    }
    let metadataList: interfaces.ControllerParameterMetadata = {}
    let parameterMetadataList: interfaces.ParameterMetadata[] = []
    if (!Reflect.hasMetadata(METADATA_KEY.controllerParameter, target.constructor)) {
      parameterMetadataList.push(metadata)
    } else {
      metadataList = Reflect.getMetadata(METADATA_KEY.controllerParameter, target.constructor)
      if (metadataList.hasOwnProperty(methodName)) {
        parameterMetadataList = metadataList[methodName]
      }
      parameterMetadataList.push(metadata)
    }
    metadataList[methodName] = parameterMetadataList
    Reflect.defineMetadata(METADATA_KEY.controllerParameter, metadataList, target.constructor)
  } as ParameterDecorator
}

function paramDecoratorFactory(type: PARAMETER_TYPE): (name?: string) => ParameterDecorator {
  return (name?: string): ParameterDecorator => Params(type, name || 'default')
}

export const Request = paramDecoratorFactory(PARAMETER_TYPE.REQUEST)
export const Response = paramDecoratorFactory(PARAMETER_TYPE.RESPONSE)
export const RequestParam = paramDecoratorFactory(PARAMETER_TYPE.PARAMS)
export const QueryParam = paramDecoratorFactory(PARAMETER_TYPE.QUERY)
export const RequestBody = paramDecoratorFactory(PARAMETER_TYPE.BODY)
export const RequestHeaders = paramDecoratorFactory(PARAMETER_TYPE.HEADERS)
export const Cookies = paramDecoratorFactory(PARAMETER_TYPE.COOKIES)
export const Session = paramDecoratorFactory(PARAMETER_TYPE.SESSION)
export const Next = paramDecoratorFactory(PARAMETER_TYPE.NEXT)

export function After(reducer: (result: any, req: express.Request, res: express.Response, next: express.RequestHandler) => void) {
  return function (target: any, methodName: string): void {
    if (methodName) {
      Reflect.defineMetadata(METADATA_KEY.controllerAfter, reducer, target.constructor, methodName)
    } else {
      Reflect.defineMetadata(METADATA_KEY.controllerAfter, reducer, target.constructor)
    }
  }
}

export const ResponseBody = After((result, req, res) => {
  if (result instanceof Error) {
    res.json({
      status: 0,
      msg: result.message,
    })
  } else {
    res.json({
      status: 1,
      msg: '',
      data: result,
    })
  }
})
