/**
 * @description 登录
 */
import {useEffect, useState} from 'react'

import zhCN from 'antd/lib/locale/zh_CN'
import {Button, ConfigProvider, Drawer} from 'antd'

import {ListContent} from '../component'
import store from './store'
import AddDrawer from './add-drawer'

const Marketing = () => {
  const [visible, setVisible] = useState(false)

  const changeVisible = value => {
    console.log(value)
    setVisible(value)
  }

  const columns = [
    {
      title: '营销任务名称',
      key: 'dataTableName',
      dataIndex: 'dataTableName',
    }, {
      title: '应用名',
      key: 'mappingKey',
      dataIndex: 'mappingKey',
    }, {
      title: '步骤数',
      key: 'configuredField',
      dataIndex: 'configuredField',
    }, {
      title: '账号',
      key: 'isUsed',
      dataIndex: 'isUsed',
    }, 
  ]

  const buttons = [
    <div className="dfjs">
      <Button 
        type="primary" 
        onClick={() => changeVisible(true)}
      >
        创建任务
      </Button>
    </div>,
  ]

  const listConfig = {
    columns,
    buttons: [buttons],
    store, // 必填属性
  }

  return (
    <ConfigProvider locale={zhCN}>
      <div
        className="page"
      >
        <div className="page-main pt16">
          <ListContent {...listConfig} />
          <AddDrawer
            visible={visible}
            changeVisible={changeVisible}
          />
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Marketing
