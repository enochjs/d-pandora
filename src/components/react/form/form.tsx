import React, { forwardRef, useImperativeHandle, useEffect } from 'react'
import { Form as AntdForm, Row } from 'antd'
import FormContext from './formContext'
import { FormProps, FormHandles } from './interface'

import './style.less'


function Form (props: FormProps, ref?: React.Ref<FormHandles>): JSX.Element {
  function setFormValue (value: any) {
    props.form.setFieldsValue(value)
  }

  function getFormValue () {
    return props.form.getFieldsValue()
  }

  useEffect(() => {
    props.initialValue && props.form?.setFieldsValue(props.initialValue)
  }, [props.initialValue])

  useImperativeHandle(ref, () => ({
    setFormValue,
    getFormValue,
    validate: props.form.validateFields,
    clear: props.form.resetFields,
  }))

  return (
    <AntdForm className={`form-wrapper ${props.className}`}>
      <FormContext.Provider value={props}>
        <Row gutter={16}>
          {props.children}
        </Row>
      </FormContext.Provider>
    </AntdForm>
  )
}

export default AntdForm.create<FormProps>({
  onValuesChange (props, value, allValues) {
    props.onValuesChange && props.onValuesChange(allValues)
  },
})(forwardRef(Form))
