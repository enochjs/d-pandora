import React, { useState } from 'react'
import { Button } from 'antd'
import Icon from 'components/Icon'

interface Props {
  list: any[];
  render: (item: any, index: number) => React.ReactNode;
  maxlength?: number;
}

export default function Collapsible (props: Props) {
  const [showAll, showAllChanged] = useState(false)
  const { render, list, maxlength = 5 } = props
  const showMoreButton: boolean = list.length > maxlength
  let frontList = list
  if (list.length > maxlength) {
    frontList = list.slice(0, maxlength)
  }
  const currentList = showAll ? list : frontList
  return (
    <div>
      {currentList.map((item, index) => render(item, index))}
      {showMoreButton && (
        <Button
          block
          type="link"
          style={{ marginTop: 20 }}
          onClick={() => {
            showAllChanged(!showAll)
          }}
        >
          <span style={{ color: '#666', fontSize: 12 }}>展开更多</span>
          <Icon color="#999" size="12px" type={showAll ? 'arrowDown' : 'arrowUp'} />
        </Button>
      )}
    </div>
  )
}
