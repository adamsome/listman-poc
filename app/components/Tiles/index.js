import React from 'react'

import Tile from './Tile'

const renderTilesLoading = () => {
  return <div>Loading</div>
}

const renderTiles = (entities, getEntityName = (entity => entity.name)) => {
  if (!entities || !entities.length) {
    return <div>No Items!</div>
  }
  return entities.map((entity, index) => {
    return (
      <div key={index} className="column is-one-quarter">
        <Tile
          key={index}
          name={getEntityName(entity)}
        />
      </div>
    )
  })
}

// TODO: Add reactProps
const Tiles = ({ entities, isLoading }) => (
    <div className="columns is-multiline">
      {(isLoading) ? renderTilesLoading() : renderTiles(entities)}
    </div>
)

export default Tiles

