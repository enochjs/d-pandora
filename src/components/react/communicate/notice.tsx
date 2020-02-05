import React, { useRef, useEffect, useState } from 'react'
import { message } from 'antd'
import { SelectValue } from 'antd/lib/select'
import DIcon from 'components/Icon'
import Popover from 'components/modal/popover'
import Form, { BraftEditorItem, FormHandles, SelectItem } from 'components/form'
import { fetchRiderMessageTitle, fetchRiderMessagePush } from 'api/rider'
import BraftEditor from 'braft-editor'
import commonStore from 'store/common'

import 'braft-editor/dist/index.css'

interface Iprops {
  id: string;
  cityId: string;
}

interface Templates {
  title: string;
  msgContent: string;
}

interface NoticeItem {
  id: number;
  h5Title: string;
  msgContent: string;
}

function Notice (props: Iprops) {
  const { id, cityId } = props
  const [visible, setVisible] = useState(false)
  const formRef = useRef<FormHandles>(null)
  const [data, setData] = useState<NoticeItem[]>([])
  const [{ STAFFINFO }] = commonStore.useStore()

  // 获取短信模板配置
  useEffect(() => {
    fetchRiderMessageTitle().then((result) => {
      setData(result.result || [])
    })
  }, [])

  const handleIdChange = (value: SelectValue) => {
    const selected = data?.find((item) => item.id === value)
    formRef?.current?.setFormValue({
      content: BraftEditor.createEditorState(selected?.msgContent),
    })
  }

  const handleOk = () => {
    formRef?.current?.validate(async (err: Error, values: any) => {
      if (err) {
        return
      }
      const selected = data?.find((item) => item.id === values.id)
      const result = await fetchRiderMessagePush({
        cityId,
        targetId: id,
        title: selected?.h5Title,
        content: encodeURIComponent(values.content.toHTML()),
        openId: STAFFINFO.id,
        oper: STAFFINFO.name,
        h5TemplateId: values.id,
      })
      if (result) {
        message.success('消息发送成功')
        setVisible(false)
      }
    })
  }

  return (
    <Popover
      visible={visible}
      width={470}
      onOk={handleOk}
      onCancel={() => setVisible(false)}
      onVisibleChange={(visible) => setVisible(visible)}
      button={(<DIcon title="发送消息" type="information" className="icon-modal-icon" />)}
      title="发送消息"
    >
      <Form wrappedComponentRef={formRef}>
        <SelectItem
          id="id"
          rules={[{ required: true, message: '消息类型必选' }]}
          optionValueKey="id"
          optionLabelKey="h5Title"
          options={data}
          formItemLabel="消息标题"
          labelCol={4}
          wrapperCol={20}
          onChange={handleIdChange}
        />
        <BraftEditorItem
          id="content"
          style={{ height: '300px', overflow: 'auto' }}
          controls={['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator']}
          wrapperCol={24}
        />
      </Form>
    </Popover>
  )
}

export default Notice
