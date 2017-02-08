import React from 'react'

const Container = ({ children, className, centered, spaceAbove }) => {
  let fullClass = className + " container"
  if (centered) fullClass += " has-text-centered"

  let style = {}
  if (spaceAbove) style.marginTop = '2rem'

  return (
    <div className={fullClass} style={style}>
      {children}
    </div>
  )
}

export default Container
