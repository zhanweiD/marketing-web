import {
  observable, action, runInAction,
} from 'mobx'
import {successTip, errorTip} from '../../../common/util'
import io from './io'
import {ListContentStore} from '../../../component/list-content'

// eslint-disable-next-line new-cap
class Store extends ListContentStore(io.getList) {
  @observable tableLoading = true
  @observable drawerVisible = false
  @observable drawerLoading = false
  @observable selectedKeys = []
  @observable publishRowKeys = []
  @observable entityList = []
  @observable nodata = '没有数据'

  // 树形组件
  @observable expandedKeys= []
  @observable searchValue = ''
  @observable autoExpandParent = true
  @observable dataList = []

  @observable list = [
    {
      id: 11,
      objName: '客群2020',
      guestName: '客群',
      exportColumn: ['姓名', '电话', '客户类型', '身份证号'],
      status: 1,
      createTime: 345678904565,
      creater: '小白',
    }, {
      id: 12,
      objName: '姓名',
      guestName: '客群',
      exportColumn: ['姓名', '电话', '客户类型', '身份证号'],
      status: 2,
      createTime: 345678904565,
      creater: '小白',
    }, {
      id: 13,
      objName: '姓名',
      guestName: '客群',
      exportColumn: ['姓名', '电话', '客户类型', '身份证号'],
      status: 3,
      createTime: 345678904565,
      creater: '小白',
    }, {
      objName: '姓名',
      guestName: '客群',
      exportColumn: ['姓名', '电话', '客户类型', '身份证号'],
      status: 4,
      createTime: 345678904565,
      creater: '小白',
    },
  ]
  @observable gData = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            {title: '0-0-0-0', key: '0-0-0-0'},
            {title: '0-0-0-1', key: '0-0-0-1'},
            {title: '0-0-0-2', key: '0-0-0-2'},
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            {title: '0-0-1-0', key: '0-0-1-0'},
            {title: '0-0-1-1', key: '0-0-1-1'},
            {title: '0-0-1-2', key: '0-0-1-2'},
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        {title: '0-1-0-0', key: '0-1-0-0'},
        {title: '0-1-0-1', key: '0-1-0-1'},
        {title: '0-1-0-2', key: '0-1-0-2'},
      ],
    },
    {
      title: '0-2',
      key: '0-2',
      children: [
        {title: '0-2-0-0', key: '0-2-0-0'},
        {title: '0-2-0-1', key: '0-2-0-1'},
        {title: '0-2-0-2', key: '0-2-0-2'},
      ],
    },
  ];
}
export default new Store()
