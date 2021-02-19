import React, { useEffect } from 'react'
import Layout from './Layout'
import { Form, Input, Button, Result } from 'antd'
import { resetSignup, signup, SignupPayload } from '../../store/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { AuthState } from '../../store/reducers/auth.reducer'
import { AppState } from '../../store/reducers'
import { Link } from 'react-router-dom'

const SignUp = () => {

  const dispatch = useDispatch()

  const auth = useSelector<AppState, AuthState>(state => state.auth)

  const [form] = Form.useForm()

  const onFinish = (value: SignupPayload) => {
    dispatch(signup(value))
    
  }

  useEffect(() => {
    if (auth.signup.loaded && auth.signup.success) {
      form.resetFields()
    }
  }, [auth])

  const showSuccess = () => {
    if (auth.signup.loaded && auth.signup.success) {
      return <Result
        status="success"
        title="注册成功"
        extra={[
          <Button type="primary">
            <Link to='/signin'>登录</Link>
          </Button>
        ]}
      >
      </Result>
    }
  }

  const showError = () => {
    if (auth.signup.loaded && !auth.signup.success) {
      return <Result
        status="warning"
        title="注册失败"
        subTitle={auth.signup.message}
      >
      </Result>
    }
  }

  useEffect(() => {
    return () => {
      dispatch(resetSignup())
    }
  }, [])

  const signupForm = () => (
    <Form onFinish={onFinish} form={form}>
      <Form.Item name="name" label="昵称">
        <Input />
      </Form.Item>
      <Form.Item name="password" label="密码">
        <Input.Password />
      </Form.Item>
      <Form.Item name="email" label="邮箱">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">注册</Button>
      </Form.Item>
    </Form>
  )

  return (
    <Layout title="注册" subTitle="">
      {showSuccess()}
      {showError()}
      {signupForm()}
    </Layout>
  )
}

export default SignUp
