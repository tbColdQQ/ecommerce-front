import React from 'react'
import Layout from './Layout'
import { Form, Input, Button } from 'antd'
import { signin, SigninPayload } from '../../store/actions/auth.action'
import { useDispatch } from 'react-redux'

const SignIn = () => {

  const dispatch = useDispatch()

  const onFinish = (value: SigninPayload) => {
    console.log(value)
    dispatch(signin(value))
  }

  return (
    <Layout title="登录" subTitle="嘿，小伙伴，立即登录到拉勾电商系统吧">
      <Form onFinish={onFinish}>
        <Form.Item name="email" label="邮箱">
          <Input />
        </Form.Item>
        <Form.Item name="password" label="密码">
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">登录</Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}

export default SignIn
