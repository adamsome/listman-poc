import React from 'react';
import classNames from 'classnames'

import './Tile.scss'

const Tile = ({ name, isLoading }) => {
  const className = classNames({
    "box-tile": true,
    "box-tile--loading": isLoading,
  })
  return (
    <a className={className}>
      <span className="box-tile__title-wrapper">
        <span className="box-tile__title">
          {name || ' '}
        </span>
      </span>
    </a>
  )
}

export default Tile
