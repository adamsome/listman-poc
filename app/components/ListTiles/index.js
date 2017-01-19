import React from 'react'

import ListTile from './ListTile'

const renderTilesLoading = () => {
  return <div>Loading</div>
}

const renderTiles = (items, getTitle = (item => item.title)) => {
  if (!items || !items.length) {
    return <div>No Items!</div>
  }
  return items.map((item, index) => {
    return (
      <div key={index} className="column is-one-quarter">
        <ListTile
          key={index}
          title={getTitle(item)}
        />
      </div>
    )
  })
}

// TODO: Add reactProps
const ListTiles = ({ lists, isLoading }) => (
    <div className="columns is-multiline">
      {(isLoading) ? renderTilesLoading() : renderTiles(lists)}
    </div>
)

export default ListTiles

