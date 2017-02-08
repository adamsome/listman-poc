import React from 'react'

const Media = ({ left, children, right }) => (
  <article className="media">
    <figure className="media-left">
      {left}
    </figure>
    <div className="media-content">
      {children}
    </div>
    <div className="media-right">
      {right}
    </div>
  </article>
)

export default Media

