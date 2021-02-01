import {toJS} from 'mobx'

const serach = store => [
  {
    label: '应用名称',
    key: 'objId',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {name: '全部', value: ''},
        ...toJS(store.entityList),
      ],
    },
    component: 'select',
  }, 
  {
    label: '状态',
    key: 'status',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {name: '全部', value: ''},
        {name: '已完成', value: 1},
        {name: '未完成', value: 2},
      ],
    },
    component: 'select',
  },
  {
    label: '群体名称',
    key: 'keyword',
    control: {
      placeholder: '请输入群体名称关键字搜索',
    },
    component: 'input',
  },
]
export default serach
