import { message } from 'antd'
import { API_BATMAN } from './constants'

function checkStatus (response: Response) {
  if ((response.status >= 200 && response.status < 300) || response.status === 500) {
    return response
  }
  const error: any = new Error(response.statusText)
  error.response = response
  throw error
}

function catchError (error: any) {
  const { response } = error
  if (!response) {
    return
  }
  if (response.status === 401) {
    message.error('登录信息已过期！')
    process.env.NODE_ENV === 'production' && (window as any).SESSION_TIMEOUT_LOGOUT && (window as any).SESSION_TIMEOUT_LOGOUT()
  } else if (response.status === 403) {
    // alert('你缺少相关权限，部分功能无法使用')
  }
}

function fetchData (url: string, params: any) {
  const fetchparam = {
    ...params,
    credentials: 'include',
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
      ...params.headers,
    },
  }
  const realUrl = url.indexOf('http') === -1 ? `${API_BATMAN}/${url}` : url
  return fetch(realUrl, fetchparam).then((resp) => checkStatus(resp))
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
    }).catch(catchError)

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
      params.push(`${key}=${obj[key] === undefined ? '' : obj[key]}`)
    }
  }
  return params.join('&')
}

const fetchJSONByMethod = (method: string, headers?: any) => (url: string) => (query?: any, filename?: string) => {
  const params: any = {
    method,
    headers: headers || {},
  }
  let queryUrl = url
  switch (method) {
    case 'GET':
    case 'DOWNLOAD':
      if (query) {
        queryUrl += '?'
        for (const key in query) {
          if (query.hasOwnProperty(key)) {
            queryUrl += `&${key}=${query[key] === undefined ? '' : query[key]}`
          }
        }
      }
      break
    case 'JSONPOST':
      query = JSON.stringify(query)
      params.method = 'POST'
      params.body = query
      break
    case 'JSONPUT':
      query = JSON.stringify(query)
      params.method = 'PUT'
      params.body = query
      break
    case 'POST':
    case 'PUT':
    case 'DELETE':
      params.body = buildParams(query)
      break
    default: break
  }
  if (method === 'DOWNLOAD') {
    params.method = 'GET'
    return downloadFetch(queryUrl, params, filename)
  }
  return fetchJSON(queryUrl, params)
}

export const fetchFormData = (url: string, formData: FormData) => fetchJSON(url, { method: 'POST', body: formData })

export const fetchJSONByGet = fetchJSONByMethod('GET', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByPost = fetchJSONByMethod('POST', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByPut = fetchJSONByMethod('PUT', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONByDelete = fetchJSONByMethod('DELETE', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' })

export const fetchJSONStringByPost = fetchJSONByMethod('JSONPOST', { 'Content-Type': 'application/json;charset=UTF-8' })

export const fetchJSONStringByPut = fetchJSONByMethod('JSONPUT', { 'Content-Type': 'application/json;charset=UTF-8' })

export const fetchDownloadByGet = fetchJSONByMethod('DOWNLOAD')
