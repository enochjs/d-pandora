```javascript

@start
@name SearchForm
@prefix sf
@content
<SearchForm
  formColumns={getFormColumns()}
  formValue={state.formValue}
  formFieldChange={actions.formFieldChange}
  onSearch={handleSubmit}
/>
@end

@start
@name SearchForm-getFormColumns
@prefix sfcolumns
@content
function getFormColumns () {
  const formColumns: IFormColumnValue[] = [${value}]
  return formColumns
}
@description getFormColumns
@end

@start
@name SearchForm-colums-text
@prefix sfctext
@content
{
  type: 'text',
  id: 'shopId',
  formItemLabel: 'ID',
  span: 6,
},
@description searchformColumns
@end

@start
@name SearchForm-colums-select
@prefix sfcselect
@content
{
  type: 'select',
  id: 'status',
  formItemLabel: '状态',
  options: [{ code: 1, mean: 'a' }, { code: 2, mean: 'b' }],
  optionLabelKey: 'mean',
  optionValueKey: 'code',
  span: 6,
},
@description searchformColumns
@end


@start
@name SearchForm-colums-rangePicker
@prefix sfcrangePicker
@content
{
  type: 'rangePicker',
  id: ['start', 'end'],
  formItemLabel: '日期',
  allowClear: true,
  span: 12,
},
@description searchformColumns
@end


@start
@name SearchForm-colums-userSearch
@prefix sfcuserSearch
@content
{
  type: 'userSearch',
  id: 'userSearch',
  cityId: '1',
  searchType: 'staff',
  formItemLabel: '员工',
  allowClear: true,
  span: 6,
},
@description searchformColumns
@end


```