import { render } from 'react-dom'
import React from 'react'
import { HashRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import Layout from 'pages/layout'
import zhCN from 'antd/es/locale/zh_CN'
import 'moment/locale/zh-cn'
import Router from './routes'
import './styles/base.less'
import './styles/index.less'

render(
  <ConfigProvider locale={zhCN}>
    <HashRouter><Layout>{Router}</Layout></HashRouter>
  </ConfigProvider>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}
