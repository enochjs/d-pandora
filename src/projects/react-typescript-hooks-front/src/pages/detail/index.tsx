import React from 'react'
import { Divider } from 'antd'
import commonStore from 'store/common'

export default function Detail () {
  const state = commonStore.getState()

  return (
    <div className="flex-panel">
      <div className="flex-container">
        {Object.values(state).map((item, index) => <div key={`${index.toString()}`}>{JSON.stringify(item, null, 2)} <Divider /></div>)}
      </div>
    </div>
  )
}
