/**
 * @description  系统配置
 */
import {Route, Switch, Redirect} from 'react-router-dom'
import {codeInProduct} from '../common/util'

import SyncList from './sync-list'

const prePath = '/tag'

export default () => {
  return (
    <Switch>
      {
        codeInProduct('tag-model:view') && (
          <Route exact path={`${prePath}/sync`} component={SyncList} />
        )
      }
    </Switch>
  )
}
