// 项目的token name 每个项目不同，最好自己根据项目名改下
export const PROJECT_TOKERN_NAME = 'project_token_name'
export const OPEN_TOPTAB_EVENT = 'open_top_tab_event'
// 菜单列表
export const menuList = [
  { name: 'Users', url: '/user/list', icon: '' },
  { name: 'RiderDetail', url: '/rider/detail', icon: '' },
  { name: 'RiderCheck', url: '/rider/check', icon: '' },
  { name: 'VirtualTable', url: '/virtual/table', icon: '' },
]


let BATMAN_URL = 'http://127.0.0.1:4000'

switch (window.location.hostname) {
  // 本地开发
  case '127.0.0.1':
  case 'localhost':
    BATMAN_URL = 'http://127.0.0.1:4000'
    break
  // 其他，默认都连开发环境
  default:
    BATMAN_URL = ''
    break
}

export const API_BATMAN = BATMAN_URL
