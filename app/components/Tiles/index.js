import React from 'react'

import Tile from './Tile'
import Columns from '../Layout/Columns'
import Column from '../Layout/Columns/Column'

const renderTilesLoading = () => {
  return <div>Loading</div>
}

const renderTiles = (entities, getEntityName = (entity => entity.name)) => {
  if (!entities || !entities.length) {
    return <div>No Items!</div>
  }
      //<div key={index} className="column is-one-quarter">
  return entities.map((entity, index) => {
    return (
      <Column key={index} widthOutOf12="3">
        <Tile name={getEntityName(entity)} />
      </Column>
    )
  })
}

// TODO: Add reactProps
const Tiles = ({ entities, getEntityName, isLoading }) => (
  <Columns multiline>
    {
      (isLoading)
        ? renderTilesLoading()
        : renderTiles(entities, getEntityName)
    }
  </Columns>
)

export default Tiles

