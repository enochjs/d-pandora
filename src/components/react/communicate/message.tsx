import React, { useRef, useEffect, useState } from 'react'
import { message } from 'antd'
import { SelectValue } from 'antd/lib/select'
import DIcon from 'components/Icon'
import { mobileReg } from 'utils/regRxp'
import Popover from 'components/modal/popover'
import Form, { TextAreaItem, FormHandles, SelectItem } from 'components/form'
import { fetchMobile, fetchSendSms, fetchMsgConfigEnum } from 'api/common'

interface Iprops {
  type: 'rider' | 'user' | 'shopMobile' | 'shop' | 'shopRegister';
  id: string;
  cityId: string;
  name: string;
  mobile?: string;
}

interface Templates {
  title: string;
  content: string;
}

interface Message {
  type: string;
  msg: Templates[];
}

function Message (props: Iprops) {
  const { id, type, name, cityId, mobile } = props
  const [visible, setVisible] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const [data, setData] = useState<Message[]>([])
  const [templates, setTemplates] = useState<Templates[]>([])

  // 获取短信模板配置
  useEffect(() => {
    fetchMsgConfigEnum().then((result) => {
      setData(result || [])
    })
  }, [])

  const handleTypeChange = (value: SelectValue) => {
    const selected = data?.find((item) => item.type === value)
    setTemplates(selected?.msg || [])
    formRef?.current?.setFormValue({
      content: '',
      inputContent: '',
    })
  }

  const handleContentChange = (value: SelectValue) => {
    const selected = templates?.find((item) => item.title === value)
    if (value !== undefined) {
      formRef?.current?.setFormValue({
        inputContent: selected?.content,
      })
    }
  }

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

  const handleOk = () => {
    formRef?.current?.validate((err: Error, values: any) => {
      if (err) {
        return
      }
      getMobile().then(async (mobile) => {
        await fetchSendSms({
          mobile,
          content: values.inputContent,
          targetName: name,
          objectId: id,
          actionType: type,
        })
        message.success('短信发送成功')
      }).catch(() => {
        message.error('短信发送失败')
      }).finally(() => {
        setVisible(false)
      })
    })
  }

  return (
    <Popover
      visible={visible}
      width={400}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
      onVisibleChange={(visible) => setVisible(visible)}
      button={(<DIcon title="发送短信" type="message" className="icon-modal-icon" />)}
      title="发送短信"
    >
      <Form wrappedComponentRef={formRef}>
        <SelectItem
          id="type"
          rules={[{ required: true, message: '短信类型必选' }]}
          optionValueKey="type"
          optionLabelKey="type"
          options={data}
          formItemLabel=""
          wrapperCol={24}
          span={8}
          onChange={handleTypeChange}
        />
        <SelectItem
          id="content"
          rules={[{ required: true, message: '短信标题不能为空' }]}
          optionValueKey="title"
          optionLabelKey="title"
          options={templates}
          formItemLabel=""
          wrapperCol={24}
          span={16}
          onChange={handleContentChange}
        />
        <TextAreaItem
          id="inputContent"
          wrapperCol={24}
          initialValue=""
          rules={[{
            required: true,
            message: '请输入短信内容',
          }]}
          rows={4}
        />
      </Form>
    </Popover>
  )
}

export default Message
