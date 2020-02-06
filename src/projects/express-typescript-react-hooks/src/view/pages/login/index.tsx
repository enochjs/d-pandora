import React, { useState } from 'react'
import { render } from 'react-dom'
import { Button, Col, message } from 'antd'
import Form, {
  InputItem,
  CheckboxItem,
} from 'components/form/index'
import { fetchJSONByPost } from 'utils/fetchApi'
import { PROJECT_TOKERN_NAME } from 'utils/constants'
import './index.less'

interface FormValue {
  username: string;
  password: string;
  remember?: boolean;
}

// 账号密码存储key
const LOGIN_FORM_STORAGE_KEY = 'login-form-storage'
// let PROJECTNAME_TOKEN = ''

function Login (): JSX.Element {
  const storage = localStorage.getItem('login-form-storage')

  const storageJson = storage ? JSON.stringify(storage) as any : { username: '', password: '' }

  const [formValue, setFormValue]: [FormValue, React.Dispatch<React.SetStateAction<FormValue>>] = useState(storageJson)

  function formFieldChange (value: any): void {
    setFormValue({
      ...formValue,
      ...value,
    })
  }

  async function handleLogin (): Promise<void> {
    if (formValue.remember) {
      localStorage.setItem(LOGIN_FORM_STORAGE_KEY, JSON.stringify({
        username: formValue.username,
        password: formValue.password,
      }))
    } else {
      localStorage.setItem(LOGIN_FORM_STORAGE_KEY, JSON.stringify({
        username: '',
        password: '',
      }))
    }

    const result = await fetchJSONByPost('/api/login')({
      username: formValue.username,
      password: formValue.password,
    })

    if (!result) {
      message.error('用户名或者密码错误！')
    } else {
      localStorage.setItem(PROJECT_TOKERN_NAME, result)
      window.location.href = '/'
    }
  }

  return (
    <Form
      className="login-form"
      formValue={formValue}
      formFieldChange={formFieldChange}
    >
      <h2 style={{ textAlign: 'center', fontSize: '28px' }}>登  录</h2>
      <InputItem
        size="large"
        rules={[{ required: true }]}
        id="username"
        labelCol={5}
        wrapperCol={24}
      />
      <InputItem
        size="large"
        type="password"
        rules={[{ required: true }]}
        id="password"
        labelCol={5}
        wrapperCol={24}
      />
      <label>
        <Col span={8} style={{ padding: 0 }}>
          <CheckboxItem
            id="remember"
            formItemLabel=""
            labelCol={5}
            wrapperCol={24}
          />
        </Col>
        <Col span={16} style={{ lineHeight: '40px', textAlign: 'right' }}><a>记住密码</a></Col>
      </label>
      <Col span={24}>
        <Button size="large" style={{ width: '100%', padding: '0 8px' }} type="primary" onClick={handleLogin}>登录</Button>
      </Col>
    </Form>
  )
}

export default render(<Login />, document.getElementById('root'))
