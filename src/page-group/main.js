import {useEffect} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import GroupManage from './group-manage'
import GroupDetail from './group-detail'
import UnitList from './unit-list'
import RuleCreate from './rule-create'
import RuleDetail from './rule-detail'

import GroupAnalyze from './group-analyze'
import GroupContrast from './group-contrast'

import PortrayalLabel from './portrayal'
import Explain from './config-explain'

import {codeInProduct} from '../common/util'

const prePath = '/group'

export default () => {
  return (
    <Switch>
      {
        codeInProduct('group-manage:view') && (
          <Route exact path={`${prePath}/manage`} component={GroupManage} />
        )
      }
      {/* 群体管理 */}
      {/* <Route exact path={`${prePath}/manage`} component={GroupManage} /> */}

      {/* 实时/离线 群体创建/编辑 */}
      <Route exact path={`${prePath}/manage/create/:groupId?`} component={RuleCreate} />

      {/* 群体详情 */}
      <Route exact path={`${prePath}/manage/:id/:objId`} component={GroupDetail} /> 

      {/* 查看规则详情 */}
      <Route exact path={`${prePath}/manage/rule/:groupId/:objId`} component={RuleDetail} /> 

      {/* 个体列表 */}
      <Route exact path={`${prePath}/manage/unit/:id/:queryDate`} component={UnitList} />

      {/* 群体分析 */}
      {/* <Route exact path={`${prePath}/analyze/:groupId?/:objId?/:projectId?/:time?`} component={GroupAnalyze} /> */}

      {/* 群体对比 */}
      {/* <Route exact path={`${prePath}/contrast`} component={GroupContrast} /> */}

      {/* 微观画像 */}
      {/* <Route exact path={`${prePath}/portrayal/:objId?/:mainLabel?/:projectId?`} component={PortrayalLabel} /> */}

      {/* 配置说明 */}
      {/* <Route exact path={`${prePath}/explain`} component={Explain} /> */}

      {/* <Redirect strict to={`${prePath}/manage`} /> */}
    </Switch>
  )
}
