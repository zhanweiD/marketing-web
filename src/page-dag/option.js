// 节点列表
const nodeList = [{
  id: 1,
  nodeName: '微信',
  status: 4,
  icon: 4,
}, {
  id: 2,
  nodeName: '发消息',
  status: 3,
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
    id: 3,
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

// 构建菜单
const buildMenu = (nodeData, instance) => {
  // return []
  return [{
    label: '查看数据',
    icon: 'data',
    disabled: true,
    action: domEvent => {
      domEvent.stopPropagation()
    },
  }, {
    label: '删除节点',
    icon: 'del',
    action: (domEvent, item) => {
      domEvent.stopPropagation()
      instance.removeNode(item.id)
    },
  }]
}

const soucrceAnchors = [{
  id: 11,
  name: '输入数字',
  ioType: '2',
}]

const targetAnchors = [{
  id: 12,
  name: '输入文字',
  ioType: '2',
}]

const onFlowInit = instance => {
  console.log('init')
  instance.addSourceEndPoints(1, soucrceAnchors)
  instance.addTargetEndPoints(2, targetAnchors)
  instance.addSourceEndPoints(2, [{
    id: 15,
    name: '15',
    ioType: '2',
  }])
  instance.addSourceEndPoints(3, [{
    id: 13,
    name: '13',
    ioType: '2',
  }])
  instance.addTargetEndPoints(3, [{
    id: 14,
    name: '14',
    ioType: '2',
  }])
  instance.addTargetEndPoints(5, [{
    id: 16,
    name: '16',
    ioType: '2',
  }])
}
const options = instance => {
  return ({
    className: 'dag-style',
    flowId: 1, // 任务流程id
    // nodeId: data => data.instanceId,
    // vertical: false,
    // linkLabel: false,
    connectionsDetachable: false,
    autoLayout: true, // 自动布局
    autoFix: true, // 初始定位
    nodeParse({id, nodeName, icon, status, position}) {
      return {
        id,
        name: <div className="dag-node">{nodeName}</div>,
        icon,
        status,
        position,
      }
    },
    nodeList,
    links,
    buildMenu: nodeData => buildMenu(nodeData, instance),
    onFlowInit,
    // 拖入画布事件
    onDrop(position, e) {
      const item = JSON.parse(e.dataTransfer.getData('data'))
      console.log(item)
      item.position = position
      instance.addNode(item)
      setTimeout(() => {
        instance.addTargetEndPoints(item.id, [item])
        instance.addSourceEndPoints(item.id, [item])
      }, 0)
    },
    showCenter: false,

    // 双击节点触发事件
    onDoubleClick(node) {
      console.log(node)
    },

    // 用于构造连线数据，需要返回如下格式：{id,source,target}，字段详情查看下的数据格式参考
    linkParse({sourceId, targetId, sourceNodeId, targetNodeId}) {
      return {
        id: `${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
        sourceNodeId,
        targetNodeId,
      }
    },

    // 自动布局时需要将输入源和输出源转换为节点的id, 可以用这个来做映射
    endpointToNode({sourceNodeId, targetNodeId}) {
      return {
        source: sourceNodeId,
        target: targetNodeId,
      }
    },
  // 图形的中心点的坐标，默认会根据自动布局计算，特殊请求手动设置，
  // distance: {
  //   x: 0,
  //   y: 0,
  // }
  })
}
export default options
