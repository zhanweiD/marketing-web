import {Component} from 'react'
import {observer} from 'mobx-react'
import {
  HashRouter as Router, Route, Switch,
} from 'react-router-dom'
import Frame from '../../frame'
import VisualList from './visual-list'
import VisualDetail from './visual-detail'
import VisualConfig from './visual-config'
import TagList from './tag-list'

const prePath = '/process'

@observer
export default class TagVisual extends Component {
  render() {
    return (
      <Switch>
        <Route exact strict path={`${prePath}/visual`} component={VisualList} />
      </Switch>
    )
  }
}
