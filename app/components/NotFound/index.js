import React from 'react'

import BodyColumn from '../Layout/BodyColumn'

const NotFound = ({ error }) => (
  <BodyColumn>
    <h1 className="title is-1">
      Page not found!
    </h1>
    <p className="subtitle is-5">
      {error}
    </p>
  </BodyColumn>
)

export default NotFound
