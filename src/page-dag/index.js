import {useState} from 'react'
import {Button, Tooltip} from 'antd'
import {
  RedoOutlined, 
  ZoomInOutlined, 
  ZoomOutOutlined, 
  AimOutlined, 
  PlayCircleOutlined, 
  PauseCircleOutlined,
} from '@ant-design/icons'
import DAG from '@dtwave/oner-dag'
import option from './option'
import {links, nodes, types} from './mock'
import './index.styl'

const Demo = () => {
  const [instance, setInstance] = useState(null)
  const [isRun, setIsRun] = useState(false)
  const [nodeList, setNodeList] = useState(nodes)
  const [linkList, setLinkList] = useState(links)
  const [typeList, setTypeList] = useState(types)

  const onFixView = () => {
    instance.fixView()
  }
  const onZoomIn = () => {
    instance.zoomIn()
  }
  const onZoomOut = () => {
    instance.zoomOut()
  }
  
  // 开始拖动
  const onDragStart = ({nodeName, status, icon, ioType}, e) => {
    console.log(nodeName)
    const newNode = {
      id: new Date().getTime(),
      nodeName,
      status,
      icon,
      ioType,
    }
    // 添加拖拽数据
    e.dataTransfer.setData('data', JSON.stringify(newNode))
    // const {target} = e
    // target.style.border = 'solid 1px #eecaa4'
  }
  
  // 拖动中
  const onDrag = () => {
    // console.log('drag ing')
  }
  
  // 拖动结束
  const onDragEnd = e => {
    // const {target} = e
    // target.style.border = 'solid 1px #49aede'
    // target.style.margin = '8px'
  }
  
  // 获取节点
  const getNodes = () => {
    console.log(instance.getNodes())
  }
  
  const getLinks = () => {
    console.log(instance.getLinks())
  }

  const runDag = () => {
    setIsRun(true)
    nodeList.forEach(item => {
      instance.setNodeStatus(1, 3)
      setTimeout(() => {
        instance.setNodeStatus(item.id, 3)
      }, 2000)
    })
  }

  const stopDag = () => {
    setIsRun(false)
    nodeList.forEach(item => instance.setNodeStatus(item.id, 2))
  }

  return (
    <div className="dag-process">
      <div className="dag-cate">
        <h2>事件</h2>
        <div className="mb12">
          <Button className="containerStyle mr8 mb8" onClick={getNodes}>获取所有节点</Button>
          <Button className="containerStyle mb8" onClick={getLinks}>获取所有连线的信息</Button>
        </div>
        <h2>组件</h2>
        <div>
          {
            typeList.map(item => (
              <Button
                className="dag-drag-box mr8 mb8"
                onDrag={onDrag}
                onDragStart={e => onDragStart(item, e)}
                onDragEnd={onDragEnd}
                draggable
              >
                {item.nodeName}
              </Button>
            ))
          }
        </div>
      </div>
      <div>
        <DAG
          ref={e => setInstance(e)}
          {...option(instance)}
          links={linkList}
          nodeList={nodeList}
        />
      </div>
      <div className="pa rt16 tp24">
        <span className="hand mr8">
          <RedoOutlined style={{fontSize: '18px', color: 'rgba(0,0,0,.45)'}} />
        </span>
        {
          !isRun ? (
            <span onClick={runDag} className="hand mr8">
              <PlayCircleOutlined style={{fontSize: '18px', color: 'rgba(0,0,0,.45)'}} />
            </span>
          ) : (
            <span onClick={stopDag} className="hand mr8">
              <PauseCircleOutlined style={{fontSize: '18px', color: 'rgba(0,0,0,.45)'}} />
            </span>
          )
        }
        <span onClick={onFixView} className="hand mr8">
          <AimOutlined style={{fontSize: '18px', color: 'rgba(0,0,0,.45)'}} />
        </span>
        <span onClick={onZoomIn} className="hand mr8">
          <ZoomInOutlined style={{fontSize: '18px', color: 'rgba(0,0,0,.45)'}} />
        </span>
        <span onClick={onZoomOut} className="hand">
          <ZoomOutOutlined style={{fontSize: '18px', color: 'rgba(0,0,0,.45)'}} />
        </span>
      </div>
    </div>
  )
}
export default Demo
