import React, { useState, ReactNode, useImperativeHandle, forwardRef } from 'react'
import { Upload, Icon, Alert, List, message, Button } from 'antd'
import { RcFile, UploadFile } from 'antd/es/upload/interface'
import { fetchFormData } from 'utils/fetchApi'
import './style.less'

export interface UploadExcelProps {
  disabled?: boolean;
  maxLength?: number;
  uploadText?: string | ReactNode;
  maxSize?: number;
  url: string;
  // true auto upload when file validate success, default false;
  flashUpload?: boolean;
  onChange?: (fileList: RcFile[]) => void | PromiseLike<void>;
  // 导入结果头部提示
  messageTip?: (result?: UploadResult) => ReactNode | string;
}

interface ErrorProps {
  index: number;
  message: string;
}

interface UploadResult {
  data: any;
  errorList: ErrorProps[];
}

export interface UploadExcelHandles {
  handleUpload(): void;
  getFileList(): RcFile[];
}

function UploadExcel (props: UploadExcelProps, ref?: React.Ref<UploadExcelHandles>): JSX.Element {
  const { disabled, maxLength, uploadText, maxSize, url, flashUpload, messageTip } = props

  const [fileList, setFileList] = useState<RcFile[]>([])

  const [errorList, setErrorList] = useState<ErrorProps[]>([])

  const [uploadResult, setUploadResult] = useState<UploadResult>()

  async function handleUpload () {
    setErrorList([])
    const formData = new FormData()
    fileList.forEach((file: any) => {
      formData.append('files', file)
    })
    const result: UploadResult = await fetchFormData(url, formData)
    if (result) {
      message.success('上传成功！')
    }
    if (result.errorList && result.errorList.length) {
      setErrorList(result.errorList)
    }
    setUploadResult(result)
  }

  function getFileList (): RcFile[] {
    return fileList
  }

  // export handleUpload function to custorm upload
  useImperativeHandle(ref, () => ({
    handleUpload,
    getFileList,
  }))

  function handleBeforeUpload (file: RcFile): boolean {
    if (maxSize && maxSize < file.size) {
      message.error('文件大小超过限制，请重新上传！')
      return false
    }
    if (!file.name.includes('.xlsx')) {
      message.error('请上传excel格式的文件！')
      return false
    }
    setFileList([...fileList, file])
    return !!flashUpload
  }

  function handleChange ({ file }: { file: UploadFile }) {
    if (file.status === 'done' && flashUpload) {
      handleUpload()
    }
  }

  function handleRemove (file: UploadFile) {
    fileList.splice(fileList.findIndex((f) => f.uid === file.uid), 1)
    setFileList([...fileList])
  }

  const uploadButton = (
    <Button type="primary">
      <Icon type="upload" />
      {uploadText || '上传文件'}
    </Button>
  )

  return (
    <div className="upload-excel">
      <Upload
        fileList={fileList}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        onRemove={handleRemove}
      >
        {disabled || (maxLength && fileList.length >= maxLength) ? null : uploadButton}
      </Upload>
      <div className="error-message mt16">
        {messageTip ? messageTip(uploadResult) : null}
        <Alert
          key="dfa"
          type="error"
          message={
            (
              <List
                itemLayout="horizontal"
                dataSource={errorList}
                renderItem={(item) => (
                  <List.Item>{`第${item.index + 1}行，${item.message}`}</List.Item>
                )}
              />
            )
          }
          showIcon={false}
          banner
        />
      </div>
    </div>
  )
}

export default forwardRef(UploadExcel)
