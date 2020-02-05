// you common store
import { createStore } from 'east-store'

const commonStore = createStore({
  ...(window as any).$GLOBALCONFIG,
}, {})

export default commonStore
