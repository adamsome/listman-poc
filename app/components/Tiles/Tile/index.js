import React from 'react';

import './Tile.scss'

const Tile = ({ name, isLoading }) => {
  return (
    <a className={"tile box" + ((isLoading) ? " tile--loading" : "")}>
      <span className="tile__title-wrapper">
        <span className="tile__title title is-4">
          {name || ' '}
        </span>
      </span>
    </a>
  )
}

export default Tile
