import {Component} from 'react'

const ErrorField = ({message, className}) => (
  message ? <div className={`error-field animated shake ${className}`}>{message}</div> : null
)

export default ErrorField
