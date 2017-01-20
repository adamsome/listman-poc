import React from 'react'

import './Avatar.scss'

const Avatar = ({ username, imgSrc, isLoading }) => (
  <p className={
    "image is-128x128" +
      ((isLoading) ? " user-profile__avatar--loading" : "")
  }>
    {
      (isLoading)
        ? null
        : <img
            alt={`${username} Avatar`}
            src={imgSrc}
          />
    }
  </p>
)

export default Avatar

