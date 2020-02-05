import React, { useContext } from 'react'
import {
  Form, Input, Select, InputNumber, Radio, Checkbox, TreeSelect, DatePicker, Col, Row, Cascader,
} from 'antd'
import UploadImg from 'components/upload/image'
import FormContext from './formContext'


import {
  InputItemProps,
  SelectItemProps,
  InputNumberItemProps,
  TextAreaItemProps,
  RadioItemProps,
  CheckboxItemProps,
  TreeSelectItemProps,
  DatePickerItemProps,
  RangePickerItemProps,
  UploadImageItemProps,
  CascaderItemProps,
} from './interface'

const FormItem = Form.Item
const { Option } = Select
const { TextArea } = Input
const { RangePicker } = DatePicker

export function InputItem (props: InputItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...inputProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<Input {...inputProps} />)
        }
      </FormItem>
    </Col>
  )
}

export function InputNumberItem (props: InputNumberItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, className, ...inputNumberProps
  } = props
  return (
    <Col span={span || 24} className={className}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<InputNumber {...inputNumberProps} />)
        }
      </FormItem>
    </Col>
  )
}

export function TextAreaItem (props: TextAreaItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, className, ...inputProps
  } = props
  return (
    <Col span={span || 24} className={className}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<TextArea {...inputProps} />)
        }
      </FormItem>
    </Col>
  )
}

export function SelectItem (props: SelectItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, optionValueKey, optionLabelKey, options, span, initialValue, ...selectProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(
            <Select
              {...selectProps}
            >
              {options && options.map((option, index) => (
                <Option
                  key={index.toString()}
                  value={option[optionValueKey || 'code']}
                >
                  {option[optionLabelKey || 'mean']}
                </Option>
              ))}
            </Select>,
          )
        }
      </FormItem>
    </Col>
  )
}

export function CascaderItem (props: CascaderItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, options, span, initialValue, onChange, size, expandTrigger, allowClear = true,
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(
            <Cascader
              size={size || 'default'}
              options={options}
              expandTrigger={expandTrigger || 'click'}
              allowClear={allowClear}
              onChange={onChange}
            />,
          )
        }
      </FormItem>
    </Col>
  )
}

export function RadioItem (props: RadioItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, optionValueKey, optionLabelKey, options, span, initialValue, optionSpan, ...radioProps
  } = props
  return (
    <Col span={span || 24}>
      <FormItem className="form-radio-item" labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(
            <Radio.Group
              name={id.toString()}
              onChange={props.onChange}
              {...radioProps}
            >
              <Row gutter={8}>
                {options?.map((option, index) => (
                  <Col
                    span={optionSpan || 12}
                    key={optionValueKey ? option[optionValueKey].toString() : index.toString()}
                  >
                    <Radio
                      key={index.toString()}
                      value={optionValueKey && option[optionValueKey]}
                    >
                      {optionLabelKey && option[optionLabelKey]}
                    </Radio>
                  </Col>
                ))}
              </Row>
            </Radio.Group>,
          )
        }
      </FormItem>
    </Col>
  )
}

export function CheckboxItem (props: CheckboxItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, options, optionLabelKey, optionValueKey, optionSpan, checkBoxLabel,
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
            valuePropName: options ? 'value' : 'checked',
          })(
            options ? (
              <Checkbox.Group>
                <Row gutter={8}>
                  {options?.map((option) => (
                    <Col
                      span={optionSpan || 12}
                      key={option[optionValueKey || 'code'].toString()}
                    >
                      <Checkbox value={option[optionValueKey || 'code']}>{option[optionLabelKey || 'mean']}</Checkbox>
                    </Col>
                  ))}
                </Row>
              </Checkbox.Group>
            ) : (<Checkbox>{checkBoxLabel}</Checkbox>),
          )
        }
      </FormItem>
    </Col>
  )
}

export function TreeSelectItem (props: TreeSelectItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...treeSeleteOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<TreeSelect {...treeSeleteOptions} />)
        }
      </FormItem>
    </Col>
  )
}

export function DatePickerItem (props: DatePickerItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...datePickerOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(<DatePicker {...datePickerOptions} />)
        }
      </FormItem>
    </Col>
  )
}

export function RangePickerItem (props: RangePickerItemProps) {
  const { form } = useContext(FormContext)
  const {
    labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, ...rangePickerOptions
  } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(
            <RangePicker
              style={{ width: '100%' }}
              key={id.toString()}
              {...rangePickerOptions}
            />,
          )
        }
      </FormItem>
    </Col>
  )
}

export function UploadImageItem (props: UploadImageItemProps) {
  const { form } = useContext(FormContext)
  const { labelCol, wrapperCol, formItemLabel, rules, id, span, initialValue, maxLength, src, targetModule, disabled, imageBound } = props
  return (
    <Col span={span || 24}>
      <FormItem labelCol={{ span: labelCol || 10 }} wrapperCol={{ span: wrapperCol || 14 }} label={formItemLabel}>
        {
          form.getFieldDecorator(id.toString(), {
            initialValue,
            rules: rules || [],
          })(
            <UploadImg
              maxLength={maxLength}
              src={src}
              targetModule={targetModule}
              disabled={disabled}
              imageBound={imageBound}
              form={form}
            />,
          )
        }
      </FormItem>
    </Col>
  )
}
