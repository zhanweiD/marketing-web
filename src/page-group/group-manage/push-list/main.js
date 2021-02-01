/**
 * @description 推出列表
 */
import {Component} from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Button, Badge, Tooltip, Popconfirm} from 'antd'
import {
  ListContent, OmitTooltip,
} from '../../../component'
import search from './search'
import {Time} from '../../../common/util'
import AddDrawer from './add-drawer'
import store from './store'
import './main.styl'
// import {errorTip} from '../../common/util'

@observer
export default class PushList extends Component {
  columns = [{
    key: 'name',
    title: '客群名称',
    dataIndex: 'name',
    className: 'tr-w64',
  }, {
    key: 'nameStr',
    title: '应用名称',
    dataIndex: 'nameStr',
    className: 'tr-w64',
    ellipsis: true,
    render: t => {
      t = t.map((item, index) => {
        return index > 0 ? `、${item}` : item
      })
      return t ? <OmitTooltip maxWidth={400} text={t} /> : '-'
    },
  }, {
    key: 'number',
    title: '推送人数',
    dataIndex: 'number',
    className: 'tr-w64',
  }, {
    key: 'count',
    title: '累计推送次数',
    dataIndex: 'count',
    className: 'tr-w88',
  }, {
    key: 'cycle',
    title: '推送周期',
    dataIndex: 'cycle',
    className: 'tr-w64',
  }, {
    key: 'time',
    title: '推送周期时间',
    dataIndex: 'time',
    className: 'tr-w88',
    width: 145,
    render: text => <Time timestamp={text} />,
  }, {
    key: 'status',
    title: '状态',
    className: 'tr-w50',
    dataIndex: 'status',
    render: v => {
      if (v === 1) {
        return (<Badge color="green" text="成功" />)
      } if (v === 2) {
        return (<Badge color="red" text="失败" />)
      } if (v === 3) {
        return (<Badge color="blue" text="执行中" />)
      }
      return (<Badge color="gray" text="未运行" />)
    },
  }, {
    key: 'last',
    title: '最后推送时间',
    dataIndex: 'last',
    className: 'tr-w88',
    width: 145,
    render: text => <Time timestamp={text} />,
  }, {
    key: 'create',
    title: '创建人',
    className: 'tr-w64',
    dataIndex: 'create',
  }, {
    key: 'action',
    title: '操作',
    className: 'tr-w40',
    width: 150,
    render: (text, record) => (
      <div className="FBH FBAC">
        {record.status === 3 
          ? <a href onClick={e => this.openDrawer(0, record, e, text)} className="mr8">停止推送</a> 
          : <a href onClick={e => this.openDrawer(0, record, e, text)} className="mr8">手动推送</a>
        }
        {/* <a href onClick={e => this.openDrawer(0, record, e, text)} className="mr8">手动操作</a> */}
        {record.status === 3 ? (
          <Tooltip title="进行中，不可操作" arrowPointAtCenter placement="top">
            <a href className="mr8" style={{color: 'gray'}}>编辑</a>
          </Tooltip>
        ) : <a href onClick={e => this.openDrawer(1, record, e)} className="mr8">编辑</a>}
        {record.status === 3 ? (
          <Tooltip title="进行中，不可操作" arrowPointAtCenter placement="top">
            <a href className="mr8" style={{color: 'gray'}}>删除</a>
          </Tooltip>
        ) : (
          <Popconfirm
            title="你确定删除该推送吗"
            onConfirm={() => this.onDelete(record)}
            // onCancel={cancel}
            placement="topRight"
            okText="确认"
            cancelText="取消"
          >
            <a href onClick={e => this.openDrawer(2, record, e)} className="mr8">删除</a>
          </Popconfirm>
        )}
      </div>
    ),
  }]
  @action onDelete= record => { console.log(record) }
  @action openDrawer = (v, record, e) => {
    //  1编辑 0禁用 2删除
    if (v === 0) {
    //   store.disable(e)
      console.log('手动操作', record)
    } else if (v === 1) {
      store.drawerVisible = true
    } else if (v === 2) {
      // console.log('删除', record)
    } else if (v === 3) {
      store.drawerVisible = true
      store.addstatus = true
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
      // getCheckboxProps: record => ({
      // }),
    }
    const listConfig = {
      key: 'id',
      rowKey: 'id',
      rowSelection: rowSelection || null,
      columns: this.columns,
      tableLoading,
      store,
      initParams: {},
      searchParams: search(store),
      buttons: [
        <Button type="primary" className="mr8" onClick={() => this.openDrawer(3)}>新建推送</Button>,
        <Button type="primary" className="mr8" onClick={() => this.openModal()}>删除推送</Button>,
      ],
    }
    return (
      <div className="group-push-list" style={{height: 'calc(100vh - 203px)'}}>
        {/* 表格部分 */}
        <div className="list-content">
          <ListContent {...listConfig} />
        </div>
        {store.drawerVisible ? <AddDrawer store={store} /> : null}
      </div>
    )
  }
}
