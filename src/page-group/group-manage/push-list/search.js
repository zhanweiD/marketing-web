import {toJS} from 'mobx'

const serach = store => [
  {
    label: '应用名称',
    key: 'objName',
    initialValue: '',
    control: {
      defaultAll: true,
      options: [
        {name: '全部', value: ''},
        {name: '明源', value: '明源'},
        {name: '物业ERP', value: '物业ERP'},
        // ...toJS(store.entityList),
      ],
    },
    component: 'select',
  }, 
  {
    label: '创建人',
    key: 'creater',
    initialValue: '',
    control: {
      placeholder: '请输入创建人关键字搜索',
    },
    component: 'input',
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
