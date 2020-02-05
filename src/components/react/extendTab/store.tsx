import { createStore } from 'east-store'
import createStorage from 'utils/createStorage'


export interface ExtendTabData {
  activeKey: string;
  moreActiveKey: string;
  activeTab: string;
}

type ExtendTabDataStorage = { [key: string]: ExtendTabData }

function createTabStore (storeName: string) {
  const storage = createStorage<ExtendTabDataStorage>(storeName)

  const extendTabStore = createStore({}, {
    setActiveKey: (value: string, id: string) => (state) => {
      if (!state[id]) {
        state[id] = {
          activeKey: '',
          moreActiveKey: '',
          activeTab: '',
        }
      }
      state[id].activeKey = value
      // state[id].activeTab = value
    },
    setActiveTab: (value: string, id: string) => (state) => {
      if (!state[id]) {
        state[id] = {
          activeKey: '',
          moreActiveKey: '',
          activeTab: '',
        }
      }
      state[id].activeTab = value
    },
    setMoreActiveKey: (value: string, parent: string, id: string) => (state) => {
      if (!state[id]) {
        state[id] = {
          activeKey: '',
          moreActiveKey: '',
          activeTab: '',
        }
      }
      state[id].moreActiveKey = value
      // state[id].activeTab = value
      // state[id].activeKey = parent
    },
  }, {
    persist: storage,
  })
  return extendTabStore
}

export default createTabStore
