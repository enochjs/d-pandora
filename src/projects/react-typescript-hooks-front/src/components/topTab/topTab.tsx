import React, { SFC, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { OPEN_TOPTAB_EVENT } from 'utils/constants'
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu'

import topTabStore, { ITab, TabData } from './store'
import { ITabProps } from './tab'

export interface IProps {
  renderItem: (item: ITabProps) => JSX.Element | null;
}

const TopTab: SFC<IProps> = function (props) {
  const { renderItem } = props

  const [state, actions] = topTabStore.useStore()

  const history = useHistory()

  const handleOpenTab = (event: Event) => {
    event.stopPropagation()
    const newtab = (event as CustomEvent).detail as ITab
    const { tabs } = state

    if (tabs.find((tab: ITab) => tab.key === newtab.key)) {
      actions.updateActiveTab(newtab.key)
    } else {
      actions.updateTabData(newtab)
    }
  }

  useEffect(() => {
    window.addEventListener(OPEN_TOPTAB_EVENT, handleOpenTab)
    return () => {
      window.removeEventListener(OPEN_TOPTAB_EVENT, handleOpenTab)
    }
  }, [state])

  useEffect(() => {
    history.push(state.activeKey)
  }, [state.activeKey])

  const { tabs, activeKey } = state

  const container = React.createRef<HTMLDivElement>()

  const handleClickTab = (item: ITab) => {
    history.push(item.key)
    actions.updateActiveTab(item.key)
  }
  const handleCloseTab = (item: ITab) => {
    actions.removeTab(item.key)
  }

  const handleClick = (e: any, data: any) => {
    const key = data.target.dataset?.key
    const currentIndex = tabs.findIndex((tab) => tab.key === key)
    const activeIndex = tabs.findIndex((tab) => tab.key === activeKey)
    const tabData: TabData = {
      tabs: [],
      activeKey: '',
    }
    switch (data.type) {
      case 'other':
        tabData.tabs = [tabs[currentIndex]]
        tabData.activeKey = key
        break
      case 'right':
        tabData.tabs = tabs.slice(0, currentIndex + 1)
        tabData.activeKey = currentIndex < activeIndex ? key : activeKey
        break
      case 'left':
        tabData.tabs = tabs.slice(currentIndex)
        tabData.activeKey = currentIndex > activeIndex ? key : activeKey
        break
      case 'all':
        tabData.tabs = []
        tabData.activeKey = ''
        break
      default:
        break
    }
    tabData.activeKey !== activeKey && history.push(tabData.activeKey)
    actions.setTabData(tabData)
  }

  return (
    <div className="top-tab-container" ref={container}>
      <ContextMenuTrigger id="top-tab-context">
        <div className="well">
          {tabs.map((item: ITab) => renderItem({
            item,
            active: item.key === activeKey,
            onClick: handleClickTab,
            onClose: handleCloseTab,
          }))}
        </div>
      </ContextMenuTrigger>
      <ContextMenu id="top-tab-context" className="right-click-menu">
        <MenuItem data={{ type: 'all' }} onClick={handleClick}>关闭全部标签页</MenuItem>
        <MenuItem data={{ type: 'other' }} onClick={handleClick}>关闭其他标签页</MenuItem>
        <MenuItem data={{ type: 'right' }} onClick={handleClick}>关闭右侧标签页</MenuItem>
        <MenuItem data={{ type: 'left' }} onClick={handleClick}>关闭左侧标签页</MenuItem>
      </ContextMenu>
    </div>
  )
}

export default TopTab
