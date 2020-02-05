import React from 'react'
import { Icon } from 'antd'
import { ITab } from './store'

type ClickEvent = React.MouseEvent<HTMLDivElement, MouseEvent>

export interface ITabProps {
  item: ITab;
  active?: boolean;
  onClick?: (item: ITab) => void;
  onClose?: (item: ITab) => void;
}

function Tab (props: ITabProps) {
  const {
    item, active, onClick, onClose,
  } = props
  const { value, title, key } = item
  const handleClick = () => {
    if (typeof onClick === 'function') {
      onClick(item)
    }
  }
  const handleClose = (e: ClickEvent) => {
    e.stopPropagation()
    if (typeof onClose === 'function') {
      onClose(item)
    }
  }

  return (
    <div
      className={active ? 'tab active-tab' : 'tab'}
      key={title}
      title={title}
      data-key={key}
      onClick={handleClick}
    >
      {value}
      {' '}
      <Icon className="tab-close" type="close" onClick={handleClose} />
    </div>
  )
}

export default Tab
