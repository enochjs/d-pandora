import React, { useState } from 'react'
import { message, Button } from 'antd'
import DIcon from 'components/Icon'
import { mobileReg } from 'utils/regRxp'
import Popover from 'components/modal/popover'
import { fetchMobile } from 'api/common'
import commonStore from 'store/common'

interface Iprops {
  type: 'rider' | 'user' | 'shopMobile' | 'shop' | 'shopRegister';
  id: string;
  cityId: string;
  mobile?: string;
}

function Mobile (props: Iprops) {
  const { id, type, cityId, mobile } = props
  const [visible, setVisible] = useState(false)
  const [{ STAFFINFO }] = commonStore.useStore()

  const getMobile = () => new Promise((resolve, reject) => {
    if (mobileReg.test(mobile || '')) {
      resolve(mobile)
    } else {
      const result = fetchMobile({ idType: type, id, cityId })
      if (result) {
        resolve(result)
      } else {
        message.error('号码查询失败！')
        reject()
      }
    }
  })

  const handleDiaOut = (value: number) => {
    getMobile().then((mobile) => {
      mobile && fetch('http://kefuapi.dianwoda.com/ib/calloutapi', {
        method: 'POST',
        body: `job_number=${STAFFINFO.code}&show_number_id=${value}&phone=${mobile}`,
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          Connection: 'keep-alive',
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
      }).then((resp) => resp.json()).then((result) => {
        if (result.error) {
          message.error(result.error)
        } else {
          setVisible(false)
        }
      })
    })
  }

  return (
    <Popover
      visible={visible}
      width={88}
      footer={null}
      onVisibleChange={(visible) => setVisible(visible)}
      button={(<DIcon title="打电话" type="mobile" className="icon-modal-icon" />)}
    >
      <Button className="mb8" type="primary" onClick={() => handleDiaOut(1)}>外显号码1</Button>
      <Button type="primary" onClick={() => handleDiaOut(2)}>外显号码2</Button>
    </Popover>
  )
}

export default Mobile
