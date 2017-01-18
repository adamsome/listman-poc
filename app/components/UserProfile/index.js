import React from 'react'

import Media from '../Media'
import Avatar from './Avatar'
import './UserProfile.scss'

const UserProfile = ({ user }) => (
  <div className="user-profile">
    <Media
      left={(
        <Avatar
          username={user.username}
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
          {user.username}
        </h1>
        <p className="subtitle is-5">
          {user.description}
        </p>
      </div>
    </Media>
  </div>
)

export default UserProfile


