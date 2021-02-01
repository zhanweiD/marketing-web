/**
 * @description 群体管理
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {Tabs} from 'antd'

import GroupList from '../group-list'
import PushList from '../push-list'
// import ExportList from './export-list/index'
import './main.styl'

const {TabPane} = Tabs
@observer
export default class GroupManage extends Component {
  render() {
    return (
      <div>
        <div className="content-header">群体管理</div>
        <Tabs defaultActiveKey="0" className="group-manage">
          <TabPane tab="群体列表" key="0">
            <GroupList />
          </TabPane>
          <TabPane tab="推送列表" key="1">
            <PushList />
          </TabPane>
          {/* <TabPane tab="导出列表" key="3">
            <ExportList />
          </TabPane> */}
        </Tabs>
      </div>
    )
  }
}
