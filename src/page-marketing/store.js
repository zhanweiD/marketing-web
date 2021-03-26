import {
  action, observable, runInAction, toJS,
} from 'mobx'
import md5 from 'md5'
import {
  errorTip,
} from '../common/util'
import io from './io'

class Store {
  @action getList() {
    console.log(111)
  }
}

export default new Store()
