/**
 * @description 登录
 */
import {useEffect, useState} from 'react'

import zhCN from 'antd/lib/locale/zh_CN'
import {Button, ConfigProvider, Drawer} from 'antd'

import {ListContent} from '../component'
import store from './store'

const Login = () => {
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
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
        onClick={showDrawer}
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

  const modalConfig = {
    title: '创建任务',
    visible,
    maskClosable: false,
    onClose,
    footer: [
      <div className="bottom-button">
        <Button className="mr8" onClick={onClose}>关闭</Button>
        <Button type="primary" onClick={onClose}>确认</Button>
      </div>,
      
    ],
    width: 1120,
    destroyOnClose: true,
  }
  

  return (
    <ConfigProvider locale={zhCN}>
      <div
        className="page"
      >
        <div className="page-main pt16">
          <ListContent {...listConfig} />
          <Drawer
            {...modalConfig}
          >
            111
          </Drawer>
        </div>
      </div>
    </ConfigProvider>
  )
}

export default Login
