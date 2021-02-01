/**
 * @description 推出列表
 */
import {Component} from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Button, Badge, Tooltip, Popconfirm} from 'antd'
import {
  ListContent, OmitTooltip,
} from '../../component'
import {Time} from '../../common/util'
import AddDrawer from './add-drawer'
import store from './store'
import './main.styl'
// import {errorTip} from '../../common/util'

@observer
export default class PushList extends Component {
  columns = [{
    key: 'name',
    title: '应用名称',
    dataIndex: 'name',
  }, {
    key: 'nameStr',
    title: '描述',
    dataIndex: 'nameStr',
    ellipsis: true,
    render: t => {
      // t = t.map((item, index) => {
      //   return index > 0 ? `、${item}` : item
      // })
      return t ? <OmitTooltip maxWidth={400} text={t} /> : '-'
    },
  }, {
    key: 'number',
    title: '目的是检验',
    dataIndex: 'number',
  }, {
    key: 'cycle',
    title: '目的数据表',
    dataIndex: 'cycle',
  }, {
    key: 'last',
    title: '创建日期',
    dataIndex: 'last',
    width: 145,
    render: text => <Time timestamp={text} />,
  }, {
    key: 'action',
    title: '操作',
    // width: 80,
    render: (text, record) => (
      <div className="FBH FBAC">
        <a href onClick={e => this.openDrawer(1, record, e)} className="mr8">编辑</a>
        <Popconfirm
          title="你确定删除该应用吗"
          onConfirm={() => this.onDelete(record)}
          // onCancel={cancel}
          placement="topRight"
          okText="确认"
          cancelText="取消"
        >
          <a href onClick={e => this.openDrawer(2, record, e)} className="mr8">删除</a>
        </Popconfirm>
      </div>
    ),
  }]
  @action onDelete= record => { console.log(record) }
  @action openDrawer = (v, record) => {
    if (v === 1) {
      store.drawerVisible = true
    } else if (v === 2) {
      // 删除
    } else if (v === 3) {
      store.addStatus = true
      store.drawerVisible = true
    }
  }
  // checkbox 多选
  @action.bound onTableCheck(selectedRowKeys) {
    // 表格 - 已选项key数组
    store.publishRowKeys = selectedRowKeys
  }
  
  render() {
    const {publishRowKeys, tableLoading} = store
    const rowSelection = {
      selectedRowKeys: publishRowKeys.slice(),
      onChange: this.onTableCheck,
    }
    const listConfig = {
      key: 'id',
      rowKey: 'id',
      rowSelection: rowSelection || null,
      columns: this.columns,
      tableLoading,
      store,
      initParams: {},
      buttons: [
        <Button type="primary" className="mr8" onClick={() => this.openDrawer(3)}>添加应用</Button>,
      ],
      scroll: {x: 800},
    }
    return (
      <div>
        <div className="content-header">推送管理</div>
        <div className="push-manage">
          <div className="list-content">
            <ListContent {...listConfig} />
          </div>
          {store.drawerVisible ? <AddDrawer store={store} /> : null}
        </div>
      </div>
    )
  }
}
