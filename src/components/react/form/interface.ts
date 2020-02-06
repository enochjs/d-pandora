import { FormComponentProps } from 'antd/es/form'
import { SelectProps } from 'antd/es/select'
import { CascaderProps } from 'antd/es/cascader'
import { InputProps, TextAreaProps } from 'antd/es/input'
import { InputNumberProps } from 'antd/es/input-number'
import { RadioProps } from 'antd/es/radio'
import { CheckboxProps } from 'antd/es/checkbox'
import { TreeSelectProps } from 'antd/es/tree-select'
import { DatePickerProps, RangePickerProps } from 'antd/es/date-picker/interface'
import { UploadImageProps } from 'components/upload/image'

export interface FormProps extends FormComponentProps {
  className?: string;
  children: React.ReactNode;
  initialValue?: any;
  onValuesChange?: (allValues: any) => void;
}

interface FormItemProps {
  id: string;
  labelCol?: number;
  wrapperCol?: number;
  span?: number;
  rules?: any[];
  formItemLabel?: string;
  initialValue?: any;
}


export declare type OmitAttrs = 'id' | 'form'

export interface InputItemProps extends FormItemProps, Omit<InputProps, OmitAttrs> {
}

export interface TextAreaItemProps extends FormItemProps, Omit<TextAreaProps, OmitAttrs> {
}

export interface InputNumberItemProps extends FormItemProps, Omit<InputNumberProps, OmitAttrs> {
}

export interface SelectItemProps extends FormItemProps, Omit<SelectProps, OmitAttrs> {
  optionValueKey: string;
  optionLabelKey: string;
  optionPinyinKey?: string;
  options: any[];
}

export interface CascaderItemProps extends FormItemProps, Omit<CascaderProps, OmitAttrs> {
  options: any[];
}

export interface RadioItemProps extends FormItemProps, Omit<RadioProps, OmitAttrs> {
  options: any[];
  optionValueKey?: string;
  optionLabelKey?: string;
  optionSpan?: number;
}

export interface CheckboxItemProps extends FormItemProps, Omit<CheckboxProps, OmitAttrs> {
  options?: any[];
  // 每个checkbox 占用列数
  optionSpan?: number;
  optionValueKey?: string;
  optionLabelKey?: string;
  checkBoxLabel?: React.ReactNode | string;
}

export interface TreeSelectItemProps extends FormItemProps, Omit<TreeSelectProps<any>, OmitAttrs> {
}

export interface DatePickerItemProps extends FormItemProps, Omit<DatePickerProps, OmitAttrs> {
}

export interface RangePickerItemProps extends FormItemProps, Omit<RangePickerProps, OmitAttrs> {
}

export interface IFormColumnValue {
  id: string | string[];
  type: 'citySelect' | 'platformSelect' | 'userSearch' | 'datePicker' | 'select' | 'rangePicker' | 'text' | 'cascader';
  formItemLabel: string;
  onChange?: Function;
  options?: any[];
  optionValueKey?: string;
  optionLabelKey?: string;
  optionPinyinKey?: string;
  allowClear?: boolean;
  validate?: Function;
  rules?: any[];
  span?: number;
  labelCol?: any;
  wrapperCol?: any;
  onSearch?: Function;
  placeholder?: any;
  mode?: any;
  showTime?: boolean | object;
  format?: string;
  dropdownMatchSelectWidth?: boolean;
  searchType?: 'user' | 'rider' | 'staff';
  cityId?: string | number;
}

export interface SearchFormProps extends FormComponentProps {
  formColumns: IFormColumnValue[];
  formValue: any;
  formFieldChange: Function;
  className?: string;
  onSearch: Function;
  onClear?: Function;
  extra?: React.ReactNode | string;
  extraPosition?: 'left' | 'right';
}

export declare type ValidateCallback<V> = (errors: any, values: V) => void

export interface FormHandles {
  setFormValue(value: any): void;
  getFormValue(): any;
  validate(callback: ValidateCallback<any>): void;
  clear(): void;
}


export interface UploadImageItemProps extends UploadImageProps, FormItemProps {
  id: string;
}

