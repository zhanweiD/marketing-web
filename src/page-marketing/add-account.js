/**
 * @description 添加账户
 */
import {useEffect, useState} from 'react'

import {Button, ConfigProvider, Drawer} from 'antd'

const AddAccount = () => {
  const [visible, setVisible] = useState(false)

  return (
    <div className="page">
      <div className="page-main">
        <div className="content-header">
          添加账户 
        </div>
      </div>
    </div>

  )
}

export default AddAccount
