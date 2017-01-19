import React from 'react'

const Container = ({ children, centered }) => {
  let className = "container"
  if (centered) className += " has-text-centered"
  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default Container
