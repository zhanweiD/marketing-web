/* eslint-disable no-unused-vars */
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
  @observable addstatus = false
  @observable selectedKeys = []
  @observable publishRowKeys = []
  @observable entityList = []
  @observable nodata = '没有数据'
  @observable radioValue = 0 // 自定义时间
  @observable selectTimeShow = false // 选择时间
  @observable cycle = 'day' // 推送周期
  @observable selectTimeValue = '' // 选择时间的默认显示

  // 标签列
  @observable selectNumber = 0 // 已选标签数量
  @observable checkedList = [] // 已选标签
  @observable indeterminate = true 
  @observable checkAll = false 

  // 树形组件
  @observable expandedKeys= []
  @observable searchValue = ''
  @observable autoExpandParent = true
  @observable dataList = []

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
  @observable demo = [
    {
      value: 'zhejiang',
      label: 'Zhejiang',
      children: [
        {
          value: 'hangzhou',
          label: 'Hangzhou',
          children: [
            {
              value: 'xihu',
              label: 'West Lake',
            },
          ],
        },
      ],
    },
    {
      value: 'jiangsu',
      label: 'Jiangsu',
      // disabled: true,
      children: [
        {
          value: 'nanjing',
          label: 'Nanjing',
          children: [
            {
              value: 'zhonghuamen',
              label: 'Zhong Hua Men',
            },
          ],
        },
      ],
    },
  ];
  // 标签列数据
  @observable plainOptions = ['Apple', 'Pear', 'Orange'];
  @observable defaultCheckedList = ['Apple', 'Orange']
  // 树形组件数据
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
