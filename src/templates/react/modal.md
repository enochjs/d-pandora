```javascript

@start
@name modal
@prefix modal
@content
import React, { useState, useImperativeHandle, forwardRef } from 'react'
import { Modal } from 'antd'

export interface ModalHandles {
  show(): void;
}

interface Iprops {
  riderId: string;
  cityId: string;
  afterClose?: () => void;
}

function ${modal} (props: Iprops, ref: React.Ref<ModalHandles>) {
  const { afterClose } = props
  const [visible, setVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    show () {
      setVisible(true)
      // todo
    },
  }))

  function handleSave () {
    // todo
    setVisible(false)
  }

  function handleCancel () {
    setVisible(false)
  }

  return (
    <Modal
      className="${className}"
      title="${title}"
      visible={visible}
      onCancel={handleCancel}
      onOk={handleSave}
      width={600}
      closable={false}
      afterClose={afterClose}
    >
      { /** todo */ }
    </Modal>
  )
}

export default forwardRef(${modal})

@description dwa-modal
@end

```
