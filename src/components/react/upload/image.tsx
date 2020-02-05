import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react'
import { Upload, Icon, Modal, message } from 'antd'
import { RcFile, UploadFile, RcCustomRequestOptions } from 'antd/es/upload/interface'
import { WrappedFormUtils } from 'antd/lib/form/Form'
import { fetchFormData } from 'utils/fetchApi'
import './style.less'

export interface UploadImageProps {
  src: string[];
  disabled?: boolean;
  maxLength?: number;
  onChange?: (urlList: string[]) => void;
  targetModule: 'shop' | 'rider' | 'capacityDemand' | 'workorder' | 'feedBack';
  imageTypes?: Array<'png' | 'jpg' | 'jpeg' | 'gif'>;
  imageBound?: {
    width?: number;
    height?: number;
    maxHeight?: number;
    maxWidth?: number;
  };
  beforeUpload?: (file: RcFile, FileList: RcFile[]) => boolean | PromiseLike<void>;
  form?: WrappedFormUtils;
  id?: string;
}

export interface UploadImageHandles {
  getFileList(): UploadFile[];
}

function UploadImage (props: UploadImageProps, ref?: React.Ref<UploadImageHandles>): JSX.Element {
  const { disabled, maxLength, targetModule, imageBound, imageTypes, beforeUpload, src, form, id } = props
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewImage, setPreviewImage] = useState('')
  const [previewVisible, setPreviewVisible] = useState(false)

  useEffect(() => {
    const fileList: any[] = []
    src.map((url, index: number) => fileList.push({ uid: index, status: 'done', url }))
    return () => { setFileList(fileList) }
  }, [props.src])

  function handlePreview (file: UploadFile) {
    setPreviewImage(file.response ? file.response.data && file.response.url : file.url || file.thumbUrl)
    setPreviewVisible(true)
  }

  useImperativeHandle(ref, () => ({
    getFileList: () => fileList,
  }))

  function getImageSize (file: any): Promise<[number, number]> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onload = (e: any) => {
        const src = e.target.result
        const image = new Image()
        image.onload = function () {
          resolve([(this as any)?.width, (this as any)?.height])
        }
        image.onerror = reject
        image.src = src
      }
      fileReader.readAsDataURL(file)
    })
  }

  async function checkImageBound (file: any): Promise<void> {
    if (!imageBound) {
      return Promise.resolve()
    }
    const [fileWidth, fileHeight] = await getImageSize(file)
    const { width, height, maxHeight, maxWidth } = imageBound
    let result = true
    if (!file.type || (imageTypes?.find((t) => file.type.includes(t)))) {
      message.error(`图片类型仅支持${imageTypes}`)
      result = false
    }
    if (width && fileWidth !== width) {
      message.error(`图片宽度必须为${width}px`)
      result = false
    }
    if (maxWidth && fileWidth > maxWidth) {
      message.error(`图片宽度必须小于${maxWidth}px`)
      result = false
    }
    if (height && fileHeight !== height) {
      message.error(`图片高度必须为${height}px`)
      result = false
    }
    if (maxHeight && fileHeight > maxHeight) {
      message.error(`图片高度必须小于${maxHeight}px`)
      result = false
    }
    return result ? Promise.resolve() : Promise.reject()
  }

  function handleBeforeUpload (file: RcFile, fileList: RcFile[]) {
    if (imageBound) {
      return checkImageBound(file)
    }
    if (beforeUpload) {
      return beforeUpload(file, fileList)
    }
    return true
  }

  function handleChange ({ file, fileList }: { file: UploadFile; fileList: UploadFile[] }) {
    if (file.status === 'uploading' && !file.type.startsWith('image')) {
      message.error('图片格式有误')
      return
    }
    setFileList(fileList)
    if (form && id) {
      form.setFields({ [id]: { value: fileList.map((file) => file.url || file?.response?.url) } })
      form.validateFields([id])
    } else {
      props.onChange && props.onChange(fileList.map((file) => file.url || file?.response?.url))
    }
  }

  async function handleUpload (options: RcCustomRequestOptions) {
    const { file } = options
    const formData = new FormData()
    formData.append('targetModule', targetModule)
    formData.append('file', file)
    const result = await fetchFormData('api/common/upload/img', formData)
    options.onSuccess(result, options.file)
  }

  function handleRemove (file: UploadFile) {
    fileList.splice(fileList.findIndex((f) => f.uid === file.uid), 1)
    setFileList([...fileList])
  }

  return (
    <div className="upload-image">
      <Upload
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onRemove={handleRemove}
        beforeUpload={handleBeforeUpload}
        onChange={handleChange}
        customRequest={handleUpload}
        disabled={disabled}
      >
        {disabled || (maxLength && fileList.length >= maxLength) ? null : (<Icon type="plus" />)}
      </Upload>
      <Modal
        visible={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
        width="fit-content"
        wrapClassName="upload-viewer"
      >
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </div>
  )
}

export default forwardRef(UploadImage)
