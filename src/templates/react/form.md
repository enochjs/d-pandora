```javascript

@start
@name form-text-item
@prefix ftext
@content
<InputItem
  id={${id}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
  placeholder={${placeholder}}
/>
@description dwd-form-text-item
@end


@start
@name form-select-item
@prefix fselect
@content
<SelectItem
  id={${id}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
  options={${options}}
  allowClear={${allowClear}}
  optionValueKey={${optionValueKey}}
  optionLabelKey={${optionLabelKey}}
/>

@description dwd-form-select-item
@end


@start
@name form-cascader-item
@prefix fcascader
@content
<CascaderItem
  id={${id}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
  options={${options}}
  allowClear={${allowClear}}
  onChange={${onChange}}
/>
@description dwd-form-cascader-item
@end

@start
@name form-datapicker-item
@prefix fdatapicker
@content
<DatePickerItem
  format={item.format}
  id={${id}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
  showTime={${showTime}}
/>
@description description
@end

@start
@name form-rangerPicker-item
@prefix frangerpicker
@content
<RangePickerItem
  format={${format}}
  showTime={${showTime}}
  id={${id}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
  placeholder={${placeholder}}
/>
@description description
@end

@start
@name form-userSelect-item
@prefix fuserselect
@content
<UserSelectItem
  id={${id}}
  cityId={${cityId}}
  type={${searchType}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
/>
@description description
@end

@start
@name form-classify-select-item
@prefix fclassifyselect
@content
<ClassifySelectItem
  id={${id}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  mode={${mode}}
  classifys={${options}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
  allowClear={${allowClear}}
/>
@description description
@end

@start
@name form-platform-select-item
@prefix fplatformselect
@content
<PlatformSelectItem
  id={${id}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  mode={${mode}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
  allowClear={${allowClear}}
/>
@description description
@end

@start
@name form-city-select-item
@prefix fcityselect
@content
<CitySelectItem
  id={${id}}
  type={${type}}
  labelCol={${labelCol}}
  wrapperCol={${wrapperCol}}
  formItemLabel={${formItemLabel}}
  rules={${rules}}
  onChange={${onChange}}
  allowClear={${allowClear}}
/>
@description description
@end

@start
@name form-checkbox-item
@prefix fcheckbox
@content
<CheckboxItem
  id="checkboxItem"
  formItemLabel="CheckboxItem"
  labelCol={7}
/>
@description description
@end

@start
@name form-radio-item
@prefix fradio
@content
<RadioItem
  id={${id}}
  rules={${rules}}
  optionValueKey={${optionValueKey}}
  optionLabelKey={${optionLabelKey}}
  options={${options}}
  formItemLabel={${formItemLabel}}
  labelCol={${labelCol}}
/>
@description description
@end

```