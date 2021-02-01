/**
 * @description 新建应用
 */
/* eslint-disable react/jsx-no-undef */
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {action} from 'mobx'
import {Spin, Drawer, Button, Form, Select, Radio, Input} from 'antd'
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
    this.store.addStatus = false
  }
  submit = () => {
    this.formRef.current.validateFields().then(values => {
      console.log(values)
    }).catch(e => {
      errorTip(e)
    })
  }
  componentDidMount() {
  }
  // 下拉发生改变
  @action onOptionChange = option => {
  }

  @action selectTimeChange = (value, option) => {
    console.log(value)
    // console.log(option)
    this.store.selectTimeValue = value
  }

  render() {
    const {
      confirmLoading,
    } = this.store

    // drawer设施项
    const drawerProps = {
      visible: this.store.drawerVisible,
      title: this.store.addStatus ? '添加应用' : '编辑应用',
      width: 600,
      placement: 'right',
      maskClosable: false,
      destroyOnClose: true,
      onClose: () => this.onClose(),
    }
    const layout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
      initialValues: this.store.addStatus ? {} : {
      },
    }

    return (
      <Spin spinning={this.store.drawerLoading}>
        <Drawer {...drawerProps} className="push-list-drawer">
          <Form {...layout} ref={this.formRef}>
            <Form.Item
              key="应用名称"
              label="应用名称"
              name="serve"
              rules={[{required: false, message: '请选择应用名称'}]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              key="目的数据源"
              label="目的数据源"
              name="application"
              rules={[{required: true, message: '请选择目的数据源'}]}
            >
              <Select
                mode="multiple"
                placeholder="暂无"
                onChange={(value, option) => this.onOptionChange(option)}
                className="select-item"
                // disabled={!this.store.addStatus}
                showArrow
              >
                {/* <Option
                  key={content.name}
                  status={content.status}
                  disabled={item.name === 'type' ? this.store.addStatus ? content.status === 1 : true : false}
                  name={item.name}
                  id={content.id}
                  value={content.id || ''}
                >
                  1
                </Option> */}
              </Select>
            </Form.Item>
            <Form.Item
              key="目的数据表"
              label="目的数据表"
              name="目的数据表"
              rules={[{required: true, message: '请选择目的数据表'}]}
            >
              <Select
                placeholder="请选择推送周期"
                onChange={(value, option) => this.oncycleChange(option)}
                className="select-item"
                showArrow
              >
                {this.store.selectCycle.map(item => (
                  <Option
                    key={item.key}
                    cycle={item.cycle}
                    value={item.cycle}
                  >
                    {item.value}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item key="描述" label="描述" rules={[{type: 'string', max: 200, message: '不能超过200字'}]}>
              <Input.TextArea style={{minHeight: '53px', margin: '0'}} placeholder="非必填,字数不能超过200字" maxLength={200} />
            </Form.Item>
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
