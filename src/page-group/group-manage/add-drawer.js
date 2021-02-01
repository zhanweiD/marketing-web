/* eslint-disable no-undef */

/**
 * @description 新建推送
 */
/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {Spin, Drawer, Button, Form, Select, Radio, Input, Tree} from 'antd'
// import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {errorTip} from '../../common/util'

@observer
class AddDrawer extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  formRef = React.createRef()
  onClose = () => {
    this.store.drawerVisible = false
    this.store.addstatus = false
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
  @action onRadioChange = e => {
    // this.store.type = e.target.value
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
    const {Search} = Input
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
          <span className="site-tree-search-value">{searchValue}</span>
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
      title: this.store.addstatus ? '新建推送' : '编辑推送',
      width: 500,
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
            <Form.Item 
              key="服务名称" 
              label="服务名称" 
              initialValue="meiyuo"
              rules={[{required: true}]} 
              style={{minHeight: '24px'}}
            >
              <Select
                mode="multiple"
                placeholder="暂无"
                onChange={(value, option) => this.onOptionChange(option)}
                className="select-item"
                disabled={!this.store.addstatus}
                showArrow
              >
                {/* <Option
                  key={content.name}
                  status={content.status}
                  disabled={item.name === 'type' ? this.store.addstatus ? content.status === 1 : true : false}
                  name={item.name}
                  id={content.id}
                  value={content.id || ''}
                >
                  1
                </Option> */}
              </Select>
            </Form.Item>
            <Form.Item 
              key="关联应用" 
              label="关联应用" 
              rules={[{required: true}]} 
              initialValue={this.store.addstatus ? '' : '没有数据'}
              style={{minHeight: '24px'}}
            >
              <Select
                mode="multiple"
                placeholder="暂无"
                onChange={(value, option) => this.onOptionChange(option)}
                className="select-item"
                disabled={!this.store.addstatus}
                showArrow
              >
                {/* <Option
                  key={content.name}
                  status={content.status}
                  disabled={item.name === 'type' ? this.store.addstatus ? content.status === 1 : true : false}
                  name={item.name}
                  id={content.id}
                  value={content.id || ''}
                >
                  1
                </Option> */}
              </Select>
            </Form.Item>
            <Form.Item 
              key="推送周期" 
              label="推送周期" 
              rules={[{required: true}]} 
              style={{minHeight: '24px'}}
            >
              <Select
                mode="multiple"
                placeholder="暂无"
                onChange={(value, option) => this.onOptionChange(option)}
                className="select-item"
                showArrow
              >
                {/* <Option
                  key={content.name}
                  status={content.status}
                  disabled={item.name === 'type' ? this.store.addstatus ? content.status === 1 : true : false}
                  name={item.name}
                  id={content.id}
                  value={content.id || ''}
                >
                  1
                </Option> */}
              </Select>
            </Form.Item>
            <Form.Item label="有效期" rules={[{required: true}]} name="radio">
              <Radio.Group onChange={e => this.onRadioChange(e)} value style={{fontSize: '12px'}}>
                <Radio value={0} style={{fontSize: '12px'}}>永久</Radio>
                <Radio value={1} style={{fontSize: '12px'}}>自定义</Radio>
              </Radio.Group>
            </Form.Item>
            <Form.Item key="描述" label="描述" rules={[{type: 'string', max: 200, message: '不能超过200字'}]}>
              <Input.TextArea style={{minHeight: '53px', margin: '0'}} placeholder="非必填,字数不能超过200字" maxLength={200} />
            </Form.Item>
            <Form.Item key="推送列" label="推送列" rules={[{type: 'string', maxHeight: '320px'}]}>
              <Input />
            </Form.Item>
            <div style={{width: '88%', margin: '0 auto'}} className="tree">
              <Search style={{marginBottom: 8, width: '100%'}} placeholder="输入标签名称搜索" onChange={this.onChange} />
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
