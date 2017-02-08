import React from 'react'

const Column = ({ children, widthOutOf12, offsetOutOf12, ...rest }) => {
  let className = "column"
  if (widthOutOf12) {
    className += " is-" + widthOutOf12
  }
  if (offsetOutOf12) {
    className += " is-offset-" + offsetOutOf12
  }

  return (
    <div {...rest} className={className}>
      {children}
    </div>
  )
}

export default Column
