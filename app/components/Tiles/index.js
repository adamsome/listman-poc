import React from 'react'

import Tile from './Tile'
import Columns from '../Layout/Columns'
import Column from '../Layout/Columns/Column'

// Column width out of 12, e.g. 3 => 3/12 => 1/4 => 4 columns per row
const columnWidth = 3
// If loading, use blank entity objects as the loading indicator
const loadingEntities = Array.from(new Array(8), () => ({}))
// If no transform passed to get entities' name, use entity.name by default
const defaultGetEntityName = (entity) => entity.name

// TODO: Add reactProps
const Tiles = ({ entities,
                 isLoading,
                 getEntityName = defaultGetEntityName, }) => {
  const entitiesOrBlank = (isLoading) ? loadingEntities : entities || []
  return (
    <Columns multiline>
      {
        entitiesOrBlank.map((entity, index) => (
          <Column key={index} widthOutOf12={columnWidth}>
            <Tile name={getEntityName(entity)} isLoading={isLoading} />
          </Column>
        ))
      }
    </Columns>
  )
}

export default Tiles
