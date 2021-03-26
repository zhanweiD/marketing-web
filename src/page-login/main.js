/**
 * @description 登录
 */
import {Component} from 'react'
import {observer} from 'mobx-react'

import {action, toJS} from 'mobx'
import bgImage from './icon/bg.svg'
import './icon'
import store from './store'

@observer
export default class Login extends Component {
  render() {
    return (
      <div
        className="page-login FBV"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
        }}
      >
        自动化营销demo
      </div>
    )
  }
}
