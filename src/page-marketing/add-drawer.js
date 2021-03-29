import {useState, Fragment} from 'react'
import {Button, Drawer, Form, Input, Select} from 'antd'
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'

const {Option} = Select
const AddDrawer = ({
  visible,
  changeVisible,
}) => {
  const [form] = Form.useForm()

  const onClose = () => {
    changeVisible(false)
    form.resetFields()
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
                console.log(values)
                onClose()
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
          <Input style={{width: '40%'}} size="small" placeholder="请输入名称" />
        </Form.Item>
        <Form.Item 
          name="descr"
          label="描述" 
          {...itemLayout}
        >
          <Input.TextArea style={{width: '40%'}} size="small" placeholder="请输入描述" />
        </Form.Item>
        <Form.List 
          name="names"
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
                      name={[field.name, 'app']}
                      label="应用"
                      rules={[
                        {
                          required: true,
                          message: '请选择应用',
                        },
                      ]}
                    >
                      <Select placeholder="请选择应用" style={{width: '40%'}}>
                        <Option key={0}>微信</Option>
                        <Option key={1}>抖音</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      {...formItemLayout}
                      name={[field.name, 'userAccount']}
                      label="账户"
                      rules={[
                        {
                          required: true,
                          message: '请选择账户',
                        },
                      ]}
                    >
                      <Select placeholder="请选择账户" style={{width: '40%'}}>
                        <Option key={0}>000</Option>
                        <Option key={1}>111</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      {...formItemLayout}
                      name={[field.name, 'action']}
                      label="动作"
                      rules={[
                        {
                          required: true,
                          message: '请选择动作',
                        },
                      ]}
                    >
                      <Select placeholder="请选择动作" style={{width: '40%'}}>
                        <Option key={0}>发文本</Option>
                        <Option key={1}>发图片</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...field}
                      {...formItemLayout}
                      name={[field.name, 'condition']}
                      label="条件"
                      rules={[
                        {
                          required: true,
                          message: '请选择条件',
                        },
                      ]}
                      style={{marginBottom: '0px'}}
                    >
                      <Select placeholder="请选择条件" style={{width: '40%'}}>
                        <Option key={0}>带TD</Option>
                        <Option key={1}>带DY</Option>
                      </Select>
                    </Form.Item>
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
