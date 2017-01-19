import React from 'react'

const Container = ({ children, centered, spaceAbove }) => {
  let className = "container"
  if (centered) className += " has-text-centered"

  let style = {}
  if (spaceAbove) style.marginTop = '2rem'

  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}

export default Container
