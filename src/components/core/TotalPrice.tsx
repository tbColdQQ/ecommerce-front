import { Typography } from 'antd'
import React, { FC, useEffect } from 'react'
import { CartItem } from '../../helpers/cart'

const { Title } = Typography

interface Props {
  cart: CartItem[],
  setTotalPrice: (price: number) => void
}

const TotalPrice: FC<Props> = ({cart, setTotalPrice}) => {

  const getTotalPrice = () => {
    return cart.reduce((currentValue, nextValue) => {
      return (currentValue += nextValue.price * nextValue.count)
    }, 0).toFixed(2)
  }

  useEffect(() => {
    setTotalPrice(parseFloat(getTotalPrice()))
  }, [cart])

  return (
    <div>
      <Title level={5}>商品总价：{getTotalPrice()}</Title>
    </div>
  )
}

export default TotalPrice
