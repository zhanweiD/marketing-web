import ioContext from '../common/io-context'
import {
  get, post, put, baseApi, baseUser,
} from '../common/util'

const api = {
  getParams: get(`${baseApi}/default/info`), // 获取默认参数
  // getUserStatus: post(`${baseUser}/status`), // 获取登录状态
  goLogout: post(`${baseUser}/logout`), // 登出
  modifyPwd: put(`${baseUser}/modifyPwd`), // 修改密码
  getUserInfo: post(`${baseUser}/getRolePerm`), // 获取登录用户信息权限
  getProject: post(`${baseApi}/project/all`), // 全部项目
  // userLog: post(`${baseApi}/user/log`), // 操作记录
} 

ioContext.create('frame', api) 

export default ioContext.api.frame
