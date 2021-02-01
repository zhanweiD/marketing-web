import React, {Component} from 'react'
import SvgIcon from '../svgicon'

class NoBorderInput extends Component {
  handleOnChange = e => {
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    const {label, type, onBlur, onFocus, onChange, ...other} = this.props
    return (
      <div className="noborder-input">
        <input
          type={type || 'text'}
          style={{width: '100%'}}
          required
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          {...other}
        />
        <label>{label}</label>
      </div>
    )
  }
}

NoBorderInput.defaultProps = {
  width: 200,
}

export default NoBorderInput
