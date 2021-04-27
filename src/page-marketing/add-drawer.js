import {useState, Fragment, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Button, Drawer, Form, Input, Select} from 'antd'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import io from './io'
import {errorTip, successTip} from '../common/util'

const {Option} = Select
const AddDrawer = ({
  visible,
  changeVisible,
  getList,
}) => {
  const [form] = Form.useForm()
  const [appList, setAppList] = useState([])
  const [accountList, setAccountList] = useState([])
  const [eventList, setEventList] = useState([])
  const [actionList, setActionList] = useState([])
  const [type, setType] = useState({})
  const [appCode, setAppCode] = useState(null)
  const [conditionList, setConditionList] = useState([])

  
  const onClose = () => {
    changeVisible(false)
    setType({})
    form.resetFields()
  }

  // 添加任务
  async function addTask(params) {
    io.addTask(params).then(res => {
      successTip('创建成功')
      onClose()
      getList()
    }).catch(err => {
      errorTip(err)
    })
  }

  const submit = data => {
    const {taskInfo = []} = data
    if (taskInfo.length === 1) {
      addTask(data)
      return
    }
    for (let i = taskInfo.length - 2; i >= 0; i--) {
      if (taskInfo[i + 1].expr) taskInfo[i + 1].expr = [taskInfo[i + 1].expr]
      if (taskInfo[i + 1].params) taskInfo[i + 1].params = [taskInfo[i + 1].params]
      taskInfo[i].next = [taskInfo[i + 1]]
      if (i === 0) {
        data.taskInfo = taskInfo[0]
        addTask(data)
      }
    }
  }

  const modalConfig = {
    title: '创建任务',
    visible,
    maskClosable: false,
    onClose,
    footer: [
      <div className="bottom-button">
        <Button 
          className="mr8" 
          onClick={onClose}
        >
          关闭
        </Button>
        <Button 
          type="primary" 
          onClick={() => {
            form
              .validateFields()
              .then(values => {
                submit(values)
              })
              .catch(info => {
                console.log('Validate Failed:', info)
              })
          }}
        >
          确认
        </Button>
      </div>,
      
    ],
    width: 1120,
    destroyOnClose: true,
  }

  const itemLayout = {
    labelCol: {span: 2, offset: 2},
    wrapperCol: {span: 20},
  }
  const itemLayoutBtn = {
    wrapperCol: {span: 22, offset: 1},
  }
  const formItemLayout = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
    labelAlign: 'right',
  }

  // 获取app
  async function getApp() {
    io.getApp().then(res => {
      setAppList(res.list || [])
    }).catch(err => {
      errorTip(err)
    })
  }

  // 获取应用下账户
  async function getAccount(v) {
    io.getAccount({
      appCode: v,
    }).then(res => {
      setAccountList(res.list || [])
    }).catch(err => {
      errorTip(err)
    })
  }

  // 获取应用下事件
  async function getEvent(v) {
    io.getEvent({
      appCode: v,
    }).then(res => {
      setEventList(res.list || [])
    }).catch(err => {
      errorTip(err)
    })
  }

  // 获取应用下事件
  async function getAction(v) {
    io.getAction({
      appCode: v,
    }).then(res => {
      setActionList(res.list || [])
    }).catch(err => {
      errorTip(err)
    })
  }

  // 获取条件
  async function getCondition(params) {
    io.getCondition(params).then(res => {
      setConditionList(res.list)
    }).catch(err => {
      errorTip(err)
    })
  }

  const changeApp = v => {
    setAppCode(v)
    form.resetFields(['account', 'event', 'action'])
    getAccount(v)
    getEvent(v)
    getAction(v)
  }

  const changeType = (v, i) => {
    setType(obj => {
      return {
        [i]: v,
        ...obj,
      }
    })
  }

  const changeEvent = v => {
    getCondition({appCode, eventCode: v})
  }

  useEffect(() => {
    getApp()
  }, [])
  
  return (
    <Drawer
      {...modalConfig}
    >
      <Form name="dynamic_form_item" {...formItemLayout} form={form}>
        <Form.Item 
          name="name"
          label="任务名称" 
          {...itemLayout}
          rules={[
            {required: true, message: '请输入任务名称'},
          ]}
        >
          <Input style={{width: '50%'}} size="small" placeholder="请输入名称" />
        </Form.Item>
        <Form.Item 
          name="descr"
          label="描述" 
          {...itemLayout}
        >
          <Input.TextArea style={{width: '50%'}} size="small" placeholder="请输入描述" />
        </Form.Item>
        <Form.List 
          name="taskInfo"
          initialValue={[{}]}
        >
          {(fields, {add, remove}, {errors}) => (
            <Fragment>
              {fields.map((field, index) => (
                <Form.Item
                  label={`步骤${index + 1}`}
                  required={false}
                  key={field.key}
                  style={{paddingLeft: '8px'}}
                >
                  {fields.length > 1 ? (
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name)
                      }}
                    />
                  ) : null}
                  <div key={field.key}>
                    <Form.Item
                      {...field}
                      {...formItemLayout}
                      name={[field.name, 'appCode']}
                      label="应用"
                      rules={[
                        {
                          required: true,
                          message: '请选择应用',
                        },
                      ]}
                    >
                      <Select 
                        placeholder="请选择应用" 
                        style={{width: '50%'}}
                        onChange={changeApp}
                      >
                        {
                          appList.map(item => <Option key={item.code} value={item.code}>{item.name}</Option>)
                        }
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      {...formItemLayout}
                      name={[field.name, 'accountId']}
                      label="账户"
                      rules={[
                        {
                          required: true,
                          message: '请选择账户',
                        },
                      ]}
                    >
                      <Select 
                        placeholder="请选择账户" 
                        style={{width: '50%'}}
                        // dropdownRender={menu => (
                        //   <div>
                        //     {menu}
                        //     <div 
                        //       className="c85 fs12 ml14 mt4"
                        //       style={{height: '24px', lineHeight: '24px'}}
                        //       onClick={() => console.log('添加失败')}
                        //     >
                        //       <Link target="_blank" to="/add-account">
                        //         添加新账户
                        //       </Link>
                        //     </div>
                        //   </div>
                        // )}
                      >
                        {
                          accountList.map(item => <Option key={item.accountId} value={item.accountId}>{item.accountName}</Option>)
                        }
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      label="类型"
                      name={[field.name, 'type']}
                      {...formItemLayout}
                      rules={[
                        {
                          required: true,
                          message: '请选择类型',
                        },
                      ]}
                    >
                      <Select
                        placeholder="请选择类型" 
                        style={{width: '50%'}}
                        onChange={v => changeType(v, index)}
                      >
                        <Option disabled={fields.length > 1} value={0}>事件</Option>
                        <Option disabled={fields.length <= 1} value={1}>条件</Option>
                        <Option disabled={fields.length <= 1} value={2}>动作</Option>
                      </Select>
                    </Form.Item>
                    {
                      type[index] === 0 ? (
                        <Form.Item
                          {...field}
                          {...formItemLayout}
                          name={[field.name, 'code']}
                          label="事件"
                          rules={[
                            {
                              required: true,
                              message: '请选择事件',
                            },
                          ]}
                        >
                          <Select onChange={changeEvent} placeholder="请选择事件" style={{width: '50%'}}>
                            {
                              eventList.map(item => <Option value={item.code}>{item.name}</Option>)
                            }
                          </Select>
                        </Form.Item>
                      ) : null
                    }
                    {
                      type[index] === 1 ? (
                        <Form.Item 
                          label="条件"
                          {...field}
                          name={[field.name, 'expr']}
                          {...formItemLayout}
                          rules={[{required: true, message: '请选择条件'}]}
                        >
                          <Input.Group compact>
                            <Form.Item
                              name={[field.name, 'expr', 'code']}
                              noStyle
                              rules={[{required: true, message: '请选择条件'}]}
                            >
                              <Select style={{width: '15%'}} placeholder="请选择条件">
                                {
                                  conditionList.map(item => <Option value={item.code}>{item.name}</Option>)
                                }
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name={[field.name, 'expr', 'op']}
                              noStyle
                              rules={[{required: true, message: '请选择'}]}
                            >
                              <Select style={{width: '15%'}} placeholder="请选择">
                                <Option value="大于">大于</Option>
                                <Option value="小于">小于</Option>
                                <Option value="等于">等于</Option>
                                <Option value="包含">包含</Option>
                                <Option value="不包含">不包含</Option>
                              </Select>
                            </Form.Item>
                            <Form.Item
                              name={[field.name, 'expr', 'param']}
                              noStyle
                              rules={[{required: true, message: '请输入'}]}
                            >
                              <Input size="small" style={{width: '20%'}} placeholder="请输入" />
                            </Form.Item>
                          </Input.Group>
                        </Form.Item>
                      ) : null
                    }
                    {
                      type[index] === 2 ? (
                        <Fragment>
                          <Form.Item
                            {...field}
                            {...formItemLayout}
                            name={[field.name, 'code']}
                            label="动作"
                            rules={[
                              {
                                required: true,
                                message: '请选择动作',
                              },
                            ]}
                          >
                            <Select placeholder="请选择动作" style={{width: '50%'}}>
                              {
                                actionList.map(item => <Option value={item.code}>{item.name}</Option>)
                              }
                            </Select>
                          </Form.Item>
                          <Form.Item
                            {...field}
                            {...formItemLayout}
                            name={[field.name, 'params']}
                            label="内容"
                            rules={[
                              {
                                required: true,
                                message: '请输入内容',
                              },
                            ]}
                          >
                            <Input size="small" style={{width: '50%'}} placeholder="请输入内容" />
                          </Form.Item>
                        </Fragment>
                      ) : null
                    }
                  </div>
                </Form.Item>
              ))}
              <Form.Item {...itemLayoutBtn}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  style={{width: '10%', marginLeft: '88px'}}
                  icon={<PlusOutlined />}
                >
                  添加步骤
                </Button>
              </Form.Item>
            </Fragment>
          )}
        </Form.List>
      </Form>
    </Drawer>
  )
}
export default AddDrawer
