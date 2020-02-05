import React, { ReactNode } from 'react'
import DIcon from 'components/Icon'
import { Popover, Button } from 'antd'

import './style.less'

interface Iprops {
  title?: string | ReactNode;
  trigger?: 'hover' | 'focus' | 'click' | 'contextMenu' | undefined;
  children: string | ReactNode;
  visible: boolean;
  footer?: null | string | ReactNode;
  button?: ReactNode | string;
  onOk?: () => void;
  onCancel?: () => void;
  okText?: string;
  cancelText?: string;
  onVisibleChange: (visible: boolean) => void;
  width?: number;
}

export default function PopoverModal (props: Iprops) {
  function handleOk () {
    props.onOk && props.onOk()
  }

  function onCancel () {
    props.onCancel && props.onCancel()
  }

  function handleVisibleChange (visible: boolean) {
    props.onVisibleChange(visible)
  }

  return (
    <div className="popover-modal">
      <Popover
        overlayClassName="popover-modal-container"
        content={(
          <div style={{ width: props.width }}>
            {props.children}
            {
              props.footer === null ? '' : (
                <footer className="popover-modal-footer text-right">
                  {
                    props.footer ? props.footer : (
                      <span>
                        <Button onClick={onCancel} className="button mr8">{props.cancelText || '取消'}</Button>
                        <Button onClick={handleOk} type="primary">{props.okText || '确定'}</Button>
                      </span>
                    )
                  }
                </footer>
              )
            }
          </div>
        )}
        title={props.title ? (<div className="title">{props.title}</div>) : null}
        trigger={props.trigger || 'click'}
        visible={props.visible}
        onVisibleChange={handleVisibleChange}
      >
        <span className="popover-modal-btn">
          {props.button || <DIcon title="编辑" type="edit" className="icon-modal-icon" />}
        </span>
      </Popover>
    </div>
  )
}
