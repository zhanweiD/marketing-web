/* eslint-disable new-cap */
import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {errorTip, successTip, changeToOptions} from '../../../common/util'
import {ListContentStore} from '../../../component/list-content'
import io from './io'

class Store extends ListContentStore(io.getHistoryList) {
  projectId
  // 推送日志
  @observable publishRowKeys = [] 
  @observable tableLoading = false 

  // 
  @observable list = [
    {
      id: 1,
      crowdId: 1145678,
      name: '客群',
      appName: '明源',
      number: 13445,
      pushNumber: 134,
      cycle: '天',
      pushCycle: '-',
      status: 1,
      time: 23456789989,
      operation: 'admin',
    }, 
    {
      id: 2,
      crowdId: 1145678,
      name: '客群',
      appName: '明源',
      number: 13445,
      pushNumber: 134,
      cycle: '天',
      pushCycle: '-',
      status: 2,
      time: 23456789989,
      operation: 'admin',
    }, 
    {
      id: 3,
      crowdId: 1145678,
      name: '客群',
      appName: '明源',
      number: 13445,
      pushNumber: 134,
      cycle: '天',
      pushCycle: '-',
      status: 3,
      time: 23456789989,
      operation: 'admin',
    }, 
    
  ]
}

export default new Store()
