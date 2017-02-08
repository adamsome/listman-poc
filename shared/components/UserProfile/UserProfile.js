import React from 'react'

import Media from '../Media'
import Avatar from './Avatar'
import './UserProfile.scss'

// If loading, use a blank user object as the loading indicator
const loadingUser = {
  username:
    <span className="user-profile__text--loading">
      {"_".repeat(15)}
    </span>,
  description:
    <span className="user-profile__text--loading">
      {"_".repeat(110)}
    </span>
}

const renderAvatar = (user, isLoading) => (
  <Avatar
    username={user.username}
    url={user.avatar_url}
    isLoading={isLoading}
  />
)

const renderMenu = () => (
  <a className="card-header-icon">
    <span className="icon is-large">
      {/* TODO: Base off instagram's lighter icon */}
      <i className="fa fa-ellipsis-h"></i>
    </span>
  </a>
)

const renderProfile = (user, isLoading) => (
  <div>
    <h1 className={
        "title is-1" + (isLoading ? " user-profile__username--loading" : "")
      }>
      {user.username}
    </h1>
    <p className="subtitle is-5">
      {user.description}
    </p>
  </div>
)

const UserProfile = ({ user, isLoading }) => {
  const userOrBlank = (isLoading || !user) ? loadingUser : user
  return (
    <div>
      <Media
        left={renderAvatar(userOrBlank, isLoading)}
        right={renderMenu()}
      >
        {renderProfile(userOrBlank, isLoading)}
      </Media>
    </div>
  )
}

export default UserProfile


