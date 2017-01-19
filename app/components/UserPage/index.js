import React from 'react'

import ListTiles from '../ListTiles'
import UserProfile from '../UserProfile'
import BodyColumn from '../Layout/BodyColumn'

const UserPage = ({ user, lists, isLoading }) => (
  <div className="container">
    <BodyColumn>
      <UserProfile user={user} isLoading={isLoading} />
      <ListTiles lists={lists} isLoading={isLoading} />
    </BodyColumn>
  </div>
)

export default UserPage
