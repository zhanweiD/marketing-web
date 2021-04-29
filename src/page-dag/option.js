
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
    nodeParse: ({id, nodeName, icon, status, position}) => {
      return {
        id,
        name: <div className="dag-node">{nodeName}</div>,
        icon,
        status,
        position,
      }
    },
    buildMenu: nodeData => buildMenu(nodeData, instance),
    onFlowInit,
    // selectNode: e => 
    // 拖入画布事件
    onDrop: (position, e) => {
      // position 拖拽位置
      // 获取setData添加的拖拽数据
      const item = JSON.parse(e.dataTransfer.getData('data'))
      item.position = position
      instance.addNode(item)
      setTimeout(() => {
        instance.addTargetEndPoints(item.id, [item])
        instance.addSourceEndPoints(item.id, [item])
      }, 0)
    },
    showCenter: false,

    // 双击节点触发事件
    onDoubleClick: node => {
      console.log(node)
    },
    onNodeSelect: (node, index) => console.log(node, index),

    // 用于构造连线数据，需要返回如下格式：{id,source,target}，字段详情查看下的数据格式参考
    linkParse: ({sourceId, targetId, sourceNodeId, targetNodeId}) => {
      return {
        id: `${sourceId}-${targetId}`,
        source: sourceId,
        target: targetId,
        sourceNodeId,
        targetNodeId,
      }
    },

    // 自动布局时需要将输入源和输出源转换为节点的id, 可以用这个来做映射
    endpointToNode: ({sourceNodeId, targetNodeId}) => {
      return {
        source: sourceNodeId,
        target: targetNodeId,
      }
    },
  })
}
export default options
