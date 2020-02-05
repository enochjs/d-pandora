import React, { useEffect } from 'react'
import { Table } from 'antd'
import { ColumnProps } from 'antd/lib/table'
import {
  SearchForm,
  IFormColumnValue,
} from 'components/form'
import commonStore from 'store/common'
import searchTableStore from './store'

interface Props {
  cityId: string;
  riderId: string;
}

export default function searchTable (props: Props) {
  const { cityId, riderId } = props
  const [{ CITIES, MYCITYLIST, PLATFORMLIST }] = commonStore.useStore()
  const [state, actions] = searchTableStore.useStore()

  function handleSubmit () {
    actions.fetchTableData({
      ...state.formValue,
      keyAsCityId: cityId,
      riderId,
      pageNum: 1,
      pageSize: 20,
    })
  }

  useEffect(() => {
    actions.formFieldChange({
      cityId: props.cityId,
    })
    handleSubmit()
  }, [riderId])

  function onPageChange (current: number) {
    actions.fetchTableData({
      ...state.formValue,
      pageNum: current,
      keyAsCityId: cityId,
      riderId,
      pageSize: 20,
    })
  }

  function getColumns () {
    const talbeColumns: ColumnProps<any>[] = [
      {
        title: '序号',
        render: (text, record, index) => index + 1,
        fixed: 'left',
      },
      {
        title: '需求编码',
        dataIndex: 'demandId',
        key: 'demandId',
        fixed: 'left',
      },
    ]
    return talbeColumns
  }

  function getFormColumns () {
    const formColumns: IFormColumnValue[] = [
      {
        id: 'cityId',
        formItemLabel: '城市',
        type: 'citySelect',
        options: MYCITYLIST,
        allowClear: true,
        span: 4,
      },
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
        onClear={() => actions.setFormValue()}
      />

      <Table
        loading={state.tableLoading}
        columns={getColumns()}
        dataSource={state.tableData.list}
        bordered={false}
        rowKey="demandId"
        size="small"
        pagination={{
          onChange: onPageChange,
          pageSize: state.tableData.pageSize,
          total: state.tableData.totalCount,
          current: state.tableData.currentPage,
          showTotal () {
            return `共 ${state.tableData.totalCount} 条`
          },
        }}
      />
    </div>
  )
}
