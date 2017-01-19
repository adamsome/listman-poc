import React from 'react'

import Media from '../Media'
import Avatar from './Avatar'

const renderUserProfile = (user) => (
  <div>
    <Media
      left={(
        <Avatar
          username={user.id}
          imgSrc={user.avatar}
        />
      )}
      right={(
        <a className="card-header-icon">
          <span className="icon is-large">
            {/* TODO: Base off instagram's lighter icon */}
            <i className="fa fa-ellipsis-h"></i>
          </span>
        </a>
      )}
    >
      <div>
        <h1 className="title is-1">
          {user.id}
        </h1>
        <p className="subtitle is-5">
          {user.description}
        </p>
      </div>
    </Media>
  </div>
)

const UserProfile = ({ user }) => {
  if (!user) return(<div>No user</div>)

  return renderUserProfile(user)
}

export default UserProfile


