import React from 'react'

import ListTiles from '../ListTiles'
import UserProfile from '../UserProfile'
import BodyColumn from '../Layout/BodyColumn'
import Container from '../Layout/Container'

const UserPage = ({ user, lists, isLoading }) => (
  <Container>
    <BodyColumn>
      <UserProfile user={user} isLoading={isLoading} />
      <Container spaceAbove>
        <h2 className="title is-2">
          Lists
        </h2>
        <ListTiles lists={lists} isLoading={isLoading} />
      </Container>
    </BodyColumn>
  </Container>
)

export default UserPage
