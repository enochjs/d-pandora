import React from 'react'
import { Menu, Icon } from 'antd'
import { useHistory } from 'react-router-dom'
import { OPEN_TOPTAB_EVENT } from 'utils/constants'


const { SubMenu } = Menu

interface IMenu {
  name: string;
  url: string;
  icon?: string;
  children?: IMenu[];
}
export interface IProps {
  data: IMenu[];
}

function MenuComponent(props: IProps) {
  const { data } = props
  const history = useHistory()

  const handleClickMenu = (e: any) => {
    const { title } = e.item.node.dataset
    history.push(e.key)
    window.dispatchEvent(new CustomEvent(OPEN_TOPTAB_EVENT, { detail: { key: e.key, value: title, title } }))
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      onClick={handleClickMenu}
    >
      {
        data.map((menu: any) => {
          if (menu.children && menu.children.length) {
            return (
              <SubMenu
                key={menu.name}
                data-title={menu.name}
                title={(
                  <span>
                    { menu.icon ? <Icon type={menu.icon} /> : null}
                    <span>{menu.name}</span>
                  </span>
                )}
              >
                {
                  menu.children.map((subMenu: any) => <Menu.Item key={subMenu.url}><span>{subMenu.name}</span></Menu.Item>)
                }
              </SubMenu>
            )
          }
          return (
            <Menu.Item key={menu.url} data-title={menu.name}>
              { menu.icon ? <Icon type={menu.icon} /> : null}
              <span>{menu.name}</span>
            </Menu.Item>
          )
        })
      }
    </Menu>
  )
}

export default MenuComponent
