import { Col, Divider, Input, Row } from 'antd'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { CartItem, getCart } from '../../helpers/cart'
import CartItemFc from './CartItemFc'
import Layout from './Layout'
import Pay from './Pay'
import TotalPrice from './TotalPrice'

const Cart = () => {

  const [cart, setCart] = useState<CartItem[]>([])
  const [address, setAddress] = useState<string>('')
  const [totalPrice, setTotalPrice] = useState<number>(0)

  useEffect(() => {
    setCart(getCart())
  }, [])

  const showCart = () => (
    <table style={{width: '100%'}}>
      <thead className="ant-table-thead">
        <tr>
          <td className="ant-table-cell">商品封面</td>
          <td className="ant-table-cell">商品名称</td>
          <td className="ant-table-cell">商品价格</td>
          <td className="ant-table-cell">商品分类</td>
          <td className="ant-table-cell">商品数量</td>
          <td className="ant-table-cell">操作</td>
        </tr>
      </thead>
      <tbody className="ant-table-tbody">
        {cart.map(item => <CartItemFc setCart={setCart} product={item}/>)}
      </tbody>
    </table>
  )

  return (
    <Layout title="购物车" subTitle="付款吧，我就是你的了">
      <Row gutter={16}>
        <Col span="16">{showCart()}</Col>
        <Col span="8">
          <Row>
            <Input value={address} onChange={(event: ChangeEvent<HTMLInputElement>) => setAddress(event.target.value)} placeholder="请填写收货地址"/>
          </Row>
          <Divider />
          <Row>
            <TotalPrice cart={cart} setTotalPrice={setTotalPrice}/>
          </Row>
          <Row>
            <Pay />
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export default Cart
