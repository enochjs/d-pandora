import React, { useState, useMemo, useEffect, useImperativeHandle, forwardRef } from 'react'
import { AutoSizer } from 'react-virtualized'
import { Table, Column, Cell, TableRowEventHandler } from 'fixed-data-table-2'
import { Checkbox } from 'antd'
import { cloneDeep } from 'lodash'
import 'react-virtualized/styles.css'
import 'fixed-data-table-2/dist/fixed-data-table.css'
import './style.less'

export interface ColumnProps {
  title: React.ReactNode | string;
  key: React.Key;
  width?: number;
  dataIndex?: string;
  fixed?: 'left' | 'right';
  align?: 'left' | 'center' | 'right';
  render?: (record: any, index: number) => React.ReactNode;
}

export interface VirtualTableProps {
  dataSource: any[];
  rowKey: string;
  columns: ColumnProps[];
  bordered?: boolean;
  rowSelection?: boolean;
  columnWidth?: number;
  rowHeight?: number;
  headerHeight?: number;
  height?: number;
  width?: number;
  scrollToRow?: number;
  onRowClick?: TableRowEventHandler;
  onRowDoubleClick?: TableRowEventHandler;
}

export interface VirtualTableHandles {
  getSeletedRowKey(): string[];
  filterData(filterFn: (record: any) => boolean): void;
}

function VirtualTable (props: VirtualTableProps, ref?: React.Ref<VirtualTableHandles>) {
  const { bordered, columns, rowSelection, rowHeight, headerHeight, rowKey, scrollToRow, onRowClick, onRowDoubleClick } = props
  const [list, setList] = useState([] as any[])
  const [checkedAll, setCheckedAll] = useState(false)
  const [indeterminate, setIndeterminate] = useState(false)
  const defaultWidth = props.columnWidth || 100

  const dataSource = useMemo(() => cloneDeep(props.dataSource), [props.dataSource])
  // map datasource
  const dataSourceMap = useMemo(() => {
    const map = new Map()
    dataSource.forEach((item) => {
      map.set(item[rowKey], item)
    })
    return map
  }, [dataSource])

  // calc table width
  const calcWidth = useMemo(() => {
    let width = 16 + (rowSelection ? 60 : 0)
    columns.forEach(((column) => {
      width += column.width ?? defaultWidth
    }))
    return width
  }, [columns])

  // rowSelection set rowChecked true
  useEffect(() => {
    if (rowSelection) {
      dataSource.forEach((item) => {
        item.rowChecked = false
      })
    }
  }, [])

  useEffect(() => {
    setList(dataSource)
  }, [dataSource])

  function filterData (Fn: Function) {
    const filterlist = dataSource.filter((item) => Fn(item))
    const dataMap = new Map()
    filterlist.forEach((item) => dataMap.set(item[rowKey], item))
    if (rowSelection) {
      const checkedLength = dataSource.filter((item) => item.rowChecked && dataMap.get(item[rowKey])).length
      checkedLength && setCheckedAll(checkedLength === filterlist.length)
      setIndeterminate(!!(checkedLength && (checkedLength < filterlist.length)))
    }
    setList(filterlist)
  }

  function getSeletedRowKey () {
    return dataSource.filter((item) => item.rowChecked).map((item) => item[rowKey])
  }

  useImperativeHandle(ref, () => ({
    getSeletedRowKey,
    filterData,
  }))

  function handleChange (rowIndex: number) {
    list[rowIndex].rowChecked = !list[rowIndex].rowChecked
    dataSource[rowIndex].rowChecked = list[rowIndex].rowChecked
    const checkedLength = list.filter((item) => item.rowChecked).length
    setList([...list])
    setCheckedAll(checkedLength === list.length)
    setIndeterminate(!!(checkedLength && checkedLength < list.length))
  }

  function handleSelectAll () {
    list.forEach((item) => {
      item.rowChecked = !checkedAll
      // change dataSource checked
      dataSourceMap.get(item[rowKey]).rowChecked = !checkedAll
    })
    setIndeterminate(false)
    setCheckedAll(!checkedAll)
  }

  function getSelectionRow () {
    return (
      <Column
        key="table-row-selection"
        align="center"
        header={
          (
            <Cell key="cell-all" style={{ textAlign: 'center', width: '100%' }}>
              <Checkbox key="checkbox-all" indeterminate={indeterminate} checked={checkedAll} onChange={() => handleSelectAll()} />
            </Cell>
          )
        }
        cell={({ rowIndex }) => (
          <Cell key={`cell-${rowIndex}`} style={{ textAlign: 'center', width: '100%' }}>
            <Checkbox key={`checkbox-${rowIndex}`} checked={list[rowIndex].rowChecked} onChange={() => handleChange(rowIndex)} />
          </Cell>
        )}
        fixed
        width={60}
      />
    )
  }

  function getColumns () {
    let renderColumns = []
    if (rowSelection) {
      renderColumns.push(getSelectionRow())
    }
    renderColumns = renderColumns.concat(columns.map((column) =>
      (
        <Column
          key={column.key}
          header={<Cell>{column.title}</Cell>}
          cell={({ rowIndex }) => (<Cell>{column.render ? column.render(list[rowIndex], rowIndex) : (list[rowIndex][column.dataIndex || column.key])}</Cell>)}
          fixedRight={column.fixed === 'right'}
          fixed={column.fixed === 'left'}
          width={column.width || defaultWidth}
          align={column.align}
        />
      )))
    return renderColumns
  }

  function getWidth (clentWidth: number) {
    return Math.min(calcWidth, clentWidth)
  }

  function rowClassNameGetter (rowIndex: number) {
    if (rowIndex === scrollToRow) {
      return 'active-row'
    }
    return ''
  }

  return (
    <AutoSizer>
      {({ height, width }) => (
        <Table
          className={`virtual-table ${bordered ? '' : 'no-border'}`}
          rowHeight={rowHeight || 50}
          rowsCount={list.length}
          width={props.width || getWidth(width)}
          maxHeight={props.height || height}
          headerHeight={headerHeight || 50}
          showScrollbarX={false}
          showScrollbarY={false}
          scrollToRow={scrollToRow}
          rowClassNameGetter={rowClassNameGetter}
          onRowClick={onRowClick}
          onRowDoubleClick={onRowDoubleClick}
        >
          {getColumns()}
        </Table>
      )}
    </AutoSizer>
  )
}

export default forwardRef(VirtualTable)

// interface FVirtualTable<P ={}, T={}> extends React.FunctionComponent<VirtualTableProps<P>> {
//   <P>(props: React.PropsWithChildren<VirtualTableProps<P>> & React.RefAttributes<T>, context?: any): React.ReactElement | null;

// }
// export default forwardRef(VirtualTable) as FVirtualTable
