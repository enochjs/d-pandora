import React, { SFC } from 'react'
import { Layout } from 'antd'
import TopTab from 'components/topTab'
import { menuList } from 'utils/constants'
import Menu from './menu'
import Header from './header'

import './style.less'

const { Sider, Content } = Layout

const PageLayout: SFC<{}> = function (props) {
  return (
    <Layout className="layout-container">
      <Sider>
        <Menu data={menuList} />
      </Sider>
      <Layout className="layout-content">
        <Header />
        <TopTab />
        <Content style={{ padding: '8px 16px' }}>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
