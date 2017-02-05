import React from 'react'

const Columns = ({ children, multiline, ...rest }) => {
  let className = "columns"
  if (multiline) {
    className += " is-multiline"
  }
  return (
    <div {...rest} className={className}>
      {children}
    </div>
  )
}

export default Columns
