import React from 'react'

import './Avatar.scss'

const urlPlaceholder = () => {
  const img = require('./placeholder-256x256.png')
  return img
}

const Avatar = ({ username, url, isLoading }) => {
  return (
    <p className={
      "image is-128x128" +
        ((isLoading) ? " user-profile__avatar--loading" : "")
    }>
      {
        (isLoading)
          ? null
          : <img
              alt={`${username} Avatar`}
              src={(url) ? url : urlPlaceholder()}
            />
      }
    </p>
  )
}

export default Avatar

