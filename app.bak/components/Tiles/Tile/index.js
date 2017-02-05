import React from 'react';

import './Tile.scss'

const Tile = ({ name, isLoading }) => {
  const className = "tile box" + ((isLoading) ? " tile--loading" : "")
  return (
    <a className={className}>
      <span className="tile__title-wrapper">
        <span className="tile__title title is-4">
          {name || ' '}
        </span>
      </span>
    </a>
  )
}

export default Tile
