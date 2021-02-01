/**
 * @description 画像配置的编辑部分
 */
import React, {Component} from 'react'
import {observer} from 'mobx-react'
import {action, toJS} from 'mobx'
import {Spin, Drawer, Button, Form, Select, Space, Radio} from 'antd'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {errorTip} from '../../common/util'
import {Loading} from '../../component'

const {Option} = Select
@observer
class AddDrawer extends Component {
  constructor(props) {
    super(props)
    this.store = props.store
  }
  componentDidMount() {
    // 获取对象，标签，类目列表
    this.store.getObjList()
  }
  formRef = React.createRef()

  @action onClose = () => {
    this.store.drawerVisible = false
    this.store.addstatus = false
    this.store.existTablesList = []
    this.store.resetValue()
  }

  // 触点类目已添加禁用
  @action add = async () => {
    await this.formRef.current.validateFields(['eventTableInfo']).then(values => {
      this.store.existTablesList = values.eventTableInfo
    })
    // this.forceUpdate()
  }

  // 触点类目获取焦点获取已添加数据
  @action onCatFocus = async () => {
    await this.formRef.current.validateFields(['eventTableInfo']).then(values => {
      this.store.existTablesList = values.eventTableInfo
    })
    this.forceUpdate()
  }

  // 删除触点
  @action remove = () => {
    this.formRef.current.validateFields(['eventTableInfo']).then(values => {
      this.store.existTablesList = values.eventTableInfo
    })
  }

  // 触点时间获取焦点，获取当前触点时间列表数据
  @action getCatValue = name => {
    const tableName = this.formRef.current.getFieldValue(['eventTableInfo'])[name] ? this.formRef.current.getFieldValue(['eventTableInfo'])[name].table : ''
    // eslint-disable-next-line no-restricted-syntax
    for (const key in this.store.relTableFieldsContent) {
      // 对获取的当前的触点类目进行判断
      if (tableName) {
        if (key === tableName) {
          this.store.relTableFieldsList = this.store.relTableFieldsContent[key]
          this.forceUpdate()
        }
      } else {
        this.store.relTableFieldsList = []
        this.forceUpdate()
      }
    }
  }

  // 提交
  submit = () => {
    this.formRef.current.validateFields().then(values => {
      if (this.store.addstatus) {
        // values.objId = this.store.objId
        this.store.getAdd(values)
      } else {
        values.id = this.store.detailObj.id
        this.store.getUpdate(values)
      }
    }).catch(e => {
      errorTip(e)
    })
  }

  // 下拉发生改变
  @action onOptionChange = option => {
    if (option.name === 'objId') {
      this.store.objId = option.id
      this.store.resetValue()
      
      this.formRef.current.resetFields(['search', 'name', 'identification', 'basic', 'portrait', 'eventTableInfo'])
      this.store.getTagList({id: option.id})
      this.store.getCatList({id: option.id})
      // 添加触点
      this.store.getRelTables({objId: option.id})
    }
  }

  // 触点列表改变
  @action onCatChange = option => {
    this.store.getRelTableFields({objId: this.store.objId, tableName: option})
  }

