import { Button, Form, Input, message, Select, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import Layout from '../core/Layout'
import { UploadOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { getCategory } from '../../store/actions/category.actions'
import { AppState } from '../../store/reducers'
import { CategoryState } from '../../store/reducers/category.reducer'
import { RcFile } from 'antd/lib/upload'
import axios from 'axios'
import { API } from '../../config'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'

const { Option } = Select

const AddProduct = () => {

  const [file, setFile] = useState<RcFile>()

  const dispatch = useDispatch()

  const categories = useSelector<AppState, CategoryState>(state => state.category)

  useEffect(() => {
    dispatch(getCategory())
  }, [])

  const {user, token} = isAuth() as Jwt

  const onFinish = (product: any) => {
    const formData = new FormData()
    console.log(product)
    for (let attr in product) {
      formData.set(attr, product[attr])
    }
    if (typeof file !== 'undefined') {
      formData.set('photo', file)
    }
    
    axios.post(`${API}/product/create/${user._id}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      message.success('商品添加成功')
    }, () => {
      message.error('商品添加失败')
    })
  }

  const addProductForm = () => {
    const props = {
      beforeUpload: function (file: RcFile) {
        console.log(file)
        setFile(file)
        return false
      },
      accept: 'image/*'
    }
    return <Form onFinish={onFinish} initialValues={{category: ''}}>
      <Form.Item>
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>上传商品封面</Button>
        </Upload>
      </Form.Item>
      <Form.Item name="name" label="商品名称">
        <Input />
      </Form.Item>
      <Form.Item name="description" label="商品描述">
        <Input />
      </Form.Item>
      <Form.Item name="price" label="商品价格">
        <Input />
      </Form.Item>
      <Form.Item name="category" label="所属分类">
        <Select>
          <Option value="">请选择分类</Option>
          {
            categories.category.result.map(item => <Option key={item._id} value={item._id}>{item.name}</Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item name="quantity" label="商品数量">
        <Input />
      </Form.Item>
      <Form.Item name="shipping" label="是否需要运输">
        <Select>
          <Option value="0">否</Option>
          <Option value="1">是</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">添加商品</Button>
      </Form.Item>
    </Form>
  }

  return (
    <Layout title="添加商品" subTitle="">
      {addProductForm()}
    </Layout>
  )
}

export default AddProduct