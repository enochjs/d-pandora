import { IPersistedStorage } from 'east-store'

const createStorage = <T>(name: string): IPersistedStorage<T> => ({
  set (key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  get (key: string) {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : null
  },
  generateKey () {
    return name
  },
})
export default createStorage
