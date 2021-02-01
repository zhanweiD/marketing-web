/**
 * @description 标签体系树
 */
import {Component} from 'react'
import {observer} from 'mobx-react'
import {DtTree} from '@dtwave/uikit'
import {action, toJS} from 'mobx'
import {ConfigProvider} from 'antd'
import {Loading} from '../component'
import tagIcon from '../icon/new-tag.svg'
import Action from './tree-action'

const {DtTreeNode, DtTreeBox} = DtTree
@observer
export default class Tree extends Component {
  constructor(props) {
    super(props)
    this.store = props.store

    this.selectedKey = null
    this.searchKey = null
    this.store.getTreeData()
  }
  
// 递归遍历树节点
processNodeData = data => {
  if (!data) return undefined

  return data.map(node => (
    <DtTreeNode
      key={node.aid}
      itemKey={node.aid}
      title={node.name}
      // selectable={node.type === 0}
      iconNodeSrc={node.type === 0 ? tagIcon : null}
      nodeData={node}
    />
    //   {/* {
    //     this.processNodeData(node.children)
    //   }
    // </DtTreeNode> */}
  ))
}

  // 父节点aid
  @action findObjId = id => {
    const {treeList} = this.store
    const obj = treeList.filter(item => item.id === id)[0] || {}
    if (obj.parentId) {
      return this.findObjId(obj.parentId)
    } 
    return obj.aid
  }

  @action onselect = (selectedKey, e) => {
    this.store.selectedKey = selectedKey[0] || null
    // this.store.objId = this.findObjId(selectedKey[0]) // 找父节点aid即objId
    this.store.objId = selectedKey[0] || null
    this.store.getDetail()
  }

  render() {
    const {
      expandAll,
      treeLoading,
      treeData,
      selectedKey,
    } = this.store

    const treeBoxConfig = {
      titleHeight: 0,
      // title: <Action store={this.store} />,
      defaultWidth: 140,
      style: {width: '140px'},
    }

    const treeConfig = {
      type: 'tree',
      selectExpand: true,
      onSelect: this.onselect,
      defaultExpandAll: expandAll,
      selectedKeys: selectedKey ? [selectedKey] : [],
      expandWithParentKeys: selectedKey ? [selectedKey] : [],
      showDetail: true,
    }
    return (
      <ConfigProvider size="small">
        <div className="objtree tagAppTree mt16">
          <DtTreeBox {...treeBoxConfig}>
            {treeLoading
              ? <Loading mode="block" height={100} />
              : (
                <DtTree {...treeConfig}>
                  {
                    this.processNodeData(treeData)
                  }
                </DtTree>
              )
            }
          </DtTreeBox>
        </div>
      </ConfigProvider>
    )
  }
}
