import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'

import TileList from './TileList'
import Tile from './Tile'

it('renders null based on initial state (empty "list" array)', () => {
  const entities = []
  const wrapper = shallow(<TileList entities={entities}/>)
  //expect(wrapper.contains(<div>No Items!</div>)).toBe(true)
  const tiles = wrapper.find(Tile)
  expect(tiles).toHaveLength(entities.length)
  expect(toJson(wrapper)).toMatchSnapshot()
})

it('renders <div> w/ correct children of type <Tile>', () => {
  const name = 'Test One'
  const entities = [ { name } ]
  const wrapper = shallow(<TileList entities={entities}/>)
  expect(wrapper.find(Tile)).toHaveLength(entities.length)

  const child = wrapper.find(Tile).first()
  const childProps = child.props()
  expect(childProps.name).toEqual(name)
  expect(toJson(wrapper)).toMatchSnapshot()
})

