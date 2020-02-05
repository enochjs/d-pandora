import { fetchJSONByGet, fetchDownloadByGet } from 'utils/fetchApi'

export const fetchUserListApi = fetchJSONByGet('/api/user/list')
export const fetchUserDetailApi = fetchJSONByGet('/api/user/detail')
export const fetchUploadUserApi = '/api/user/upload'
export const fetchUseListExportApi = fetchDownloadByGet('/api/user/list/export')
