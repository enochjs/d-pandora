import React, { useState } from 'react'
import { Tabs } from 'antd'
import ImageView from './imageView'
import './style.less'

const { TabPane } = Tabs

interface SrcListProps {
  title: string;
  src: string;
}
interface Props {
  list: SrcListProps[];
  initActiveKey?: string;
}

export default function ImageTab (props: Props) {
  const { list, initActiveKey = '0' } = props
  const [activeKey, activeKeyChanged] = useState(initActiveKey)
  const onChange = (activeKey: string) => {
    activeKeyChanged(activeKey)
  }

  return (
    <div style={{ overflow: 'hidden' }} className="antd-tab-pane">
      <Tabs activeKey={activeKey} size="small" onChange={onChange}>
        {list.map((item, index) => (
          <TabPane tab={item.title} key={String(index)}>
            <ImageView activeKey={index} list={list} />
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}
