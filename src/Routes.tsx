import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import AddCategory from './components/admin/AddCategory'
import AddProduct from './components/admin/AddProduct'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminRoute from './components/admin/AdminRoute'
import Dashboard from './components/admin/Dashboard'
import Orders from './components/admin/Orders'
import PrivateRoute from './components/admin/PrivateRoute'
import Cart from './components/core/Cart'
import Home from './components/core/Home'
import Product from './components/core/Product'
import Shop from './components/core/Shop'
import SignIn from './components/core/SignIn'
import SignUp from './components/core/SignUp'
import Success from './components/core/Success'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} exact />
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />
        <PrivateRoute path="/user/dashboard" component={Dashboard} />
        <AdminRoute path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoute path="/create/category" component={AddCategory} />
        <AdminRoute path="/create/product" component={AddProduct} />
        <AdminRoute path="/admin/orders" component={Orders} />
        <Route path="/product/:productId" component={Product} />
        <Route path="/cart" component={Cart} />
        <Route path="/paysuccess" component={Success} />
      </Switch>
    </HashRouter>
  )
}

export default Routes
