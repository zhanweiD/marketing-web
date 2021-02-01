import React, {Component} from 'react'


class Button extends Component {


  handleClick = e => {
    e.preventDefault()
    const { onClick } = this.props
    if (onClick) {
      onClick(e)
    }
  }

  render() {
    const {title = '', disabled = false, ...otherProps} = this.props

    return (
      <button
        {...otherProps}
        className={`dt-btn dt-btn-primary ${this.props.className}`}
        disabled={disabled}
        onClick={this.handleClick}
      >
        {this.props.children}
      </button>
    )
  }
}



export default Button
