import React, { useState, useEffect } from 'react'
import { Tabs, Dropdown, Menu } from 'antd'
import Icon from 'components/Icon'
import { ClickParam } from 'antd/es/menu'
import createTabStore from './store'
import './style.less'

const { TabPane } = Tabs

type Tab = {
  key: string;
  label: string;
  hide?: boolean;
  children?: Tab[];
}

interface Iprops {
  tabs: Tab[];
  // unit key
  id: string;
  defaultActiveKey?: string;
  onTabChange?: (key: string, parent?: string) => void;
}

const HeaderTab = (store: ReturnType<typeof createTabStore>) => (props: Iprops): JSX.Element => {
  const { tabs, defaultActiveKey, onTabChange, id = 'default' } = props
  const [state, actions] = store.useStore()
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    !state[id]?.activeKey && actions.setActiveKey(defaultActiveKey || tabs[0]?.key, id)
    setTimeout(() => {
      setAnimated(true)
    }, 100)
  }, [id])

  function handleChange (key: string) {
    actions.setActiveKey(key, id)
    onTabChange && onTabChange(key)
    const tab = tabs.find((item) => item.key === key)
    actions.setActiveKey(key, id)
    if (tab?.children && state[id].moreActiveKey) {
      actions.setActiveTab(state[id].moreActiveKey, id)
    } else {
      actions.setActiveTab(key, id)
    }
  }

  function handleChangeMore (param: ClickParam, parent: string) {
    param.domEvent.stopPropagation()
    actions.setMoreActiveKey(param.key, parent, id)
    actions.setActiveKey(parent, id)
    actions.setActiveTab(param.key, id)
    onTabChange && onTabChange(param.key, parent)
  }

  function renderChildren (tab: Tab) {
    return (
      <Menu
        selectedKeys={[state[id]?.moreActiveKey]}
        onClick={(param) => handleChangeMore(param, tab.key)}
      >
        {tab.children?.map((item) => (item.hide ? null : <Menu.Item key={item.key}>{item.label}</Menu.Item>))}
      </Menu>
    )
  }

  function renderTab (tab: Tab) {
    if (tab.children) {
      if (tab.children.filter((item) => !item.hide).length === 0) {
        return null
      }
      return (
        <TabPane
          tab={
            (
              <Dropdown overlay={renderChildren(tab)} placement="bottomRight">
                <div>{tab.children.find((item) => item.key === state[id]?.moreActiveKey)?.label || '更多'} <Icon type="arrowUp" /></div>
              </Dropdown>
            )
          }
          key={tab.key}
        />
      )
    }
    return tab.hide ? null : <TabPane tab={tab.label} key={tab.key} />
  }

  return (
    <Tabs className="extend-tab relative" animated={animated} activeKey={state[id]?.activeKey} onChange={handleChange}>
      {
        tabs.map((tab) => renderTab(tab))
      }
    </Tabs>
  )
}

export default function createExtendTab (key: string): [ReturnType<typeof HeaderTab>, ReturnType<typeof createTabStore>] {
  const extendTabStore: ReturnType<typeof createTabStore> = createTabStore(key)
  return [HeaderTab(extendTabStore), extendTabStore]
}
