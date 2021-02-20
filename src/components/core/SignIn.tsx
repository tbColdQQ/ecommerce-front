import React from 'react'
import Layout from './Layout'
import { Form, Input, Button, Result } from 'antd'
import { signin, SigninPayload } from '../../store/actions/auth.action'
import { useDispatch, useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { AuthState } from '../../store/reducers/auth.reducer'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { Redirect } from 'react-router-dom'

const SignIn = () => {

  const dispatch = useDispatch()

  const onFinish = (value: SigninPayload) => {
    console.log(value)
    dispatch(signin(value))
  }

  const auth = useSelector<AppState, AuthState>(state => state.auth)
  const showError = () => {
    if (auth.signin.loaded && !auth.signin.success) {
      return (
        <Result
          status="warning"
          title="登录失败"
          subTitle={auth.signup.message}
        >
        </Result>
      )
    }
  }
  const redirectToDashboard = () => {
    const auth = isAuth()
    if (auth) {
      const { user: { role } } = auth as Jwt
      if (role === 0) {
        return <Redirect to="/user/dashboard"/>
      } else {
        return <Redirect to="/admin/dashboard"/>
      }
    }
  }
  const signinForm = () => (<Form onFinish={onFinish}>
    <Form.Item name="email" label="邮箱">
      <Input />
    </Form.Item>
    <Form.Item name="password" label="密码">
      <Input.Password />
    </Form.Item>
    <Form.Item>
      <Button type="primary" htmlType="submit">登录</Button>
    </Form.Item>
  </Form>)

  return (
    <Layout title="登录" subTitle="嘿，小伙伴，立即登录到拉勾电商系统吧">
      {showError()}
      {redirectToDashboard()}
      {signinForm()}
    </Layout>
  )
}

export default SignIn
