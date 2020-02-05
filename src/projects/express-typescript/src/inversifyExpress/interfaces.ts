import express from 'express'
import { PARAMETER_TYPE } from './constants'

declare namespace interfaces {

  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface Controller {}

  export type Middleware = express.RequestHandler

  export interface ControllerMetadata {
    path: string;
    middleWares: Middleware[];
    target: any;
  }

  export interface ControllerMethodMetadata extends ControllerMetadata {
    method: METHOD_TYPE;
    methodName: string;
  }

  export interface ControllerParameterMetadata {
    [methodName: string]: ParameterMetadata[];
  }

  export interface ParameterMetadata {
    parameterName: string;
    index: number;
    type: PARAMETER_TYPE;
  }

  export type HandlerDecorator = (target: any, key: string, value: any) => void

  export type METHOD_TYPE = 'get' | 'post' | 'put' | 'delete' | 'all'

  export type BeforeMetadata = (args: any[], req: express.Request, res: express.Response, next: express.NextFunction) => any[]

  export type AfterMetadata = (result: any | Promise<any>, req: express.Request, res: express.Response, next: express.NextFunction) => any | Promise<any>

}

export default interfaces
