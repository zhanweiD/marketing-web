import React from 'react'
import ReactDOM from 'react-dom'
import {
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import * as dict from './common/dict'
import './common/util.styl'

import Marketing from './page-marketing'
import AddAccount from './page-marketing/add-account'
import Dag from './page-dag'

const njkData = {
  dict,
}

window.njkData = njkData

function Entry() {
  return (
    <Router>
      <Switch>
        {/* 登录 */}
        <Route path="/marketing" component={Marketing} />
        <Route path="/add-account" component={AddAccount} />
        <Route path="/dag" component={Dag} />
        <Route path="/" component={Marketing} />
      </Switch>
    </Router>
  )
}

ReactDOM.render(<Entry />, document.getElementById('root'))
