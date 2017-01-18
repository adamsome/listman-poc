import React from 'react'

const UserProfileAvatar = ({ username, imgSrc }) => (
  <p className="image is-128x128">
    <img
      alt={`${username} Avatar`}
      src={imgSrc}
    />
  </p>
)

export default UserProfileAvatar

