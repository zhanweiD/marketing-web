/* eslint-disable no-undef */

/**
 * @description 新建推送
 */
/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {Spin, Drawer, Button, Form, Input, Tree, Alert} from 'antd'
import {SearchOutlined} from '@ant-design/icons'
// import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {errorTip} from '../../../common/util'
import './main.styl'

@observer
class AddDrawer extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  formRef = React.createRef()
  onClose = () => {
    this.store.drawerVisible = false
  }
  submit = () => {
    this.formRef.current.validateFields().then(values => {
      console.log(values)
    }).catch(e => {
      errorTip(e)
    })
  }
  componentDidMount() {
    // 获取对象，标签，类目列表
    // this.store.getObjList()
    this.generateList(this.store.gData)
  }
  // 下拉发生改变
  @action onOptionChange = option => {
  }
  // 树形组件
  @action generateList = data => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const {key} = node
      this.store.dataList.push({key, title: key})
      if (node.children) {
        this.generateList(node.children)
      }
    }
  }
  
  @action getParentKey = (key, tree) => {
    let parentKey
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tree.length; i++) {
      const node = tree[i]
      if (node.children) {
        if (node.children.some(item => item.key === key)) {
          parentKey = node.key
        } else if (this.getParentKey(key, node.children)) {
          parentKey = this.getParentKey(key, node.children)
        }
      }
    }
    return parentKey
  }
  @action onExpand = expandedKeys => {
    this.store.expandedKeys = expandedKeys
    this.store.autoExpandParent = false
  }

  @action onChange = e => {
    const {value} = e.target
    let expandedKeys = this.store.dataList
      .map(item => {
        if (item.title.indexOf(value) > -1) {
          // eslint-disable-next-line no-undef
          return this.getParentKey(item.key, this.store.gData)
        }
        return null
      })
      .filter((item, i, self) => item && self.indexOf(item) === i)
    if (value === '') {
      expandedKeys = []
    }
    this.store.expandedKeys = expandedKeys
    this.store.searchValue = value
    this.store.autoExpandParent = true
  }

  render() {
    const {
      confirmLoading,
    } = this.store
    const {searchValue, expandedKeys, autoExpandParent, gData} = this.store
    const loop = data => data.map(item => {
      const index = item.title.indexOf(searchValue)
      const beforeStr = item.title.substr(0, index)
      const afterStr = item.title.substr(index + searchValue.length)
      const title = index > -1 ? (
        <span>
          {beforeStr}
          <span className="site-tree-search-value" style={{color: '#f50'}}>{searchValue}</span>
          {afterStr}
        </span>
      ) : (
        <span>{item.title}</span>
      )
      if (item.children) {
        return {title, key: item.key, children: loop(item.children)}
      }

      return {
        title,
        key: item.key,
      }
    })
    // drawer设施项
    const drawerProps = {
      visible: this.store.drawerVisible,
      title: '导出客群配置',
      width: 580,
      placement: 'right',
      maskClosable: false,
      destroyOnClose: true,
      onClose: () => this.onClose(),
    }
    const layout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
    }
    
    return (
      <Spin spinning={this.store.drawerLoading}>
        <Drawer {...drawerProps}>
          <Form {...layout} ref={this.formRef}>
            <Form.Item key="文件名称" label="文件名称" rules={[{type: 'string'}]}>
              <Input />
            </Form.Item>
            <Form.Item key="推送列" label="推送列" rules={[{type: 'string'}]}>
              <Alert message={`当前已选${21}个标签`} type="info" showIcon style={{fontSize: '12px', padding: '2px 4px 2px 20px'}} />
            </Form.Item>
            <div style={{width: '88%', margin: '0 auto'}} className="tree">
              <Input suffix={<SearchOutlined />} placeholder="输入标签名称搜索" onChange={this.onChange} style={{marginBottom: '16px'}} />
              <Tree
                height={320}
                style={{border: '1px solid #ddd', minHeight: '320px', padding: '16px 0 0 16px'}}
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={autoExpandParent}
                treeData={loop(gData)}
                showLine
                switcherIcon={null}
              />
            </div>
          </Form>
          <div className="bottom-button">
            <Button className="mr8" onClick={() => this.onClose()}>取消</Button>
            <Button
              onClick={() => this.submit()}
              confirmLoading={confirmLoading}
              type="primary"
            >
              确认
            </Button>
          </div>
        </Drawer>
      </Spin>
    )
  }
}

export default AddDrawer
