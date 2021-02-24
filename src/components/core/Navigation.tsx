import React, { useContext, useEffect } from 'react'
import { Badge, Menu } from 'antd'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from '../../store/reducers'
import { RouterState } from 'connected-react-router'
import { isAuth } from '../../helpers/auth'
import { Jwt } from '../../store/models/auth'
import { TotalContext } from '../../AnotherStore'
import { itemCount } from '../../helpers/cart'

function useActive (currentPath: string, path: string) : string {
  return currentPath === path ? 'ant-menu-item-selected' : ''
}

const Navigation = () => {
  const router = useSelector<AppState, RouterState>(state => state.router)
  const pathname = router.location.pathname
  const isHome = useActive('/', pathname)
  const isShop = useActive('/shop', pathname)
  const isSignin = useActive('/signin', pathname)
  const isSignup = useActive('/signup', pathname)
  const isDashboard = useActive(getDashboardUrl(), pathname)
  const isCart = useActive('/cart', pathname)

  const [count, setCount] = useContext(TotalContext)

  useEffect(() => {
    setCount(itemCount())
  })

  function getDashboardUrl () {
    let url = '/user/dashboard'
    if (isAuth()) {
      const {user: {role}} = isAuth() as Jwt
      if (role === 1) {
        url = '/admin/dashboard'
      }
    }
    return url
  }

  return (
    <Menu mode="horizontal" selectable={false}>
      <Menu.Item className={isHome}>
        <Link to="/">首页</Link>
      </Menu.Item>
      <Menu.Item className={isShop}>
        <Link to="/shop">商城</Link>
      </Menu.Item>
      <Menu.Item className={isCart}>
        <Link to="/cart">
          购物车
          <Badge count={count} offset={[5, -10]}/>
        </Link>
      </Menu.Item>
      {
        !isAuth() && <>
          <Menu.Item className={isSignin}>
            <Link to="/signin">登录</Link>
          </Menu.Item>
          <Menu.Item className={isSignup}>
            <Link to="/signup">注册</Link>
          </Menu.Item>
        </>
      }
      {
        isAuth() && (
          <Menu.Item className={isDashboard}>
            <Link to={getDashboardUrl()}>dashboard</Link>
          </Menu.Item>
        )
      }
    </Menu>
  )
}

export default Navigation
