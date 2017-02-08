import React from 'react'

import TileList from '../../../TileList'
import UserProfile from '../../../UserProfile'
import BodyColumn from '../../../Layout/BodyColumn'
import Container from '../../../Layout/Container'

import './UserPage.scss'

const UserPage = ({ user, lists, isLoading,
                    isAdding, addError, addList }) => (
  <BodyColumn>
    <UserProfile user={user} isLoading={isLoading} />
    <Container spaceAbove>
      <h2 className={"title is-2 " + ((isLoading)
        ? " user-page__lists-heading--loading"
        : ""
      )}>
        Lists
      </h2>
      {
        (addError)
          ? <article className="message is-danger">
              <div className="message-body">
                <strong>Error: </strong>{addError}
              </div>
            </article>
          : null
      }
      <TileList
        entities={lists}
        isLoading={isLoading}
        isAdding={isAdding}
        addError={addError}
        add={addList}
      />
    </Container>
  </BodyColumn>
)

export default UserPage
