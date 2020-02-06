import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Col, Modal } from 'antd'
import moment from 'moment'
import Form, {
  InputItem,
  InputNumberItem,
  SelectItem,
  CheckboxItem,
  RadioItem,
  TreeSelectItem,
  DatePickerItem,
  RangePickerItem,
} from 'components/form/index'
import UploadExcel, { UploadExcelHandles } from 'components/upload/excel'
import { fetchUploadUserApi } from 'api/user'
import AddEdit, { ImperativeHandles } from './addEdit'
import userListStore from './store'

export default function UserList () {
  const addEdit = useRef<ImperativeHandles>(null)
  const uploadRef = useRef<UploadExcelHandles>(null)

  const [state, actions] = userListStore.useStore()
  const [visible, setVisible] = useState(false)

  function handleEdit (record: any) {
    if (addEdit && addEdit.current) {
      addEdit.current.show({
        ...record,
        datePickerItem: moment(record.datePickerItem),
        rangePickerItem: [moment(record.rangePickerItem[0]), moment(record.rangePickerItem[1])],
      }, 'edit')
    }
  }

  function handleSubmit () {
    actions.fetchTableData({ ...state.formValue, currentPage: 1 })
  }

  function handleReset () {
    actions.setFormValue()
  }

  function onPageChange (current: number) {
    actions.fetchTableData({ ...state.formValue, currentPage: current })
  }

  function handleAdd () {
    if (addEdit && addEdit.current) {
      addEdit.current.show({})
    }
  }

  function getColumns () {
    return [
      {
        title: '序号',
        width: 100,
        key: 'index',
        render: (text: string, record: any, index: number) => index + 1,
      },
      {
        title: 'inputItem',
        width: 100,
        key: 'inputItem',
        dataIndex: 'inputItem',
      },
      {
        title: 'inputNumberItem',
        width: 100,
        key: 'inputNumberItem',
        dataIndex: 'inputNumberItem',
      },
      {
        title: 'selectItem',
        width: 100,
        key: 'selectItem',
        dataIndex: 'selectItem',
      },
      {
        title: 'radioItem',
        width: 100,
        key: 'radioItem',
        dataIndex: 'radioItem',
      },
      {
        title: 'checkboxItem',
        width: 100,
        key: 'checkboxItem',
        dataIndex: 'checkboxItem',
      },
      {
        title: 'treeSelectItem',
        width: 100,
        key: 'treeSelectItem',
        dataIndex: 'treeSelectItem',
      },
      {
        title: 'datePickerItem',
        width: 100,
        key: 'datePickerItem',
        dataIndex: 'datePickerItem',
      },
      {
        title: 'rangePickerItem',
        width: 100,
        key: 'rangePickerItem',
        dataIndex: 'rangePickerItem',
      },
      {
        key: 'detail',
        title: '操作',
        dataIndex: 'id',
        width: 120,
        render: (id: string, record: any) => (
          <div>
            <Button size="small" type="primary" onClick={() => handleEdit(record)}>编辑</Button>
            <Link to={`/order/detail/${id}`}>查看</Link>
          </div>
        ),
      },
    ]
  }

  function handleImport () {
    uploadRef.current?.handleUpload()
  }

  function handleExport () {
    actions.fetchUseListExport('testttt')
  }

  return (
    <div>
      <Form
        formValue={state.formValue}
        formFieldChange={actions.formFieldChange}
      >
        <InputItem
          span={6}
          rules={[{ required: true }]}
          id="inputItem"
          formItemLabel="InputItem"
        />
        <InputNumberItem
          span={6}
          rules={[{ required: true }]}
          id="inputNumberItem"
          formItemLabel="InputNumberItem"
        />
        <SelectItem
          span={6}
          id="selectItem"
          rules={[{ required: true }]}
          optionValueKey="code"
          optionLabelKey="mean"
          options={[{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }]}
          formItemLabel="SelectItem"
        />
        <RadioItem
          span={6}
          id="radioItem"
          rules={[{ required: true }]}
          optionValueKey="code"
          optionLabelKey="mean"
          options={[{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }]}
          formItemLabel="RadioItem"
        />
        <CheckboxItem
          span={6}
          id="checkboxItem"
          formItemLabel="RadioItem"
        />
        <TreeSelectItem
          span={6}
          id="treeSelectItem"
          treeData={state.treeData}
          formItemLabel="TreeSelectItem"
        />
        <DatePickerItem
          span={6}
          id="datePickerItem"
          formItemLabel="DatePickerItem"
          labelCol={5}
          wrapperCol={14}
        />
        <RangePickerItem
          span={12}
          id="rangePickerItem"
          formItemLabel="RatePickerItem"
          showTime
          labelCol={5}
          wrapperCol={14}
        />
        <Col style={{ float: 'right', textAlign: 'right' }} className="pull-right">
          <Button className="mr8" onClick={handleReset}>clear</Button>
          <Button type="primary" onClick={handleSubmit}>submit</Button>
        </Col>
      </Form>
      <div className="mb8 mt8">
        <Button className="mr16" type="primary" onClick={handleAdd}>新增</Button>
        <Button className="mr16" type="primary" onClick={() => setVisible(true)}>上传文件</Button>
        <Button className="mr16" type="primary" onClick={handleExport}>
          批量导出
        </Button>
      </div>
      <Table
        loading={state.tableLoading}
        columns={getColumns()}
        dataSource={state.tableData.data}
        bordered
        rowKey="id"
        size="small"
        pagination={{
          onChange: onPageChange,
          pageSize: state.tableData.pageSize,
          total: state.tableData.totalCount,
          current: state.tableData.currentPage,
        }}
      />
      <AddEdit ref={addEdit} />
      <Modal
        title="上传文件"
        visible={visible}
        onOk={handleImport}
        onCancel={() => setVisible(false)}
      >
        <UploadExcel
          ref={uploadRef}
          url={fetchUploadUserApi}
          maxLength={1}
          messageTip={(result) => result?.data && (<div>共{result?.data?.totalCount}条, 成功{result?.data?.success}条, 失败{result?.data?.fail}条</div>)}
        />
      </Modal>
    </div>
  )
}
