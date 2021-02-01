/* eslint-disable no-nested-ternary */
/**
 * @description 推出列表
 */
import {Component} from 'react'
import {action} from 'mobx'
import {observer} from 'mobx-react'
import {Button, Badge, Tooltip, Popconfirm} from 'antd'
import {Time} from '../../../common/util'
import {
  ListContent, OmitTooltip,
} from '../../../component'
import './main.styl'
import store from './store'
import search from './search'
import AddDrawer from './add-drawer'
// import {errorTip} from '../../common/util'

@observer
export default class ExportList extends Component {
  columns = [{
    key: 'objName',
    title: '文件名称',
    dataIndex: 'objName',
    className: 'tr-w64',
  }, {
    key: 'guestName',
    title: '客群名称',
    dataIndex: 'guestName',
    className: 'tr-w64',
    
  }, {
    key: 'exportColumn',
    title: '导出列',
    dataIndex: 'exportColumn',
    className: 'tr-w64',
    ellipsis: true,
    render: t => {
      t = t.map((item, index) => {
        return index > 0 ? `、${item}` : item
      })
      return t ? <OmitTooltip maxWidth={400} text={t} /> : '-'
    },
  }, {
    key: 'status',
    title: '状态',
    className: 'tr-w40',
    dataIndex: 'status',
    render: v => {
      if (v === 1) {
        return (<Badge color="green" text="成功" />)
      } if (v === 2) {
        return (<Badge color="red" text="失败" />)
      } if (v === 3) {
        return (<Badge color="blue" text="导出中" />)
      } return (<Badge color="gray" text="未开始" />)
    },
  }, {
    key: 'createTime',
    title: '创建时间',
    dataIndex: 'createTime',
    className: 'tr-w64',
    width: 145,
    render: text => <Time timestamp={text} />,
  }, {
    key: 'creater',
    title: '创建人',
    className: 'tr-w40',
    dataIndex: 'creater',
  }, {
    key: 'action',
    title: '操作',
    className: 'tr-w40',
    width: 130,
    render: (text, record) => (
      <div className="FBH FBAC">
        {record.status === 1 ? (
          <a href onClick={e => this.openDrawer(1, record, e)} className="mr16">下载</a>
        ) : (
          record.status === 2 ? (
            <a href onClick={e => this.openDrawer(2, record, e)} className="mr16">重试</a>
          ) : (
            record.status === 3 ? (
              <a href onClick={e => this.openDrawer(3, record, e)} className="mr16">取消</a>
            ) : (
              <a href onClick={e => this.openDrawer(4, record, e)} className="mr16">开始</a>
            ) 
          )
        ) }
        {record.status === 3 ? (
          <Tooltip title="导出中，不可操作" arrowPointAtCenter placement="top">
            <a href className="mr8" style={{color: 'gray'}}>配置</a>
          </Tooltip>
        ) : <a href onClick={() => this.openDrawer(5, record)} className="mr8">配置</a>}
        {/* {record.status === 3 ? (
          <Tooltip title="导出中，不可操作" arrowPointAtCenter placement="top">
            <a href className="mr8" style={{color: 'gray'}}>清除</a>
          </Tooltip>
        ) : (
          <Popconfirm
            title="清除客群导出文件后不可恢复,你确定要清除吗"
            onConfirm={() => this.onDelete(record)}
            placement="topRight"
            // getPopupContainer={triggerNode => triggerNode.parentNode}
            style={{maxWidth: '210px', whiteSpace: 'wrap'}}
            // onCancel={cancel}
            okText="确认"
            cancelText="取消"
          >
            <a href onClick={() => this.openDrawer(6, record)} className="mr8">清除</a>
          </Popconfirm>
        )} */}
      </div>
    ),
  }]
  // 清除
  @action onDelete= record => { console.log(record) }
  @action openDrawer = (v, record) => {
    //  1下载 2重试 3取消 4开始 5配置 6清除
    if (v === 1) {
      // store.disable(record)
    } else if (v === 2) {
    //   store.getPerm(() => store.showDrawer(e))
    } else if (v === 3) {
    //   store.getPerm(() => store.showDrawer(e))
    } else if (v === 4) {
    //   store.getPerm(() => store.showDrawer(e))
    } else if (v === 5) {
      store.drawerVisible = true
    } else if (v === 6) {
    //   store.getPerm(() => store.showDrawer(e))
    } 
  }
  @action.bound onTableCheck(selectedRowKeys) {
    // 表格 - 已选项key数组
    store.publishRowKeys = selectedRowKeys
  }
  render() {
    const {publishRowKeys, tableLoading} = store
    const rowSelection = {
      selectedRowKeys: publishRowKeys.slice(),
      onChange: this.onTableCheck,
      getCheckboxProps: record => ({
        // disabled: record.status !== 1, // 权限审批中的，不可进行申请、批量申请，且显示审批中
      }),
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
        <Button type="primary" className="mr8" onClick={() => this.openModal()}>全部开始</Button>,
        <Button type="primary" className="mr8" onClick={() => this.openModal()}>全部取消</Button>,
      ],
    }
    return (
      <div className="group-export-list" style={{height: 'calc(100vh - 203px)'}}>
        {/* 表格部分 */}
        <div className="list-content">
          <ListContent {...listConfig} />
        </div>
        {store.drawerVisible ? <AddDrawer store={store} /> : null}
      </div>
    )
  }
}
