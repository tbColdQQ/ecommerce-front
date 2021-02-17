import React from 'react'
import Layout from './Layout'
import { Form, Input, Button } from 'antd'

const SignIn = () => {
  return (
    <Layout title="登录" subTitle="">
      <Form>
        <Form.Item name="name" label="昵称">
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
