import {
  action, runInAction, observable, toJS,
} from 'mobx'
import {errorTip, successTip, changeToOptions} from '../../common/util'
import {ListContentStore} from '../../component/list-content'
import apiStore from './store-api-list'
import io from './io'

// eslint-disable-next-line new-cap
class Store extends ListContentStore(io.getHistoryList) {
  projectId
  @observable id = 0 // 群体ID
  @observable objId = 0 // 实体ID
  @observable visible = false // 新建API弹窗
  
  @observable apiGroupList = [] // 新建API分组列表
  @observable groupDetial = {} // 群体详情
  @observable barList =[] // 群体详情柱状图
  @observable barDataX = [] // 群体详情柱状图横坐标
  @observable barDataY = [] // 群体详情柱图纵坐标
  @observable modeType = -1 // 1 规则离线 2 规则实时 0 ID集合离线
  @observable confirmLoading = false // 

  // 客户列表
  @observable publishRowKeys = [] 
  @observable tableLoading = false 

  // 获取群体详情
  @action async getDetail() {
    try {
      const res = await io.getDetail({
        id: this.id,
      })
      runInAction(() => {
        this.groupDetial = res
        this.modeType = res.mode === 2 ? 0 : res.type
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取群体历史记录柱状图
  @action async getHistoryBar(params, cb) {
    try {
      const res = await io.getHistoryBar({
        id: this.id,
        ...params,
      })
      // this.barDataX = []
      // this.barDataY = []
      runInAction(() => {
        // res.forEach(item => {
        //   this.barDataX.push(item.x)
        //   this.barDataY.push(item.y)
        // })
        cb(res)
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 导出个体列表
  @action async outputUnitList() {
    try {
      const res = await io.outputUnitList({
      })
      runInAction(() => {
        if (res) {
          successTip('导出成功')
        }
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 重命名校验
  @action async groupCheckName(params, callbak) {
    try {
      const res = await io.groupCheckName({
        ...params,
      })
      if (res.isExit) {
        callbak('项目名称已存在')
      } else {
        callbak()
      }
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 获取api分组
  @action async getApiGroup() {
    try {
      const res = await io.getApiGroup({
      })
      runInAction(() => {
        this.apiGroupList = changeToOptions(toJS(res || []))('apiGroupName', 'apiGroupId')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 创建api
  @action async createApi(params) {
    this.confirmLoading = true
    try {
      const res = await io.createApi({
        id: this.id,
        ...params,
      })
      runInAction(() => {
        this.confirmLoading = false
        if (res) {
          apiStore.getList()
          successTip('创建成功')
          this.visible = false
        }
      })
    } catch (e) {
      this.confirmLoading = false
      errorTip(e.message)
    }
  }

  // 获取标签列表
  @action.bound async getTagList() {
    try {
      const res = await io.getTagList({
        objId: this.objId,
      })
      runInAction(() => {
        this.tagList = changeToOptions(toJS(res || []))('tagName', 'tagId')
      })
    } catch (e) {
      errorTip(e.message)
    }
  }

  // 重命名校验
  @action async checkName(isName, name, callback) {
    let res
    try {
      if (isName) {
        res = await io.checkName({
          apiName: name,
        })
      } else {
        res = await io.checkPath({
          apiPath: name,
        })
      }
      
      runInAction(() => {
        if (res && isName) {
          callback('API名称重复')
        } else if (res && !isName) {
          callback('API路径重复')
        } else {
          callback()
        }
      })
    } catch (error) {
      errorTip(error)
    }
  }
  @observable list = [
    {
      id: 1,
      customerId: 11,
      name: '姓名',
      sex: '男',
      age: 30,
      professional: '职业',
      marriage: '已婚',
      education: '本科',
      nativePlace: '无',
      dealValue: '成交一套商业房产',
    }, 
    {
      id: 2,
      customerId: 11,
      name: '姓名',
      sex: '男',
      age: 30,
      professional: '职业',
      marriage: '已婚',
      education: '本科',
      nativePlace: '无',
      dealValue: '成交一套商业房产',
    }, 
    {
      id: 3,
      customerId: 11,
      name: '姓名',
      sex: '男',
      age: 30,
      professional: '职业',
      marriage: '已婚',
      education: '本科',
      nativePlace: '无',
      dealValue: '成交一套商业房产',
    }, 
  ]
}

export default new Store()
