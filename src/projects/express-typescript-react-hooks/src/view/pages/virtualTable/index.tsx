import React, { useState, useRef } from 'react'
import { Button, Input, Row, Col } from 'antd'

import VirtualTable, { ColumnProps, VirtualTableHandles } from 'components/virtualTable'

interface DataItem {
  name: string;
  description: string;
  lastName: string;
  weight: number;
  id: string | number;
}
const datalist = Array.from({ length: 1000 }).map((item: any, index: number) => (({
  name: `Brian Vaughn${index}`,
  description: 'Software engineer',
  lastName: 'enochjs',
  weight: 100,
  id: index,
})))

export default function table () {
  const tableRef = useRef<VirtualTableHandles>(null)
  const [scrollToRow, setScrollToRow] = useState()

  function handleDetail (record: DataItem, index: number) {
    console.log('.....record', record, index, tableRef.current?.getSeletedRowKey())
  }

  const columns: ColumnProps[] = [
    {
      title: 'name',
      key: 'name',
      width: 120,
      dataIndex: 'name',
      fixed: 'left',
    },
    {
      title: 'description',
      key: 'description',
      width: 120,
      dataIndex: 'description',
    },
    {
      title: 'lastName',
      key: 'lastName',
      width: 120,
      dataIndex: 'lastName',
    },
    {
      title: 'weight',
      key: 'weight',
      width: 120,
      dataIndex: 'weight',
    },
    {
      title: 'operate',
      key: 'operate',
      width: 120,
      dataIndex: 'enochjs',
      fixed: 'right',
      render: (record, index) => (<Button type="primary" onClick={() => handleDetail(record, index)}>detail</Button>),
    },
  ]

  function handleFilter (e: any) {
    tableRef.current?.filterData((item) => item.name.includes(e.target.value))
  }

  function handleScroll (e: any) {
    setScrollToRow(+e.target.value)
  }

  return (
    <div style={{ display: 'flex', height: '100%', flexDirection: 'column' }}>
      <Row gutter={16} className="mb24">
        <Col span={12}>filterName: <Input onChange={handleFilter} /></Col>
        <Col span={12}>scrollToRow: <Input onChange={handleScroll} /></Col>
      </Row>
      <div style={{ flex: 1, flexDirection: 'column' }}>
        <VirtualTable
          ref={tableRef}
          dataSource={datalist}
          columns={columns}
          rowSelection
          scrollToRow={scrollToRow}
          rowKey="id"
        />
      </div>
      <div className="mt24">
        footer
      </div>
    </div>
  )
}
