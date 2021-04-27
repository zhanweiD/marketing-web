import {useState} from 'react'
import DAG from '@dtwave/oner-dag'
import option from './option'
import './index.styl'

const Demo = () => {
  const [instance, setInstance] = useState(null)

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
    e.dataTransfer.setData('data', JSON.stringify(newNode))
    const {target} = e
    target.style.border = 'solid 1px #eecaa4'
  }
  
  // 拖动中
  const onDrag = () => {
    // console.log('drag ing')
  }
  
  // 拖动结束
  const onDragEnd = e => {
    const {target} = e
    target.style.border = 'solid 1px #49aede'
    target.style.margin = '8px'
  }
  
  // 获取节点
  const getNodes = () => {
    console.log(instance.getNodes())
  }
  
  const getLinks = () => {
    console.log(instance.getLinks())
  }
  
  // mock数据
  const typeList = [
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

  return (
    <div className="dag-process">
      <div className="FBH dag-header">
        <a className="containerStyle" onClick={onFixView}>定位</a>
        <a className="containerStyle" onClick={onZoomIn}>放大</a>
        <a className="containerStyle" onClick={onZoomOut}>缩小</a>
        <a className="containerStyle" onClick={getNodes}>获取所有节点</a>
        <a className="containerStyle" onClick={getLinks}>获取所有连线的信息</a>
        {
          typeList.map(item => (
            <div
              className="FBH FBJC FBAC dag-drag-box"
              onDrag={onDrag}
              onDragStart={e => onDragStart(item, e)}
              onDragEnd={onDragEnd}
              draggable
            >
              {item.nodeName}
            </div>
          ))
        }
      </div>

      <DAG
        ref={e => setInstance(e)}
        {...option(instance)}
      />
    </div>
    
  )
}
export default Demo
