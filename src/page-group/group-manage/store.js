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
  @observable addstatus = false
  @observable selectedKeys = []
  @observable publishRowKeys = []
  @observable entityList = []
  @observable nodata = '没有数据'

  // 树形组件
  @observable expandedKeys= []
  @observable searchValue = ''
  @observable autoExpandParent = true
  @observable dataList = []
}
export default new Store()
