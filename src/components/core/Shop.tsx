import React, { useEffect, useState } from 'react'
import Layout from './Layout'
import { useSelector } from 'react-redux'
import { Col, Row, Space } from 'antd'
import Checkbox from './Checkbox'
import Radiobox from './Radiobox'

const Shop = () => {
  
  const [myFilters, setMyFilters] = useState<{category: string[], price: number[]}>({category: [], price: []})

  useEffect(() => {

  }, [myFilters])

  const filterDOM = () => <>
    <Space size="middle" direction="vertical">
      <Checkbox handleFilters={(filters: string[]) => setMyFilters({...myFilters, category: filters})}/>
      <Radiobox handleFilters={(filters: number[]) => setMyFilters({...myFilters, price: filters})}/>
    </Space>
  </>

  return (
    <Layout title="拉勾商城" subTitle="挑选你喜欢的商品吧">
      <Row>
        <Col span="4">
          {filterDOM()}
        </Col>
        <Col span="20"></Col>
      </Row>
    </Layout>
  )
}

export default Shop
