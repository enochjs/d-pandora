import { render } from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import Router from './routes'
import './styles/base.less'
import './styles/index.less'

render(
  <ConfigProvider locale={zhCN}>
    <BrowserRouter>{Router}</BrowserRouter>
  </ConfigProvider>,
  document.getElementById('root'),
)

if ((module as any).hot) {
  (module as any).hot.accept()
}
