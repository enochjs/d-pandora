import React from 'react'
import {
  Layout, Dropdown, Menu, Icon,
} from 'antd'
import { PROJECT_TOKERN_NAME } from 'utils/constants'


const Header = function () {
  function handleLogout () {
    localStorage.setItem(PROJECT_TOKERN_NAME, '')
    window.location.href = '/login'
  }

  const menu = (
    <Menu style={{ width: '200px' }}>
      <Menu.Item style={{ borderBottom: '1px solid #f0f1f2' }}>
        <a>上次登录时间：</a>
        <a>IP：</a>
        <a>城市：</a>
      </Menu.Item>
      <Menu.Item>
        <a target="_self" rel="noopener noreferrer" onClick={handleLogout}>
          <Icon type="logout" />
            退出登录
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout.Header className="layout-header">
      <Dropdown overlay={menu} trigger={['click']}>
        <div className="pull-right">
          <img width="24" height="24" src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png" alt="avatar" />
          <a className="ant-dropdown-link ml8" href="#">
            enochjs
          </a>
        </div>
      </Dropdown>
    </Layout.Header>
  )
}

export default Header
