/**
 * @description 对象云图
 */
import * as d3 from 'd3'
import cloud from 'd3-cloud'
import {Component} from 'react'
import {observer} from 'mobx-react'
import {Spin} from 'antd'
import {action} from 'mobx'
import {NoData} from '../component'

@observer
export default class Cloud extends Component {
  constructor(props) { 
    super(props)
    this.store = props.store
  }

  componentDidMount() {  
    this.store.getObjCloud1((res, max) => {
      this.couldLayout(res, max)
    })
  }

  getRanKMax(arr = [], countKeyName = 'count') {
    if (!arr.length) return 0
    // const count = _.map(arr, countKeyName)
    // const max = Math.max.apply(null, count)
    return 2
  }

  @action.bound couldLayout(data = [], max) {
    this.box = d3.select(`#box1${this.props.index}`)
    if (!this.box) return
    this.box.style('transform', 'scale(0.3, 0.3)').style('transition', 'all .3s linear')
    this.box.selectAll('*').remove()

    const scaleSize = data.length > 20 ? d3.scaleLinear().domain([0, max]).range([14, 20]) : d3.scaleLinear().domain([0, max]).range([14, 24]) 

    this.fill = d3.scaleOrdinal(d3.schemeCategory10)
    this.layout = cloud()
      .size([parseFloat(this.box.style('width')), 300])
      .words(data.map(d => {
        const scaleFont = Math.round((Math.random() * (1.5 - 0.5) + 0.5) * 10) / 10
        return {text: `${d.tag}: ${d.val ? d.val : '-'}`, size: scaleSize(scaleFont)}
      }))
      .padding(2)
      .spiral('archimedean')
      .rotate(0)
      .font('Impact')
      .fontSize(d => d.size)
      .on('end', d => this.draw(d))

    this.layout.start()
    this.box.style('transform', 'scale(1, 1)') 
  }

  draw(data) {
    d3.select(`#box1${this.props.index}`) 
      .append('svg')
      .attr('width', this.layout.size()[0])
      .attr('height', this.layout.size()[1])
      .append('g')
      .attr('transform', `translate(${this.layout.size()[0] / 2},${this.layout.size()[1] / 2})`)
      .selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .style('font-size', d => `${d.size}px`)
      .style('font-family', 'Impact')
      .style('fill', (d, i) => this.fill(i))
      .attr('text-anchor', 'middle')
      .attr('transform', d => `translate(${[d.x, d.y]})rotate(${d.rotate})`)
      .text(d => d.text)
  }

  render() {
    const {
      cloud1Data = [], loading, isCustomer,
    } = this.store
    const {index} = this.props

    return (
      <div className="evaluation-cloud bgf ml16 mr16 p16 box-border">
        <span className="evaluation-herder">{isCustomer ? '客户心声' : '客户评价'}</span>
        <Spin spinning={loading}>
          <div className="evaluation-cloud-content">
            <div id={`box1${index}`} />

            {
              !cloud1Data.length
                ? (
                  <div className="no-Data" style={{height: '300px'}}>
                    <NoData text="暂无数据" size="small" />
                  </div>
                )
                : null
            }
          </div>
        </Spin>
      </div>
    )
  }
}
