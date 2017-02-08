import React from 'react'

const MainColumns = ({ children }) => (
  <div className="columns">
    <div className="column is-10 is-offset-2">
      {children}
    </div>
  </div>
)

export default MainColumns
