import moment from 'moment'
import { fetchUserListApi, fetchUseListExportApi } from 'api/user'
import { createStore } from 'east-store'

const initFormValue = {
  inputItem: '123456',
  selectItem: '2',
  treeSelectItem: ['0-1'],
  rangePickerItem: [moment(), moment()],
}

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    key: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
        key: '0-0-1',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
    key: '0-1',
  },
]


const userListStore = createStore({
  tableData: {
    totalCount: 0,
    currentPage: 1,
    pageSize: 20,
    data: [],
  },
  formValue: initFormValue,
  treeData,
  tableLoading: false,
}, {
  toggleLoading: () => (state) => {
    state.tableLoading = !state.tableLoading
  },
  formFieldChange: (value: typeof initFormValue) => (state) => {
    state.formValue = {
      ...state.formValue,
      ...value,
    }
    return state
  },
  setFormValue: () => (state) => {
    state.formValue = {
      ...initFormValue,
    }
    return state
  },
  fetchTableData: (query) => async (state) => {
    userListStore.getActions().toggleLoading()
    const result = await fetchUserListApi(query)
    userListStore.getActions().toggleLoading()
    state.tableData = result
    return state
  },
  fetchUseListExport: (filename: string, query?: any) => () => {
    fetchUseListExportApi(query, filename)
  },
})

export default userListStore
