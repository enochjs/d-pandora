import { message } from 'antd'
import { PROJECT_TOKERN_NAME } from 'utils/constants'

function checkStatus(resp: Response) {
  if (resp.status === 302) {
    window.location.href = '/login'
  }
  if (resp.status === 404) {
    message.error('page not found')
  }
  if (resp.status === 403) {
    message.error('没有权限，请联系运营人员！')
  }
  return resp
}

function mergeParams(params: any) {
  const token = localStorage.getItem(PROJECT_TOKERN_NAME)
  return {
    ...params,
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      Connection: 'keep-alive',
      ...params.headers,
      authorization: token,
    },
  }
}

function fetchData(url: string, params: any) {
  const fetchparam = mergeParams(params)
  return fetch(url, fetchparam).then((resp) => checkStatus(resp))
}

const fetchJSON = (url: string, params: any) =>
  fetchData(url, params)
    .then((resp) => resp.json())
    .then((result: { status: number; data: any; msg?: string }) => {
      if (result.status) {
        return result.data
      }
      message.error(result.msg, 2)
      return false
    })

const downloadFetch = (url: string, params: any, filename?: string) =>
  fetchData(url, params)
    .then((resp) => resp.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename || '导出.xlsx'
      document.body.appendChild(a)
      a.click()
      a.remove()
    })

const buildParams = (obj: any) => {
  if (!obj) {
    return ''
  }
  const params: string[] = []
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.push(`${key}=${obj[key]}`)
    }
  }
  return params.join('&')
}

const fetchJSONByMethod = (method: string, headers?: any, download?: boolean) => (url: string) => (query?: any, filename?: string) => {
  const params: any = {
    method,
    headers: headers || {},
  }
  let queryUrl = url
  if (method === 'GET') {
    if (query) {
      queryUrl += '?'
      for (const key in query) {
        if (query.hasOwnProperty(key)) {
          queryUrl += `&${key}=${query[key] || ''}`
        }
      }
    }
  } else if (method === 'DELETE') {
    for (const key in query) {
      if (query.hasOwnProperty(key)) {
        queryUrl = queryUrl.replace(`:${key}`, query[key])
      }
    }
  } else if (typeof query === 'string') {
    params.body = query
  } else if (headers && headers['Content-Type'] === 'application/json;charset=UTF-8') {
    params.body = JSON.stringify(query)
  } else {
    params.body = buildParams(query)
  }
  if (download) {
    return downloadFetch(queryUrl, params, filename)
  }
  return fetchJSON(queryUrl, params)
}

export const fetchFormData = (url: string, formData: FormData) => fetchJSON(url, { method: 'POST', body: formData })

export const fetchJSONByGet = fetchJSONByMethod('GET', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByPost = fetchJSONByMethod('POST', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByPut = fetchJSONByMethod('PUT', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByDelete = fetchJSONByMethod('DELETE', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONStringByPost = fetchJSONByMethod('POST', { 'Content-Type': 'application/json;charset=UTF-8' })

export const fetchJSONStringByPut = fetchJSONByMethod('PUT', { 'Content-Type': 'application/json;charset=UTF-8' })

export const fetchDownloadByGet = fetchJSONByMethod('GET', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }, true)
