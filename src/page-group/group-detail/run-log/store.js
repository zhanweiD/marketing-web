import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {errorTip, successTip} from '../../../common/util'
import {ListContentStore} from '../../../component/list-content'
import io from './io'

// eslint-disable-next-line new-cap
class Store extends ListContentStore(io.getHistoryList) {
  projectId
  // 推送日志
  @observable publishRowKeys = [] 
  @observable tableLoading = false 

  // 
  @observable list = [
    {
      id: 1,
      crowdId: 16865,
      number: 34567,
      way: '自动执行',
      touch: '触达',
      rules: ['单词执行', '满足条件'],
      status: 1,
      time: 2345678905677,
      operation: '系统调度',
    }, 
    {
      id: 2,
      crowdId: 16865,
      number: 34567,
      way: '自动执行',
      touch: '触达',
      rules: ['单词执行', '满足条件'],
      status: 2,
      time: 2345678905677,
      operation: '系统调度',
    }, 
    {
      id: 3,
      crowdId: 16865,
      number: 34567,
      way: '自动执行',
      touch: '触达',
      rules: ['单词执行', '满足条件'],
      status: 3,
      time: 2345678905677,
      operation: '系统调度',
    }, 
  ]
}

export default new Store()
