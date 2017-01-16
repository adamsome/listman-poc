import React from 'react';

import './ListTile.scss'

const ListTile = (props) => {
  return (
    <a className="list-tile box">
      <span className="list-tile__title-wrapper">
        <span className="list-tile__title title is-4">
          {props.title}
        </span>
      </span>
    </a>
  )
}

export default ListTile
