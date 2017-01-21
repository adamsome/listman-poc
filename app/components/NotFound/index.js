import React from 'react'

import BodyColumn from '../Layout/BodyColumn'
import Container from '../Layout/Container'

const NotFound = ({ error }) => (
  <Container>
    <BodyColumn>
      <h1 className="title is-1">
        Page not found!
      </h1>
      <p className="subtitle is-5">
        {error}
      </p>
    </BodyColumn>
  </Container>
)

export default NotFound
