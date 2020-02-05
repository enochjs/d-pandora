import React, { SFC } from 'react'
import { Layout } from 'antd'
import TopTab from 'components/topTab'
import commonStore from 'store/common'
import Menu from './menu'
import Header from './header'


import './style.less'

const { Sider, Content } = Layout

const PageLayout: SFC<{}> = function (props) {
  const [globalConfig] = commonStore.useStore()

  return (
    <Layout className="layout-container">
      <Sider>
        <Menu data={globalConfig.NAVIGATION} />
      </Sider>
      <Layout className="layout-content">
        <Header />
        <TopTab />
        <Content>{props.children}</Content>
      </Layout>
    </Layout>
  )
}

export default PageLayout
