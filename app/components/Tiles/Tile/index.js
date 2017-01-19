import React from 'react';

import './Tile.scss'

const Tile = (props) => {
  return (
    <a className="tile box">
      <span className="tile__title-wrapper">
        <span className="tile__title title is-4">
          {props.name}
        </span>
      </span>
    </a>
  )
}

export default Tile
