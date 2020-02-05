import 'reflect-metadata'
import InversifyExpressServer from './server'
import {
  Controller, All, Get, Put, Post, Delete,
  Request, Response, RequestParam, QueryParam, RequestBody, RequestHeaders,
  Cookies, Session, Next, ResponseBody,
} from './decorators'
import { TYPE } from './constants'
import interfaces from './interfaces'
import {
  container, autoProvide, provide, buildProviderModule, provideSingleton, provideNamed, inject, lazyInject, injectable,
} from './ioc'

export {
  interfaces,
  InversifyExpressServer,
  Controller,
  Get,
  Put,
  Post,
  All,
  Delete,
  TYPE,
  Request,
  Response,
  RequestParam,
  QueryParam,
  RequestBody,
  RequestHeaders,
  Cookies,
  Session,
  Next,
  ResponseBody,
  container, autoProvide, provide, buildProviderModule, provideSingleton, provideNamed, inject, lazyInject, injectable,
}
