import moment from 'moment'
import {
  fetchRiderRecruit,
} from 'api/yourApi'
import { createStore } from 'east-store'

const initFormValue = {
  cityId: '',
  platformId: '',
  demandId: '',
  recordId: '',
  userId: '',
  startTime: '',
  endTime: '',
  signUpTimeStart: moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00'),
  signUpTimeEnd: moment().format('YYYY-MM-DD 23:59:59'),
}

const initTableData = {
  totalCount: 0,
  currentPage: 1,
  pageSize: 20,
  list: [],
}

const searchTableStore = createStore({
  tableData: initTableData,
  formValue: initFormValue,
  tableLoading: false,
}, {
  toggleLoading: () => (state) => {
    state.tableLoading = !state.tableLoading
  },

  formFieldChange: (value: Partial<typeof initFormValue>) => (state) => {
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
    searchTableStore.getActions().toggleLoading()
    const result = await fetchRiderRecruit(query)
    searchTableStore.getActions().toggleLoading()
    if (result) {
      state.tableData = result
    }
  },
})

export default searchTableStore
