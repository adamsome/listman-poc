import React from 'react';

import './Tile.scss'

let className = "tile box"

const Tile = ({ name, isLoading }) => {
  return (
    <a className={(isLoading) ? className + " tile--loading" : className}>
      <span className="tile__title-wrapper">
        <span className="tile__title title is-4">
          {name || ' '}
        </span>
      </span>
    </a>
  )
}

export default Tile
