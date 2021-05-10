// mock数据
const types = [
  {
    nodeName: '微信事件',
    value: 'weixin',
    status: 2,
    ioType: 2,
    icon: 'wp',
  },
  {
    nodeName: '抖音事件',
    value: 'douyin',
    status: 4,
    ioType: 2,
    icon: 'dy',
  },
]

// 节点列表
const nodes = [{
  id: 1,
  nodeName: '微信',
  status: 4,
  icon: 4,
}, {
  id: 2,
  nodeName: '发消息',
  status: 2,
  icon: 2,
}, {
  id: 3,
  nodeName: '扫码',
  status: 5,
  icon: 1,
}, {
  id: 5,
  nodeName: '推文本',
  status: 2,
  icon: 2,
},
]
  
// 连线数据
const links = [
  {
    id: 1,
    sourceId: 11,
    targetId: 12,
    sourceNodeId: 1,
    targetNodeId: 2,
  },
  {
    id: 2,
    sourceId: 11,
    targetId: 14,
    sourceNodeId: 1,
    targetNodeId: 3,
  },
  {
    id: 4,
    sourceId: 15,
    targetId: 16,
    sourceNodeId: 2,
    targetNodeId: 5,
  },
  {
    id: 5,
    sourceId: 13,
    targetId: 16,
    sourceNodeId: 3,
    targetNodeId: 5,

  },
]
export {types, nodes, links}
