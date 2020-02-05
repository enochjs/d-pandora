```javascript
@start
@name popover-modal
@prefix popovermodal
@content
import React, { useState, useRef } from 'react'
import { debounce } from 'lodash-es'
import Form, { FormHandles, SelectItem, InputItem } from 'components/form'
import PopoverModal from 'components/modal/popover'
import { fetchRiderGradeActiveModify } from 'api/grade'

interface Iprops {
  cityId: string;
  riderId: string;
  afterClose?: () => void;
}

export default function ${name} (props: Iprops) {
  const [visible, setVisible] = useState<boolean>(false)
  const formRef = useRef<FormHandles>(null)

  function handleSavle () {
    formRef.current?.validate(async (error, values) => {
      if (error) {
        return
      }
      const result = await fetchRiderGradeActiveModify({
        cityId: props.cityId,
        riderId: props.riderId,
        score: values.type * values.score,
        businessName: values.reason,
      })
      if (result) {
        setVisible(false)
        setTimeout(() => {
          props.afterClose && props.afterClose()
        }, 100)
      }
    })
  }

  return (
    <PopoverModal
      visible={visible}
      onOk={debounce(handleSavle, 200)}
      onCancel={() => setVisible(false)}
      onVisibleChange={setVisible}
      width={400}
    >
      <div>
        <Form wrappedComponentRef={formRef}>
          <SelectItem
            id="type"
            initialValue={1}
            rules={[{ required: true }]}
            optionValueKey="code"
            optionLabelKey="mean"
            options={[{ code: 1, mean: '调增' }, { code: -1, mean: '调减' }]}
            formItemLabel="人工调整类型"
            labelCol={7}
          />
          <InputItem
            id="score"
            formItemLabel="分值"
            labelCol={7}
          />
          <InputItem
            id="reason"
            formItemLabel="调整原因"
            labelCol={7}
          />
        </Form>
      </div>
    </PopoverModal>
  )
}

@description description
@end
```