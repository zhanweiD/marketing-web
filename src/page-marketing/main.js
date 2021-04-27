/**
 * @description 登录
 */
import React, {useEffect, useState} from 'react'

import zhCN from 'antd/lib/locale/zh_CN'
import {Button, ConfigProvider, Table, Popconfirm} from 'antd'

import AddDrawer from './add-drawer'
import io from './io'
import {successTip} from '../common/util'

const Marketing = () => {
  const [visible, setVisible] = useState(false)
  const [listData, setListData] = useState([])

  // 获取任务列表
  async function getList() {
    io.getList().then(res => {
      setListData(() => res.list || [])
    }).catch(err => {
      console.log(err)
    })
  }

  // 删除任务
  async function delTask(id) {
    io.delTask({id}).then(res => {
      successTip('删除成功')
      getList()
    }).catch(err => {
      console.log(err)
    })
  }

  const columns = [
    {
      title: '营销任务名称',
      key: 'name',
      dataIndex: 'name',
    }, {
      title: '描述',
      key: 'descr',
      dataIndex: 'descr',
    }, {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <Popconfirm
          title="确定删除吗?"
          onConfirm={() => delTask(record.id)}
          onCancel={() => {}}
          okText="确定"
          cancelText="取消"
        >
          <a href>删除</a>
        </Popconfirm>
      ),
    },
  ]

  const changeVisible = value => {
    setVisible(value)
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <ConfigProvider locale={zhCN}>
      <div className="page">
        <div className="page-main pt16 pl24 pr24">
          <Button className="mb8" type="primary" onClick={() => changeVisible(true)}>创建任务</Button>
          <Table columns={columns} dataSource={listData} />
          <AddDrawer
            visible={visible}
            changeVisible={changeVisible}
            getList={getList}
          />
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Marketing
