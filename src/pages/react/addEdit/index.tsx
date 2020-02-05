import React, { useState, useImperativeHandle, forwardRef, useRef } from 'react'
import moment, { Moment } from 'moment'
import { Modal, message } from 'antd'
import Form, {
  InputItem,
  SelectItem,
  FormHandles,
  DatePickerItem,
} from 'components/form/index'
import { fetchRiderGradeNrcqManaulAdd, fetchRiderGradeNrcqManaulUpdate } from 'api/grade'

interface FormValue {
  id?: string;
  type: number;
  beginTm: Moment | null;
  endTm: Moment | null;
  reason: string;
  num: number;
}

export interface AddEditHandles {
  show(formValue: FormValue): void;
}

interface Iprops {
  riderId: string;
  cityId: string;
  afterClose?: () => void;
  type: 'add' | 'edit';
}

function AddEdit (props: Iprops, ref: React.Ref<AddEditHandles>) {
  const formRef = useRef<FormHandles>()

  const [visible, setVisible] = useState(false)
  const [formValue, setFormValue] = useState<FormValue>()

  useImperativeHandle(ref, () => ({
    show (formValue: FormValue) {
      setVisible(true)
      setFormValue({
        id: formValue.id,
        type: formValue.type,
        beginTm: formValue.beginTm ? moment(formValue.beginTm) : null,
        endTm: formValue.endTm ? moment(formValue.endTm) : null,
        reason: '',
        num: formValue.num,
      })
    },
  }))

  function handleSave () {
    formRef.current?.validate(async (err, values) => {
      if (!err) {
        let result
        if (props.type === 'add') {
          result = await fetchRiderGradeNrcqManaulAdd({
            cityId: props.cityId,
            riderId: props.riderId,
            num: values.num * values.type,
            beginTm: values.beginTm,
            endTm: values.endTm,
            reason: values.reason,
          })
        } else {
          result = await fetchRiderGradeNrcqManaulUpdate({
            id: formValue?.id,
            cityId: props.cityId,
            riderId: props.riderId,
            numOld: formValue?.type && formValue?.num ? formValue?.type * formValue?.num : '',
            num: values.num * values.type,
            beginTm: values.beginTm,
            endTm: values.endTm,
            reason: values.reason,
          })
        }
        if (result) {
          message.success('操作成功')
          setVisible(false)
        }
      }
    })
  }

  function handleCancel () {
    setVisible(false)
  }

  const validateTime = (rule: any, value: Moment, callback: any) => {
    const { beginTm, endTm } = formRef.current?.getFormValue()
    if (moment(beginTm).isAfter(moment(endTm), 'day')) {
      callback('起始日期不能大于截止日期！')
    }
    callback()
  }

  return (
    <Modal
      title="禁用"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleSave}
      width={600}
      centered
      afterClose={props.afterClose}
      zIndex={1050}
    >
      <Form
        wrappedComponentRef={formRef}
        initialValue={formValue}
      >
        <SelectItem
          id="type"
          rules={[{ required: true }]}
          optionValueKey="code"
          optionLabelKey="mean"
          options={[{ code: 1, mean: '调增' }, { code: -1, mean: '调减' }]}
          formItemLabel="人工调整类型"
          style={{ zIndex: 1100 }}
          labelCol={7}
        />
        <InputItem
          id="num"
          formItemLabel="数量"
          labelCol={7}
        />
        <DatePickerItem
          id="beginTm"
          rules={[{ required: true, message: '请选择开始时间' }, { validator: validateTime }]}
          disabled={props.type === 'edit'}
          formItemLabel="开始时间"
          labelCol={7}
        />
        <DatePickerItem
          id="endTm"
          rules={[{ required: true, message: '请选择结束时间' }, { validator: validateTime }]}
          disabled={props.type === 'edit'}
          formItemLabel="结束时间"
          labelCol={7}
        />
        <InputItem
          id="reason"
          formItemLabel="调整原因"
          labelCol={7}
        />
      </Form>
    </Modal>
  )
}

export default forwardRef(AddEdit)
