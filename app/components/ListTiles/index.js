import React from 'react'

import ListTile from './ListTile'

const renderListTiles = (lists) => {
  if (!lists.length) {
    return <div>No Items!</div>
  }
  return lists.map((list, index) => {
    return (
      <div key={index} className="column is-one-quarter">
        <ListTile
          key={index}
          title={list.title}
        />
      </div>
    )
  })
}

const ListTiles = ({ lists }) => (
  <div className="container">
    <h2 className="title is-2">
      Lists
    </h2>
    <div className="columns is-multiline">
      {renderListTiles(lists)}
    </div>
  </div>
)

export default ListTiles