  render() {
    const {
      confirmLoading,
      formLoading,
      addstatus,
      drawerVisible,
      detailObj,
      list,
      existTablesList,
      relTablesList = [],
      relTableFieldsList = [],
    } = this.store

    const {
      objId,
      search,
      name,
      identification,
      basic,
      portrait,
      eventTableInfo,
      type,
    } = detailObj

    // drawer设施项
    const drawerProps = {
      visible: drawerVisible,
      title: addstatus ? '添加画像' : '编辑画像',
      width: 512,
      placement: 'right',
      maskClosable: false,
      destroyOnClose: true,
      onClose: () => this.onClose(),
    }

    const layout = {
      labelCol: {span: 5},
      wrapperCol: {span: 17},
      initialValues: {
        objId,
        search,
        name,
        identification,
        basic,
        portrait,
        eventTableInfo,
        type,
      },
    }

    // 不建议遍历生成，对单项表单控制会变复杂
    const selectConfig = [
      {
        name: 'objId',
        label: '实体名称',
        placeholder: '请选择实体名称',
        option: this.store.objList,
      }, {
        name: 'search',
        label: '搜索条件',
        placeholder: '请选择可搜索条件，最多两个',
        option: this.store.tagList,
        mode: 'multiple',
      }, {
        name: 'name',
        label: '个体名称',
        placeholder: '请选择个体名称',
        option: this.store.tagList,
      }, {
        name: 'identification',
        label: '个体标识',
        placeholder: '请选择个体标识',
        option: this.store.tagList,
      }, {
        name: 'basic',
        label: '基础模块',
        placeholder: '请选择基础模块',
        option: this.store.catList,
        mode: 'multiple',
        allowClear: true,
      }, {
        name: 'portrait',
        label: '画像模块',
        placeholder: '请选择画像模块',
        option: this.store.catList,
        mode: 'multiple',
        allowClear: true,
      },
    ]

    const detailType = list[0] ? (1 - list[0].type) : 0
    const disType = list[0] ? list[0].type : null

    return (
      <Drawer {...drawerProps}>
        {
          formLoading ? <Loading /> : (
            <Form {...layout} ref={this.formRef}>
              <Form.Item 
                name="type"
                label="画像类型" 
                rules={[{required: true, message: '请选择画像类型'}]} 
                initialValue={detailObj.type || detailType} 
              >
                {
                  addstatus ? (
                    <Radio.Group>
                      <Radio value={0} disabled={disType === 0}>客户</Radio>
                      <Radio value={1} disabled={disType === 1}>顾问</Radio>
                    </Radio.Group>
                  ) : (
                    <Radio.Group>
                      <Radio value={0} disabled={list.length === 2}>客户</Radio>
                      <Radio value={1} disabled={list.length === 2}>顾问</Radio>
                    </Radio.Group>
                  )
                }
              </Form.Item>
                
              {selectConfig.map(item => {
                return (
                  <Form.Item 
                    key={item.name} 
                    name={item.name} 
                    label={item.label} 
                    rules={item.name === 'search' ? [{type: 'array', max: 2, message: '请选择搜索条件，并最多选择两个', required: true}] : [{required: true, message: `请选择${item.label}`}]} 
                    style={{minHeight: '24px'}}
                  >
                    <Select
                      mode={item.mode}
                      allowClear={item.allowClear}
                      placeholder={item.placeholder}
                      onChange={(value, option) => this.onOptionChange(option)}
                      className="select-item"
                      showArrow
                      disabled={item.name === 'objId' && !addstatus}
                    >
                      {
                        item.option.map(content => {
                          return (
                            <Option
                              key={content.id}
                              disabled={item.name === 'objId' ? content.status : false}
                              name={item.name}
                              id={content.id}
                              value={content.id}
                            >
                              {content.name}
                            </Option>
                          )
                        })
                      }
                    </Select>
                  </Form.Item>
                )
              })}
              {/* 添加触点 */}
              <Form.List name="eventTableInfo">
                {(fields, {add, remove}) => (
                  <div className="form-list" style={{backgroundColor: '#f1f1f1', paddingTop: '16px'}}>
                    {fields.map((field, index) => (
                      <div style={{position: 'relative', overFellow: 'auto'}}>
                        <Space key={field.key} style={{display: 'flex', marginBottom: 4}} align="baseline" wrap>
                          <Form.Item
                            style={{paddingLeft: '11px'}}
                            {...field}
                            key={field.key}
                            label="触点类目"
                            name={[field.name, 'table']}
                            fieldKey={[field.fieldKey, 'table']}
                            rules={[{required: true, message: '请选择触点类目'}]}
                          >
                            <Select
                              mode=""
                              allowClear={false}
                              placeholder="请选择类目"
                              onFocus={() => this.onCatFocus()}
                              onChange={option => this.onCatChange(option)}
                              className="select-item"
                              style={{width: '322px'}}
                              showArrow
                            >
                              {
                                existTablesList ? (
                                  existTablesList && relTablesList.map(content => {
                                    for (let i = 0; i < existTablesList.length; i++) {
                                      if (existTablesList[i] && existTablesList[i].table === content.table) {
                                        return <Option disabled key={content.value} table={content.table} value={content.table}>{content.value}</Option>
                                      }
                                    }
                                    return <Option key={content.value} table={content.table} value={content.table}>{content.value}</Option>
                                  })
                                ) : (
                                  relTablesList.map(content => {
                                    return <Option key={content.value} table={content.table} value={content.table}>{content.value}</Option>
                                  })
                                )
                              }
                            </Select>
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => { this.remove(); return remove(field.name) }} style={{marginLeft: '10px'}} />
                          <Form.Item
                            style={{paddingLeft: '11px'}}
                            {...field}
                            key={field.key}
                            label="触点时间"
                            name={[field.name, 'field']}
                            fieldKey={[field.fieldKey, 'field']}
                            rules={[{required: true, message: '请选择触点时间'}]}
                          >
                            <Select
                              mode=""
                              allowClear={false}
                              placeholder="请选择触点时间"
                              onFocus={() => this.getCatValue(field.name)}
                              onChange={(value, option) => this.onOptionChange(option)}
                              className="select-item"
                              style={{width: '322px'}}
                              showArrow
                            >
                              {
                                relTableFieldsList.map(content => {
                                  return <Option key={content.value} field={content.field} value={content.field}>{content.value}</Option>
                                })
                              }
                            </Select>
                          </Form.Item>
                          <MinusCircleOutlined onClick={() => { this.remove(); return remove(field.name) }} style={{marginLeft: '10px'}} />
                        </Space>
                        <div style={{borderTop: '1px #ccc dashed', height: '1px', margin: 'auto', width: '80%', position: 'relative', bottom: '8px'}} />
                      </div>
                    ))}
                    <Form.Item style={{display: 'flex', justifyContent: 'center'}}>
                      <Button 
                        type="ghost" 
                        onClick={async () => { await this.add(); return add() }} 
                        style={{border: 'none', outLine: 'none', marginBottom: '8px'}} 
                        block 
                        icon={<PlusOutlined />}
                      >
                        添加触点
                      </Button>
                    </Form.Item>
                  </div>
                )}
              </Form.List>
            </Form>
          )
        }

        <div className="bottom-button">
          <Button className="mr8" onClick={() => this.onClose()}>取消</Button>
          <Button
            onClick={() => this.submit()}
            loading={confirmLoading}
            type="primary"
          >
            确认
          </Button>
        </div>
      </Drawer>
    )
  }
}

export default AddDrawer
