import ioContext from '../common/io-context'
import {get, post} from '../common/util'

const api = {
  getList: get('/task/list'), 
  getApp: get('/app/list'), 
  getAccount: get('/app/account/list'), 
  getEvent: get('/app/event/list'), 
  getAction: get('/app/action/list'), 
  addTask: post('/task/create'), 
  delTask: post('/task/delete'), 
  getCondition: get('/app/condition/list'), 
} 

ioContext.create('marketing', api) 

export default ioContext.api.marketing
