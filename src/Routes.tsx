import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Home from './components/core/Home'
import Shop from './components/core/Shop'
import SignIn from './components/core/SignIn'
import SignUp from './components/core/SignUp'

const Routes = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/shop" component={Shop} exact />
        <Route path="/signin" component={SignIn} exact />
        <Route path="/signup" component={SignUp} exact />
      </Switch>
    </HashRouter>
  )
}

export default Routes
