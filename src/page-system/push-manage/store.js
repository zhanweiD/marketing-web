/* eslint-disable no-unused-vars */
import {
  observable, action, runInAction,
} from 'mobx'
import {successTip, errorTip} from '../../common/util'
import io from './io'
import {ListContentStore} from '../../component/list-content'

// eslint-disable-next-line new-cap
class Store extends ListContentStore(io.getList) {
  @observable tableLoading = true
  @observable drawerVisible = false
  @observable drawerLoading = false
  @observable addStatus = false
  @observable selectedKeys = []
  @observable publishRowKeys = []

  @observable list = [
    {
      id: 11,
      name: '姓名',
      nameStr: ['明远', '物业', '误以为'],
      objId: 2222222222222222,
      number: 12345,
      count: 2,
      cycle: 'yue',
      time: 134567890345,
      status: 1,
      last: 3456789078,
      create: '小白',
    }, {
      id: 12,
      name: '姓名',
      nameStr: ['明远'],
      objId: 2222222222222222,
      number: 12345,
      count: 2,
      cycle: 'yue',
      time: 134567890345,
      status: 2,
      last: 3456789078,
      create: '小白',
    }, {
      id: 13,
      name: '姓名',
      nameStr: ['明远'],
      objId: 2222222222222222,
      number: 12345,
      count: 2,
      cycle: 'yue',
      time: 134567890345,
      status: 3,
      last: 3456789078,
      create: '小白',
    }, {
      id: 14,
      name: '姓名',
      nameStr: ['明远'],
      objId: 2222222222222222,
      number: 12345,
      count: 2,
      cycle: 'yue',
      time: 134567890345,
      status: 4,
      last: 3456789078,
      create: '小白',
    },
  ]
  @observable selectCycle = [
    {
      cycle: 'day',
      key: 'day',
      value: '天',
    }, 
    {
      cycle: 'weeks',
      key: 'weeks',
      value: '周',
    },
    {
      cycle: 'month',
      key: 'month',
      value: '月',
    },
    {
      cycle: 'quarter',
      key: 'quarter',
      value: '季度',
    },
    {
      cycle: 'manual',
      key: 'manual',
      value: '手动',
    },
  ]
}
export default new Store()
