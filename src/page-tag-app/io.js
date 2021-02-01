import ioContext from '../common/io-context'
import {baseApi, get, post} from '../common/util'

const api = {
  getTreeData: post(`${baseApi}/tagPanel/tree`), // 标签体系树
  getDetail: post(`${baseApi}/tagPanel/indicator`), // 标签体系详情
} 

ioContext.create('tagapp', api) 

export default ioContext.api.tagapp
