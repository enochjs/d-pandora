// 也可以用 cls-hooked
import hooks from 'async_hooks'
import util from 'util'
import fs from 'fs'

// async_hooks 日志打印不能用console.log 因为console.log 也是异步操作，会触发死循环
// eslint-disable-next-line
function print(format: any, ...args: any[]) {
  // eslint-disable-next-line
  fs.writeSync(1, `${util.format(format, ...args)}\n`)
}

let currentCtxId = -1

interface Context {
  id: number;
  [key: string]: any;
}

export default class AsyncHooks {
  // current context
  // eslint-disable-next-line
  private context: Context

  // context map <asyncId, contest>, to find context with current asyncId
  private contexts: Map<number, Context> = new Map()

  public constructor() {
    hooks.createHook({
      init: (asyncId) => {
        if (this.context) {
          this.contexts.set(asyncId, this.context)
        }
      },
      before: (asyncId) => {
        const ctx = this.contexts.get(asyncId)
        if (ctx) {
          this.context = ctx
        }
      },
      after: () => {
        // print('....after', asyncId)
      },
      destroy: (asyncId) => {
        // print('....destroy', asyncId)
        // print(this.contexts.size)
        this.contexts.delete(asyncId)
      },
    }).enable()
  }

  public set(key: string, value: any) {
    currentCtxId = hooks.executionAsyncId()
    const ctx = {
      id: currentCtxId,
      [key]: value,
    }
    this.context = ctx
  }

  public get(key: string) {
    return this.context[key]
  }
}

export const asyncHooks = new AsyncHooks()
