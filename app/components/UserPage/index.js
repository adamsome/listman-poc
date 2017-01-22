import React from 'react'

import Tiles from '../Tiles'
import UserProfile from '../UserProfile'
import BodyColumn from '../Layout/BodyColumn'
import Container from '../Layout/Container'

import './UserPage.scss'

const UserPage = ({ user, lists, isLoading }) => (
  <BodyColumn>
    <UserProfile user={user} isLoading={isLoading} />
    <Container spaceAbove>
      <h2 className={"title is-2" + ((isLoading)
        ? " user-page__lists-heading--loading"
        : ""
      )}>
        Lists
      </h2>
      <Tiles entities={lists} isLoading={isLoading} />
    </Container>
  </BodyColumn>
)

export default UserPage
