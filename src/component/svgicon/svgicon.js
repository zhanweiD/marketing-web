import React, {Component} from 'react'
import PropTypes from 'prop-types'

class SvgIcon extends Component {
  render() {
    const {width, height, fill, name, onClick} = this.props
    return (
      <svg
        onClick={onClick && this.props.onClick}
        fill={fill}
        width={width}
        height={height}
      >
        {name && <use xlinkHref={`#${name}`} />}
      </svg>

    )
  }
}

SvgIcon.defaultProps = {
  className: '',
  name: '',
  width: 32,
  height: 32,
  fill: '#000',
}

Component.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  fill: PropTypes.string,
}

export default SvgIcon