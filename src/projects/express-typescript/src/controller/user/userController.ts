import { Logger } from 'winston'
import xlsx from 'node-xlsx'
import express from 'express'
import multer from 'multer'
import moment from 'moment'
import {
  Controller, Get, QueryParam, ResponseBody, Post, Request, Response,
} from 'inversifyExpress/index'
import { provideNamed, inject } from 'inversifyExpress/ioc'
import { TYPE } from 'inversifyExpress/constants'

import UserService from 'service/user/userService'

@provideNamed(TYPE.Controller, 'UserController')
@Controller('/')
export default class UserController {
  @inject('Logger')
  private logger: Logger

  @inject('UserService')
  private UserService: UserService

  @Get('api/user/list')
  @ResponseBody
  public async getUserList(
    @QueryParam('id') id: number,
  ): Promise<any> {
    this.UserService.getUserList(id)
    await new Promise((re) => {
      setTimeout(() => re(true), 2000)
    })
    return {
      totalCount: 100,
      currentPage: 1,
      pageSize: 20,
      data: [{
        id: 1,
        inputItem: 'inputItem',
        inputNumberItem: 1,
        selectItem: 2,
        radioItem: 2,
        checkboxItem: 1,
        treeSelectItem: [1],
        datePickerItem: new Date(),
        rangePickerItem: [new Date(), new Date()],
      }],
    }
  }

  /**
   * 上传用户 excel
   * @param files
   */
  @Post('api/user/upload', multer().any())
  @ResponseBody
  public async userUpload(
    @Request('files') files: { buffer: ArrayBuffer }[],
  ) {
    const file = files[0]
    const headers = [
      { key: 'name', title: '用户名称' },
      { key: 'age', title: '年龄' },
      { key: 'heigh', title: '身高' },
      { key: 'sex', title: '性别' },
      { key: 'mobile', title: '手机号' },
    ]
    if (file) {
      const sheetBuffer = xlsx.parse(file.buffer)
      const data = sheetBuffer[0]?.data
      this.logger.info('----------------upload data', data)
      const excelTitle = data.shift() ?? []
      let checkTitle = true
      headers.map((header) => header.title).forEach((title, index) => {
        if (title !== excelTitle[index]) {
          checkTitle = false
        }
      })
      if (!checkTitle) {
        throw new Error('文件格式错误，请检查！')
      }
    }
    const errorList = [
      { index: 1, message: 'error1error1error1error1error1error1error1error1error1error1error1error1error1error1error1error1error1error1error1error1error1error1' },
      { index: 2, message: 'error2' },
      { index: 3, message: 'error3' },
    ]
    return {
      errorList,
      data: {
        totalCount: 100,
        success: 20,
        fail: 80,
      },
    }
  }

  @Get('api/user/list/export')
  public async exportUserList(
    @Response() res: express.Response,
  ) {
    const columns = [
      { key: 'name', title: '用户名称' },
      { key: 'age', title: '年龄' },
      { key: 'heigh', title: '身高' },
      { key: 'sex', title: '性别' },
      { key: 'mobile', title: '手机号' },
    ]
    const data: any = [columns.map((column: any) => column.title)]
    const option = { '!cols': [{ wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 60 }, { wch: 60 }] }

    const result = Array.from({ length: 10 }).map((i, index) => ({
      name: `enochjs${index}`,
      age: `age${index}`,
      heigh: `heigh${index}`,
      sex: `sex${index}`,
      mobile: `mobile${index}`,
    }))
    result.forEach((item: any) => {
      data.push(columns.map((column) => item[column.key]))
    })
    res.attachment(`用户列表-${moment().format('YYYY-MM-DD')}.xlsx`)
    const buffer = xlsx.build([{
      name: '用户列表',
      data,
    }], option)
    res.send(buffer)
  }
}
