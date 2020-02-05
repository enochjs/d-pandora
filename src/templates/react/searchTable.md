```javascript

@start
@name search-table
@prefix searchtable
@content

import React, { useState } from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import {
  SearchForm,
  IFormColumnValue,
} from 'components/form'
import commonStore from 'store/common'
import searchTableStore from './store'

interface Iprops {
  cityId: string;
  riderId: string;
}

export default function SearchTable (props: Iprops) {
  const [state, actions] = searchTableStore.useStore()
  const [type, setType] = useState<'now' | 'his'>('now')
  const [{ BUSINESS_TYPE, MYCITYLIST, ORDER_TYPE_LIST, ORDERSTATUS, ORDER_PAID_LIST_FROND, DISPATCHMODELIST }] = commonStore.useStore()

  function handleSubmit () {
    query(1)
  }

  function onPageChange (current: number) {
    query(current)
  }

  function query (current) {
    actions.fetchTableData({ ...state.formValue, currentPage: current || state.tableData.currentPage }, type)
  }

  function getColumns () {
    const talbeColumns: ColumnProps<any>[] = [
    ]
    return talbeColumns
  }

  function getFormColumns () {
    const formColumns: IFormColumnValue[] = [
    ]
    return formColumns
  }

  return (
    <div className="search-panel flex-container">
      <SearchForm
        formColumns={getFormColumns()}
        formValue={state.formValue}
        formFieldChange={actions.formFieldChange}
        onSearch={handleSubmit}
      />
      <Table
        loading={state.tableLoading}
        columns={getColumns()}
        dataSource={state.tableData.list}
        bordered={bordered}
        rowKey="rowKey"
        size="small"
        scroll={{ x: 2000 }}
        pagination={{
          onChange: onPageChange,
          pageSize: state.tableData.pageSize,
          total: state.tableData.totalCount,
          current: state.tableData.currentPage,
        }}
      />
    </div>
  )
}


@description description
@end

```